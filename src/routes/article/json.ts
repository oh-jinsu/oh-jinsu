import { extractArticles } from "$lib/utils/article"

export const get = async({ url }) => {
  const keyword = url.searchParams.get("keyword")

  const agileSoftwareFiles = import.meta.glob("../agile-software/*.md")

  const walkingLogFiles = import.meta.glob("../walking-logs/*.md")

  const [agileSoftwares, walkinglogs] = await Promise.all([
    extractArticles("", agileSoftwareFiles),
    extractArticles("", walkingLogFiles),
  ])

  const result = [...agileSoftwares, ...walkinglogs].filter((article) =>{
    return article.keywords?.includes(keyword)
  })

  return {
    body: result,
  }
}
