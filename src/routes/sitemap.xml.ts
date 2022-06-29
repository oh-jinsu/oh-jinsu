import { AGILE_SOFTWARE, ORIGIN, STARTUP_JOURNEY } from "$lib/constants"
import { toUrl } from "$lib/utils/url"

export async function get() {
  const [a, b] = await Promise.all([
    fetch(`${ORIGIN}/${toUrl(STARTUP_JOURNEY)}/json`).then((res) => res.json()),
    fetch(`${ORIGIN}/${toUrl(AGILE_SOFTWARE)}/json`).then((res) => res.json()),
  ])

  const articles = [...a, ...b]

  return {
    headers: {
      "Content-Type": "application/xml",
    },
    body: `
    <?xml version="1.0" encoding="UTF-8" ?>
    <urlset
      xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xhtml="https://www.w3.org/1999/xhtml"
      xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
      xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
      xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
      xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
    >
      <url>
        <loc>${ORIGIN}</loc>
      </url>
      <url>
        <loc>${ORIGIN}/${toUrl(STARTUP_JOURNEY)}</loc>
      </url>
      <url>
        <loc>${ORIGIN}/${toUrl(AGILE_SOFTWARE)}</loc>
      </url>
      ${articles.map(({href, date}) => `
        <url>
          <loc>${ORIGIN}/${href}</loc>
          ${date ? `<lastmod>${date}</lastmod>` : ""}
        </url>
      `.trim()).join("")}
    </urlset>
    `.trim()
  }
}