import { getAllWritingPosts } from "@/lib/writing";
import { config } from "@/lib/config";

export const dynamic = "force-static";

export async function GET() {
  const baseUrl = config.siteUrl;
  const posts = getAllWritingPosts("en");
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(config.authorName)} | Writing</title>
    <description>Notes on products, interfaces, and software engineering.</description>
    <link>${baseUrl}/en/writing</link>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <language>en</language>
${posts.map(({ metadata }) => `    <item>
      <title>${escapeXml(metadata.title)}</title>
      <description>${escapeXml(metadata.description)}</description>
      <link>${baseUrl}/en/writing/${metadata.slug}</link>
      <guid isPermaLink="true">${baseUrl}/en/writing/${metadata.slug}</guid>
      <pubDate>${new Date(metadata.date).toUTCString()}</pubDate>
      <category>${escapeXml(metadata.category)}</category>
    </item>`).join("\n")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate",
    },
  });
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
