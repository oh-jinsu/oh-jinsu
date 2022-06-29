import { AGILE_SOFTWARE, URLS } from "$lib/constants"
import { extractArticles } from "$lib/utils/article"

export const get = async() => {
  const files = import.meta.glob("./*.md")

  const result = await extractArticles(URLS[AGILE_SOFTWARE], files)
  
  return {
    body: result,
  }
}