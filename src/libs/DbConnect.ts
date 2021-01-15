import { Sequelize } from 'sequelize'
import config from '../config'

const { dbConfig } = config
const dbRemoteUrl = `${dbConfig.dialect}://${dbConfig.user}:${dbConfig.pwd}@${dbConfig.host}:${dbConfig.port}/${dbConfig.dbName}`

const sequelize = new Sequelize(dbRemoteUrl)

export default sequelize





