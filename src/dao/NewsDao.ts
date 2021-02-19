import NewsModel from '@models/NewsModel'
import UserModel from '@models/UserModel'
import { NewsDataInterface, NewsListQueryInterface, NewsInfoQueryInterface, CommonCreateInterface } from '@interfaces/NewsInterface'
import { Op } from 'sequelize'

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
}

export default NewsDao
