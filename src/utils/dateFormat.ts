const dateFormat = (date: string): string => {
  let newDate = new Date(date)
  let result = newDate.toISOString().replace('T', ' ').split('.')[0]
  return result
}

export default dateFormat
