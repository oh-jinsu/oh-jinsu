import { extractArticles } from "$lib/utils/article"

export const get = async() => {
  const files = import.meta.glob("./*.md")

  const result = await extractArticles("walking-logs", files)
  
  return {
    body: result,
  }
}