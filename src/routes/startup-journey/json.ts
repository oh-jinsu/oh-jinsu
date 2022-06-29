import { STARTUP_JOURNEY, URLS } from "$lib/constants"
import { extractArticles } from "$lib/utils/article"

export const get = async() => {
  const files = import.meta.glob("./*.md")

  const result = await extractArticles(URLS[STARTUP_JOURNEY], files)
  
  return {
    body: result,
  }
}