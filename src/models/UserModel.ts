import { Model, DataTypes } from 'sequelize'
import sequelize from '@libs/DbConnect'
import { UserDataInterface } from '@interfaces/UserInterface'
import dateFormat from '@utils/dateFormat'

class User extends Model implements UserDataInterface {
  // null断言 ! 在严格模式是必须的, 表示肯定有值
  public id!: number
  public userName: string
  public password: string
  public telephone: string
  public roleIds: string
  public createdAt?: Date
  public updatedAt?: Date
}


// DataTypes.STRING => VARCHAR(255)
// DataTypes.STRING(11) => VARCHAR(11)
// 报错：PRIMARY must be unique 这个是数据库的ID一定要选中自动递增
User.init({
  id: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    autoIncrement: true,
    primaryKey: true
  },
  userName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telephone: {
    type: DataTypes.STRING(11),
    allowNull: false
  },
  roleIds: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    get() {
      return dateFormat(this.getDataValue('createdAt'))
    }
  },
  updatedAt: {
    type: DataTypes.DATE,
    get() {
      return dateFormat(this.getDataValue('updatedAt'))
    }
  },
}, {
  tableName: 'user',
  sequelize
})

export default User
