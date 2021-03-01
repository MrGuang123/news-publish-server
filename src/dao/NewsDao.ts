import NewsModel from '@models/NewsModel'
import UserModel from '@models/UserModel'
import { NewsDataInterface, NewsListQueryInterface, NewsInfoQueryInterface, CommonCreateInterface } from '@interfaces/NewsInterface'
import { Op } from 'sequelize'
import { getTodayRange } from '@utils/dateFormat'

NewsModel.belongsTo(UserModel, {
  foreignKey: 'creatorId',
  targetKey: 'id',
  as: 'user'
})
class NewsDao {
  // 获取新闻列表
  getNewsList(params: NewsListQueryInterface) {
    let searchOption = {
      isDelete: 0
    }
    if(params.newsTitle) {
      searchOption = Object.assign(searchOption, {
        newsTitle: {
          [Op.like]: `%${params.newsTitle}%`
        }
      })
    }

    return NewsModel.findAll({
      where: searchOption,
      include: [{
        model: UserModel,
        as: 'user',
        attributes: [['userName', 'creatorName']]
      }],
      attributes: {
        exclude: ['isDelete']
      },
      limit: params.pageSize,
      offset: params.pageSize * (params.pageIndex - 1)
    })
  }

  // 获取新闻详情
  getNewsInfo(id: number): Promise<NewsDataInterface> {
    return NewsModel.findOne({
      where: {
        id: id,
        isDelete: 0
      },
      attributes: {
        exclude: ['isDelete']
      }
    })
  }

  // 创建新闻
  createNews(params: CommonCreateInterface) {
    return NewsModel.create(params)
  }

  // 修改新闻
  updateNews(newsInfo: CommonCreateInterface) {
    return NewsModel.update(newsInfo, {
      where: {
        id: newsInfo.id
      }
    })
  }

  // 删除新闻
  deleteNews(newsInfo: NewsDataInterface) {
    const params = Object.assign(newsInfo, {
      isDelete: 1
    })

    return NewsModel.update(params, {
      where: {
        id: newsInfo.id
      }
    })
  }

  // 获取今日新闻发布数量
  getTodayPublished(): Promise<any> {
    const [start, end] = getTodayRange()
    // Op.and复合查询，两个条件同时为true的时候返回
    // 使用工具函数计算出今天的0点和24点减去1毫秒，使用Op.gt和Op.lt来约束校验字段
    // count函数只是查询数据的数量
    const params = {
      [Op.and]: [
        {
          isDelete: 0
        },
        {
          createdAt: {
            [Op.gt]: start,
            [Op.lt]: end
          }
        }
      ]
    }

    return NewsModel.count({
      where: params
    })
  }

  // 获取所有新闻数量
  getAllNewsNum(): Promise<any> {
    const params = {
      isDelete: 0
    }

    return NewsModel.count({
      where: params
    })
  }

  // 获取所有新闻的总浏览量
  getAllReadCount(): Promise<any> {
    const params = {
      isDelete: 0
    }

    // sum方法返回readCount字段使用where条件下的数量总和是多少
    return NewsModel.sum('readCount', {
      where: params
    })
  }

  // 获取排序后的新闻列表
  // 获取最新新闻参数为'updatedAt'，获取热度最高新闻参数为'readCount'
  // DESC是按照从高到低进行排序
  getOrderedNews(action: string) {
    let orderParam: [string, string][]
    if(action === 'updatedAt') {
      orderParam = [
        ['updatedAt', 'DESC']
      ]
    }else {
      orderParam = [
        ['readCount', 'DESC'],
        ['updatedAt', 'DESC']
      ]
    }
    return NewsModel.findAll({
      where: {
        isDelete: 0,
        isPublished: true
      },
      attributes: ['id', 'newsTitle', 'summary', 'content', 'updatedAt', 'readCount'],
      order: orderParam,
      limit: 5
    })
  }
}

export default NewsDao
