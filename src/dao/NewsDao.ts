import NewsModel from '@models/NewsModel'
import { NewsDataInterface, NewsListQueryInterface, NewsInfoQueryInterface, CommonCreateInterface } from '@interfaces/NewsInterface'

class NewsDao {
  // 获取新闻列表
  getNewsList(params: NewsListQueryInterface) {
    return NewsModel.findAll({
      where: {
        isDelete: 0
      },
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
