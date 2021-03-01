import { Model, DataTypes } from 'sequelize'
import sequelize from '@libs/DbConnect'

class Role extends Model {
  public id: number
  public roleName: string
  public authIds: string
  public createdAt?: Date
  public updatedAt?: Date
}

Role.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  roleName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  authIds: {
    type: DataTypes.STRING,
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE
  },
  updatedAt: {
    type: DataTypes.DATE
  }
}, {
  tableName: 'role',
  sequelize
})

Role.sync().catch(e => console.log(e))

export default Role
