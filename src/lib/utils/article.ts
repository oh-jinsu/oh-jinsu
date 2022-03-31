export const extractArticles = async (category: string, files: object) => {
  const iterable = Object.entries(files)

  const articles = await Promise.all(
    iterable.map(async ([path, resolver]) => {
      const { metadata } = await resolver()

      const href = `${category}${path.slice(1, -3)}`
      
      return {
        ...metadata,
        href,
      }
    })
  )

  const result = articles.sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)

    if (dateA > dateB) {
      return 1
    }

    if (dateA < dateB) {
      return -1
    }

    return 0
  })

  return result
}