const dateFormat = (date: string | Date): string => {
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

export default dateFormat
