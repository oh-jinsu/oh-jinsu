import { extractArticles } from "$lib/utils/article"

export const get = async() => {
  const files = import.meta.glob("./*.md")

  const result = extractArticles("agile-software", files)

  return {
    body: result,
  }
}