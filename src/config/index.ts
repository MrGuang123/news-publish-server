import devConfig from './develop'
import prodConfig from './product'

// 需要下载ts的node类型包：@types/node来识别node相关api
const useConfig = process.env.NODE_ENV === 'product' ? prodConfig : devConfig
const config =  {

}

export default {
  ...config,
  ...useConfig
}
