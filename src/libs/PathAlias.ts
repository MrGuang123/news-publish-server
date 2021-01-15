
import { addAliases } from 'module-alias'
import path from 'path'

const resolve = (dirName: string): string => {
  return path.join(__dirname, '../', dirName)
}

// 创建映射，并且需要在tsconfig中配置baseUrl和paths，否则ts报错
addAliases({
  '@utils': resolve('utils'),
  '@interfaces': resolve('interfaces'),
  '@libs': resolve('libs'),
  '@models': resolve('models'),
  '@assets': resolve('assets'),
  '@dao': resolve('dao'),
})
