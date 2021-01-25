import redis from 'redis'
import config from '../config'
import Koa from 'koa'

class RedisClass {
  public redis: redis.RedisClient
  constructor() {
    const { dbConfig } = config
    this.redis = redis.createClient({
      host: dbConfig.host,
      port: dbConfig.redisPort,
      password: dbConfig.redisPwd
    })

    this.initListenEvent()
  }

  static initRedis() {
    return async (ctx: Koa.Context, next: () => Promise<any>) => {
      ctx.store = new RedisClass()
    }
  }

  initListenEvent() {
    this.redis.on('ready',function(res){
      console.log('redis ready');
    });

    this.redis.on('error', function (err) {
        console.log(err);
    });

    this.redis.on('connect',function(){
        console.log('redis connect success!');
    });
  }

  get(key: string) {}

  set(key: string, value: any) {}

  destroy(key:string) {}
}

export default RedisClass
