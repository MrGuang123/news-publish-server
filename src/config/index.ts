import devConfig from './develop'
import prodConfig from './product'
import * as path from 'path'
import dbConfig from './dbConfig'

interface dbConfigInterface {
  user: string
  pwd: string
  dialect: string
  host: string
  port: string
  dbName: string
}

// 需要下载ts的node类型包：@types/node来识别node相关api
const useConfig = process.env.NODE_ENV === 'product' ? prodConfig : devConfig
const config = {
  staticDir: path.join(__dirname, '../', 'assets'),
  dbConfig: dbConfig || {} as dbConfigInterface
}

export default {
  ...config,
  ...useConfig
}
