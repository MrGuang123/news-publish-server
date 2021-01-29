import { Sequelize, Dialect } from 'sequelize'
import config from '../config'

const { dbConfig } = config
// const dbRemoteUrl = `${dbConfig.dialect}://${dbConfig.user}:${dbConfig.pwd}@${dbConfig.host}:${dbConfig.port}/${dbConfig.dbName}`

const sequelize = new Sequelize(dbConfig.dbName, dbConfig.user, dbConfig.pwd, {
  dialect: dbConfig.dialect as Dialect,
  host: dbConfig.host,
  port: dbConfig.port,
  // 设置时间格式，是在存储到数据库后发生的，导致创建用户的时候返回的日期格式不是格式化的，所以创建成功后还需查询一次用户信息
  dialectOptions: {
    dateStrings: true,
    typeCast: true
  },
  timezone: '+08:00'
})

export default sequelize





