import config from '../config'

const { authBlackList } = config
export const isInBlackListValidate = (originalUrl: string) => {
  if (!authBlackList) {
    return false
  }
  const isInBlackList = authBlackList.some(url => {
    const reg = new RegExp(url)
    return reg.test(originalUrl)
  })

  return isInBlackList
}
