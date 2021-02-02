import { Model, DataTypes } from 'sequelize'
import sequelize from '@libs/DbConnect'
import { NewsDataInterface } from '@interfaces/NewsInterface'

class News extends Model implements NewsDataInterface {
  id: number
  newsTitle: string
  summary: string
  creatorId: number
  areaId: number
  content: string
  labelIds?: string
  isDelete: boolean
  isPublished: boolean
  createdAt?: any
  updatedAt?: any
}

News.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  newsTitle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  summary: {
    type: DataTypes.STRING,
    allowNull: false
  },
  creatorId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING(1000),
    allowNull: false
  },
  labelIds: {
    type: DataTypes.STRING,
    allowNull: true
  },
  isDelete: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
}, {
  tableName: 'news',
  sequelize
})

News.sync().catch(e => console.log(e))

export default News
