import { Sequelize, Model, DataTypes } from 'sequelize'

const sequelize = new Sequelize('mariadb://root:root@140.143.191.101:3306/news_publish')

// interface UserAttributes {
//   id: number
//   user_name: string
//   password: string
//   telephone: string
// }

class User extends Model {
  // null断言 ! 在严格模式是必须的
  public id!: number
  public user_name: string
  public password: string
  public telephone: string | null


  // 因为TS不能在编译阶段确认模型关联，必须在这里声明， 在模型初始化之前他们是不存在的
  // public getProjects!: HasManyGetAssociationsMixin<Project>
}

User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  user_name: {
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
  }
}, {
  tableName: 'user',
  sequelize
})

async function createUser() {
  const newUser = await User.create({
    user_name: 'admin',
    password: 'admin',
    telephone: '13212312312'
  })
  console.log(newUser.id)
}

createUser()
