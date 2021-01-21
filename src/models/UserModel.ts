import { Model, DataTypes } from 'sequelize'
import sequelize from '@libs/DbConnect'
import { UserDataInterface } from '@interfaces/UserInterface'
import dateFormat from '@utils/dateFormat'

class User extends Model implements UserDataInterface {
  // null断言 ! 在严格模式是必须的, 表示肯定有值
  public id!: number
  public userName: string
  public password: string
  public telephone: string | null
  public roleIds: string
  public createdAt?: Date
  public updatedAt?: Date
}

User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    defaultValue: 0,
    autoIncrement: true,
    primaryKey: true
  },
  userName: {
    type: new DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: new DataTypes.STRING,
    allowNull: false
  },
  telephone: {
    type: new DataTypes.STRING,
    allowNull: false
  },
  roleIds: {
    type: new DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: new DataTypes.DATE,
    get() {
      return dateFormat(this.getDataValue('createdAt'))
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

export default User
