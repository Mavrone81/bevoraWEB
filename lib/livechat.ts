import "server-only";
import { getPayload } from "payload";
import config from "@payload-config";

export type LiveSender = "visitor" | "staff" | "system";
export interface LiveMsg {
  sender: LiveSender;
  text: string;
  at: string; // ISO timestamp
}

export interface LiveChatDoc {
  id: string;
  sessionId: string;
  sessionRef?: string;
  visitorName?: string;
  status?: "active" | "closed";
  outboundIds?: { waId?: string }[];
  messages?: LiveMsg[];
}

async function client() {
  return getPayload({ config });
}

export async function findSession(sessionId: string): Promise<LiveChatDoc | undefined> {
  const payload = await client();
  const { docs } = await payload.find({
    collection: "live-chats",
    where: { sessionId: { equals: sessionId } },
    limit: 1,
  });
  return docs[0] as unknown as LiveChatDoc | undefined;
}

// Find the session a staff WhatsApp reply belongs to: prefer the message it
// replied to (reply-context wamid), else the most recently active session.
export async function routeStaffReply(contextWaId?: string): Promise<LiveChatDoc | undefined> {
  const payload = await client();
  if (contextWaId) {
    const { docs } = await payload.find({
      collection: "live-chats",
      where: { "outboundIds.waId": { equals: contextWaId } },
      limit: 1,
    });
    if (docs[0]) return docs[0] as unknown as LiveChatDoc;
  }
  const { docs } = await payload.find({
    collection: "live-chats",
    where: { status: { equals: "active" } },
    sort: "-updatedAt",
    limit: 1,
  });
  return docs[0] as unknown as LiveChatDoc | undefined;
}

export async function appendMessages(
  doc: LiveChatDoc,
  add: LiveMsg[],
  extra?: { outboundWaId?: string; status?: "active" | "closed" },
): Promise<void> {
  const payload = await client();
  const messages = [...(doc.messages ?? []), ...add];
  const outboundIds = extra?.outboundWaId
    ? [...(doc.outboundIds ?? []), { waId: extra.outboundWaId }]
    : doc.outboundIds;
  await payload.update({
    collection: "live-chats",
    id: doc.id,
    data: {
      messages,
      ...(outboundIds ? { outboundIds } : {}),
      ...(extra?.status ? { status: extra.status } : {}),
    },
  });
}

export async function createSession(data: {
  sessionId: string;
  sessionRef: string;
  visitorName?: string;
  messages: LiveMsg[];
}): Promise<LiveChatDoc> {
  const payload = await client();
  const doc = await payload.create({
    collection: "live-chats",
    data: { ...data, status: "active", outboundIds: [] },
  });
  return doc as unknown as LiveChatDoc;
}
