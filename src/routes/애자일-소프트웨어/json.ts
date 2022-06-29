import { AGILE_SOFTWARE } from "$lib/constants"
import { extractArticles } from "$lib/utils/article"
import { toUrl } from "$lib/utils/url"

export const get = async() => {
  const files = import.meta.glob("./*.md")

  const result = await extractArticles(toUrl(AGILE_SOFTWARE), files)
  
  return {
    body: result,
  }
}