export const formatDate = (date: Date, suffix?: string) : string => {
  const dateInstance = new Date(date)

  const year = dateInstance.getFullYear()

  const month = dateInstance.getMonth() + 1

  const day = dateInstance.getDay()

  const result = `${year}년 ${month}월 ${day}일`

  if (suffix) {
    return `${result} ${suffix}`
  }

  return result;
}