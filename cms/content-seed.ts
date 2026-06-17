// Seed content for blog posts and case studies. Kept separate from
// seed-data.ts (which feeds client-safe site defaults) so this larger body of
// copy is only ever pulled into the server-side seed routine.

// ── Minimal Lexical builder ────────────────────────────────────────────
// Payload's rich-text field stores a serialized Lexical editor state. These
// helpers turn a simple block list into that shape so the seed copy stays
// readable. Supported blocks: { h2 }, { p }, { ul: string[] }.
type Block = { h2: string } | { p: string } | { ul: string[] };

function textNode(text: string) {
  return { type: "text", format: 0, style: "", mode: "normal", detail: 0, text, version: 1 };
}

function paragraph(text: string) {
  return {
    type: "paragraph",
    format: "",
    indent: 0,
    version: 1,
    direction: "ltr" as const,
    textFormat: 0,
    children: [textNode(text)],
  };
}

function heading(text: string) {
  return {
    type: "heading",
    tag: "h2",
    format: "",
    indent: 0,
    version: 1,
    direction: "ltr" as const,
    children: [textNode(text)],
  };
}

function bulletList(items: string[]) {
  return {
    type: "list",
    listType: "bullet",
    tag: "ul",
    start: 1,
    format: "",
    indent: 0,
    version: 1,
    direction: "ltr" as const,
    children: items.map((item, i) => ({
      type: "listitem",
      value: i + 1,
      format: "",
      indent: 0,
      version: 1,
      direction: "ltr" as const,
      children: [textNode(item)],
    })),
  };
}

export function lexical(blocks: Block[]) {
  return {
    root: {
      type: "root",
      format: "",
      indent: 0,
      version: 1,
      direction: "ltr" as const,
      children: blocks.map((b) => {
        if ("h2" in b) return heading(b.h2);
        if ("ul" in b) return bulletList(b.ul);
        return paragraph(b.p);
      }),
    },
  };
}

// ── Blog posts ─────────────────────────────────────────────────────────
export interface PostSeed {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  blocks: Block[];
}

