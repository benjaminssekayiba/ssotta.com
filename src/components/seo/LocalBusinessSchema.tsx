import { getLocalBusinessSchema } from "@/lib/seo";

export function LocalBusinessSchema() {
  const schema = getLocalBusinessSchema();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
