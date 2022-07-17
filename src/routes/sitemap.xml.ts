import { AGILE_SOFTWARE, STARTUP_JOURNEY, URLS } from "$lib/constants"

export async function get() {
  const ORIGIN = "https://ohjinsu.me"
  
  const [a, b] = await Promise.all([
    fetch(`${ORIGIN}/${URLS[STARTUP_JOURNEY]}/json`).then((res) => res.json()),
    fetch(`${ORIGIN}/${URLS[AGILE_SOFTWARE]}/json`).then((res) => res.json()),
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
        <loc>${ORIGIN}/why-you-should-hire-me</loc>
      </url>
      <url>
        <loc>${ORIGIN}/${URLS[STARTUP_JOURNEY]}</loc>
      </url>
      <url>
        <loc>${ORIGIN}/${URLS[AGILE_SOFTWARE]}</loc>
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