export const postsSeed: PostSeed[] = [
  {
    title: "5 signs your Singapore business has outgrown break-fix IT",
    slug: "outgrown-break-fix-it-support",
    excerpt:
      "Calling someone only when things break feels cheap — until you add up the downtime. Here are five signs it's time to move to managed IT.",
    publishedAt: "2026-05-12",
    blocks: [
      {
        p: "Break-fix IT — where you only pay for help when something stops working — looks economical on paper. But for a growing Singapore team, the hidden cost is downtime: the hours your staff lose every time a problem festers because nobody was watching for it. Here are five signs you've outgrown the model.",
      },
      { h2: "1. You're the one noticing the problems" },
      {
        p: "If your staff are the early-warning system for failing hardware, full disks and expired licences, you don't have monitoring — you have luck. Managed IT flips this around: issues are detected and often resolved before anyone files a ticket.",
      },
      { h2: "2. Every incident is a surprise bill" },
      {
        p: "Unpredictable invoices make IT impossible to budget. A fixed monthly fee turns a variable cost into a planned one, and removes the incentive to delay fixes until they become expensive.",
      },
      { h2: "3. Security is whatever came with the laptop" },
      {
        p: "Break-fix providers rarely harden your environment proactively. As you grow, that gap widens. A managed partner builds security in as standard:",
      },
      {
        ul: [
          "Endpoint detection and response on every device",
          "Enforced patching for operating systems and apps",
          "Multi-factor authentication across email and key systems",
          "Tested, off-site backups you never have to think about",
        ],
      },
      { h2: "4. Nobody owns your IT roadmap" },
      {
        p: "Reactive support has no view of where you're heading. When you hire, open an office, or take on a client with security requirements, you need a partner who has already planned for it — not one you call after the fact.",
      },
      { h2: "5. Response time is a lottery" },
      {
        p: "When the person who knows your setup is busy, you wait. A managed model gives you a named engineer and a help desk with a committed response time, so a blocked team is never stuck for hours.",
      },
      { h2: "The bottom line" },
      {
        p: "If two or more of these sound familiar, break-fix is now costing you more than it saves. Bevora runs managed IT for growing Singapore teams — fixed pricing, a named engineer, and monitoring that catches problems before they reach you. Book a free 30-minute assessment to see where you stand.",
      },
    ],
  },
  {
    title: "Microsoft 365 vs Google Workspace for Singapore SMEs",
    slug: "microsoft-365-vs-google-workspace-singapore",
    excerpt:
      "Both are excellent. The right choice depends on how your team actually works. A practical comparison for Singapore SMEs — no vendor bias.",
    publishedAt: "2026-04-02",
    blocks: [
      {
        p: "Microsoft 365 and Google Workspace are both mature, secure and more than capable of running a modern Singapore SME. The wrong question is \"which is better?\" — the right one is \"which fits how our team works?\" Here's how we help clients decide.",
      },
      { h2: "Where Microsoft 365 wins" },
      {
        p: "If your work lives in documents, spreadsheets and presentations — and especially if clients send you complex Office files — Microsoft 365 is hard to beat. The desktop apps remain the standard, and the wider ecosystem (Teams, SharePoint, Entra ID, Intune) gives you serious control as you grow.",
      },
      {
        ul: [
          "Best-in-class desktop Office apps for heavy formatting",
          "Strong device and identity management with Intune and Entra ID",
          "Teams as a single hub for chat, calls and files",
          "Familiar to most new hires in Singapore",
        ],
      },
      { h2: "Where Google Workspace wins" },
      {
        p: "If your team collaborates in real time and rarely touches a desktop app, Workspace feels lighter and faster. Real-time co-editing, generous search and a simple admin console make it a favourite for lean, cloud-native teams.",
      },
      {
        ul: [
          "Effortless real-time collaboration in Docs and Sheets",
          "Simple, fast administration for small teams",
          "Excellent search across mail and files",
          "Lower friction for fully remote or hybrid teams",
        ],
      },
      { h2: "The questions that actually decide it" },
      {
        p: "Before the licence comparison, we ask: What file formats do your clients send? Do you need tight control over company-owned devices? Is anyone dependent on advanced Excel? How important is offline work? The answers usually point clearly to one platform.",
      },
      { h2: "Migration is the real risk — not the platform" },
      {
        p: "Whichever you choose, the danger is in the move: lost email, broken calendar invites, and downtime. Bevora plans and runs Microsoft 365 and Workspace migrations with zero downtime, so your team simply logs in one morning and everything is there. Talk to us before you commit to either.",
      },
    ],
  },
  {
    title: "Ransomware in 2026: a defence checklist for Singapore SMEs",
    slug: "ransomware-defence-checklist-2026",
    excerpt:
      "Ransomware still hits small firms hardest because they're the least prepared. Use this checklist to close the gaps attackers count on.",
    publishedAt: "2026-03-10",
    blocks: [
      {
        p: "Ransomware hasn't gone away — it's gone professional. Attackers now buy access, encrypt your data and threaten to leak it. Small and mid-sized Singapore firms remain the easiest targets, not because they're singled out, but because the basics are often missing. This checklist covers the controls that actually stop most attacks.",
      },
      { h2: "Close the front door" },
      {
        p: "Most ransomware starts with a stolen password or an unpatched system. These four controls block the overwhelming majority of entry attempts:",
      },
      {
        ul: [
          "Multi-factor authentication on email, VPN and remote access",
          "Automated patching for operating systems and browsers",
          "Endpoint detection and response on every device, not just servers",
          "Phishing-awareness training so staff can spot the lure",
        ],
      },
      { h2: "Assume something gets through" },
      {
        p: "Good security plans for failure. If an attacker does land, you want to limit the blast radius and recover fast:",
      },
      {
        ul: [
          "Off-site, immutable backups attackers can't reach or encrypt",
          "Restores tested on a schedule — an untested backup is a guess",
          "Least-privilege access so one compromised account isn't game over",
          "A written incident-response plan with names and phone numbers",
        ],
      },
      { h2: "The number that matters: recovery time" },
      {
        p: "When you're hit, the only question your clients care about is how long until you're back. That depends entirely on preparation done months earlier — tested backups and a rehearsed plan. We've helped clients recover in hours rather than weeks because the groundwork was already in place.",
      },
      { h2: "Where to start" },
      {
        p: "If you can't confidently tick every box above, you have gaps an attacker would happily use. Bevora runs cybersecurity and tested backup for Singapore teams — book a free 30-minute assessment and we'll show you exactly where you're exposed.",
      },
    ],
  },
];

// ── Case studies ───────────────────────────────────────────────────────
export interface CaseStudySeed {
  title: string;
  slug: string;
  client: string;
  summary: string;
  publishedAt: string;
  results: { value: string; label: string }[];
  blocks: Block[];
}

