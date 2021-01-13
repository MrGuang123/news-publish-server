# 新闻发布系统后端

## 配置
### nodemon配置
[nodemon 基本配置与使用](https://blog.csdn.net/qq_36727756/article/details/88797699)
ts-node-dev
### 多个命令执行配置
[concurrently执行多个命令](https://www.npmjs.com/package/concurrently)
### log4js配置
[log4js配置](https://blog.csdn.net/kingov/article/details/79787868)
### koa2 mariadb sequelize
https://blog.csdn.net/lixinyi0622/article/details/84797573

依赖sequelize  mariadb @types/node  @types/validator
https://www.sequelize.com.cn/
### e2e 测试
rize puppeteer  或者  cli默认
### 接口测试
mocha  chai supertest
### IOC
https://github.com/jeffijoe/awilix awilix-koa
### 别名管理器
module-alias
### 查看占用端口进程  关闭指定进程
ps -ef | grep nodemon lsof -i :port  kill -9 pid
### esprima 转抽象语法树
tsconfig.compilerOptions.target如果为es6+，装饰器接收到的是类,小于es6，装饰器接收到的构造函数
