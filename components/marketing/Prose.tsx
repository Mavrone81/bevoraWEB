import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

// Renders Payload Lexical rich text with the site's typography.
export function Prose({ data }: { data: unknown }) {
  if (!data) return null;
  return (
    <div className="bv-prose">
      <RichText data={data as SerializedEditorState} />
    </div>
  );
}