export const caseStudiesSeed: CaseStudySeed[] = [
  {
    title: "Cutting IT downtime to near zero for a Singapore law firm",
    slug: "singapore-law-firm-managed-it",
    client: "40-lawyer Singapore law firm",
    summary:
      "A growing litigation practice was losing billable hours to IT problems nobody was watching for. Managed IT turned reactive firefighting into quiet reliability.",
    publishedAt: "2026-05-20",
    results: [
      { value: "99.9%", label: "System uptime" },
      { value: "<8 min", label: "Average help-desk response" },
      { value: "0", label: "Unplanned outages in 12 months" },
    ],
    blocks: [
      { h2: "The challenge" },
      {
        p: "A 40-lawyer litigation firm was running on break-fix support. Email outages and a sluggish document system were costing billable hours, and with confidential client data at stake, the partners had no clear picture of their security posture. Every incident was a scramble to reach whoever was free.",
      },
      { h2: "What we did" },
      {
        p: "Bevora became the firm's IT department. We deployed monitoring across every server and laptop, hardened the environment, and assigned a named engineer who learned the practice's setup and routines.",
      },
      {
        ul: [
          "24/7 monitoring with proactive patching and alerts",
          "Endpoint detection and response on every device",
          "Enforced multi-factor authentication and least-privilege access",
          "Automated, off-site backups with scheduled restore tests",
          "A help desk with a committed response time for every fee earner",
        ],
      },
      { h2: "The outcome" },
      {
        p: "In the first twelve months the firm had zero unplanned outages, uptime settled at 99.9%, and the help desk answered in under eight minutes on average. Most importantly, IT stopped being something the partners thought about — the engineers caught issues before they reached the floor, and the lawyers got their billable hours back.",
      },
    ],
  },
  {
    title: "Migrating a multi-clinic group to Microsoft 365 with zero downtime",
    slug: "clinic-group-microsoft-365-migration",
    client: "Multi-site healthcare group",
    summary:
      "Five clinics, ageing on-premise email and no appetite for a single minute of downtime during patient hours. We moved them to Microsoft 365 over a weekend.",
    publishedAt: "2026-04-18",
    results: [
      { value: "0 min", label: "Downtime during the move" },
      { value: "5", label: "Clinics migrated in one weekend" },
      { value: "30%", label: "Lower monthly licensing cost" },
    ],
    blocks: [
      { h2: "The challenge" },
      {
        p: "A healthcare group running five clinics was tied to an ageing on-premise email server that was slow, hard to secure and increasingly unreliable. With reception and clinical staff dependent on email and shared calendars throughout patient hours, there was zero tolerance for downtime — and tight rules around patient data.",
      },
      { h2: "What we did" },
      {
        p: "We planned a staged migration to Microsoft 365, rehearsed the cutover, and ran the switch over a single weekend so staff returned on Monday to a working inbox and nothing to relearn.",
      },
      {
        ul: [
          "Pre-staged every mailbox and shared calendar before cutover",
          "Migrated all five sites in one coordinated weekend window",
          "Configured Entra ID with enforced multi-factor authentication",
          "Right-sized licences to match real usage per role",
          "On-site support on the first Monday at every clinic",
        ],
      },
      { h2: "The outcome" },
      {
        p: "Staff experienced no downtime during patient hours, all five clinics were live on Microsoft 365 within one weekend, and consolidating onto correctly-sized licences cut the group's monthly software bill by around 30%. The group now has a secure, modern platform that scales as it opens new sites.",
      },
    ],
  },
  {
    title: "Recovering a logistics firm from ransomware in under four hours",
    slug: "logistics-firm-ransomware-recovery",
    client: "Regional logistics operator",
    summary:
      "A ransomware attack encrypted core systems overnight. Because the backups were immutable and the recovery plan was rehearsed, operations were restored before the next shift.",
    publishedAt: "2026-03-28",
    results: [
      { value: "<4 hrs", label: "Time to full recovery" },
      { value: "0", label: "Ransom paid" },
      { value: "100%", label: "Data restored" },
    ],
    blocks: [
      { h2: "The challenge" },
      {
        p: "A regional logistics operator was hit by ransomware that encrypted its core systems overnight. In an industry where every hour of downtime means missed deliveries and idle drivers, the pressure to pay was immediate. But paying funds the attackers and guarantees nothing.",
      },
      { h2: "What we did" },
      {
        p: "Bevora had already put the groundwork in place: immutable, off-site backups the attacker couldn't reach, and a written recovery plan we had rehearsed. When the alert came in, we executed it.",
      },
      {
        ul: [
          "Isolated affected systems to stop the spread immediately",
          "Restored from immutable backups attackers could not encrypt",
          "Rebuilt clean systems and rotated all credentials",
          "Closed the entry point and hardened remote access",
          "Documented the incident for insurers and stakeholders",
        ],
      },
      { h2: "The outcome" },
      {
        p: "Core operations were back online in under four hours — before the next shift started. No ransom was paid, and 100% of data was recovered from tested backups. The attack became a contained incident instead of a business-ending event, because the preparation had been done long before it was needed.",
      },
    ],
  },
];
