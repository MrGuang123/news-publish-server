import path from 'path'

import devConfig from './develop'
import prodConfig from './product'
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
  // 不需要权限校验的路由
  authBlackList: ['^/api/auth/login'],
  dbConfig: dbConfig || {} as dbConfigInterface
}

export default {
  ...config,
  ...useConfig
}
