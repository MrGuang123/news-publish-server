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
    if (!isNaN(expires) && expires > 0) {
      this.redis.expire(key, Number(expires))
    }
  }

  // 销毁redis数据
  destroyKey(key: string) {
    this.redis.del(key)
  }
}

const store = new RedisClass()

export default store
