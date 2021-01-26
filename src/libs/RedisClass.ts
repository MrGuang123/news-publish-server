import redis from 'redis'
import config from '../config'
import { promisify } from 'util'

class RedisClass {
  private redis: redis.RedisClient
  private getAsync

  constructor() {
    const { dbConfig } = config
    this.redis = redis.createClient({
      host: dbConfig.host,
      port: dbConfig.redisPort,
      password: dbConfig.redisPwd
    })

    this.getAsync = promisify(this.redis.get).bind(this.redis)

    this.initListenEvent()
  }

  // redis监听事件
  private initListenEvent() {
    this.redis.on('error', function (err) {
      console.log('Redis链接失败', err);
    });

    this.redis.on('connect', function () {
      console.log('Redis连接成功!');
    });
  }

  // 判断是否存在key
  isExists(key: string) {
    return this.redis.exists(key)
  }

  // 获取redis数据
  async getKey(key: string) {
    const result = await this.getAsync(key)

    return result
  }

  // 设置redis数据
  async setKey(key: string, value: any, expires?: number) {
    this.redis.set(key, value, (err, result) => {
      console.log('err', err)
    })

    // 超时时间为秒
    // if (!isNaN(expires) && expires > 0) {
    //   this.redis.expire(key, Number(expires), function(err, result) {
    //     console.log('err',err)
    //     console.log('result',result)
    //   })
    // }
  }

  // 销毁redis数据
  delKey(key: string) {
    this.redis.del(key)
  }
}

const store = new RedisClass()

export default store
