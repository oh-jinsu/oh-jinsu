import { STARTUP_JOURNEY } from "$lib/constants"
import { extractArticles } from "$lib/utils/article"
import { toUrl } from "$lib/utils/url"

export const get = async() => {
  const files = import.meta.glob("./*.md")

  const result = await extractArticles(toUrl(STARTUP_JOURNEY), files)
  
  return {
    body: result,
  }
}