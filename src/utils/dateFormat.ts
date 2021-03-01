export const dateFormat = (date: string | Date): string => {
  let newDate
  if(typeof date !== 'string') {
    newDate = date
  }else {
    newDate = new Date(date)
  }

  const year = newDate.getFullYear()
  const month = newDate.getMonth() + 1
  const day = newDate.getDate()
  const hours = newDate.getHours()
  const minutes = newDate.getMinutes()
  const seconds = newDate.getSeconds()
  const result = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`

  return result
}

export function getTodayRange() {
  const start = new Date(new Date(new Date().toLocaleDateString()).getTime())
  const end = new Date(new Date(new Date().toLocaleDateString()).getTime() +24 * 60 * 60 * 1000 -1)

  return [start, end]
}
