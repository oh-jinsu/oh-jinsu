export async function get() {
  const [walkingLogs, agileSoftwares] = await Promise.all([
    fetch("https://ohjinsu.me/walking-logs/json").then((res) => res.json()),
    fetch("https://ohjinsu.me/agile-software/json").then((res) => res.json()),
  ])

  const articles = [...walkingLogs, ...agileSoftwares]

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
        <loc>https://ohjinsu.me</loc>
      </url>
      <url>
        <loc>https://ohjinsu.me/walking-logs</loc>
      </url>
      <url>
        <loc>https://ohjinsu.me/agile-software</loc>
      </url>
      ${articles.map(({href, date}) => `
        <url>
          <loc>https://ohjinsu.me/${href}</loc>
          ${date ? `<lastmod>${date}</lastmod>` : ""}
        </url>
      `.trim()).join("")}
    </urlset>
    `.trim()
  }
}