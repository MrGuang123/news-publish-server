import { Model, DataTypes } from 'sequelize'
import sequelize from '../libs/DbConnect'
import { UserDataInterface } from '../interfaces/UserDataInterface'
import dateFormat from '@utils/dateFormat'

class User extends Model implements UserDataInterface {
  // null断言 ! 在严格模式是必须的
  public id!: number
  public userName: string
  public password: string
  public telephone: string | null
  public createdAt: Date
  public updatedAt: Date
}

User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  userName: {
    type: new DataTypes.STRING(100),
    allowNull: false
  },
  password: {
    type: new DataTypes.STRING(100),
    allowNull: false
  },
  telephone: {
    type: new DataTypes.STRING(11),
    allowNull: false
  },
  createdAt: {
    type: new DataTypes.DATE,
    get() {
      return new Date(this.getDataValue('createdAt')).toLocaleString()
    }
  },
  updatedAt: {
    type: new DataTypes.DATE,
    get() {
      return dateFormat(this.getDataValue('updatedAt'))
    }
  },
}, {
  tableName: 'user',
  sequelize
})

console.log(User)

export default User
