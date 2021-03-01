
export interface NewsDataInterface {
  toJSON(): any
  id: number
  newsTitle: string
  summary: string
  creatorId: number
  areaId: number
  content: string
  readCount: number
  labelIds?: string
  isDelete: boolean
  isPublished: boolean
  createdAt?: any
  updatedAt?: any
}

export interface NewsListQueryInterface {
  pageSize: number
  pageIndex: number
  newsTitle?: string
}

export interface CommonCreateInterface {
  [key: string]: any
}

export interface NewsInfoQueryInterface {
  id: number
}

export interface NewsInterface {
  getNewsList(params: NewsListQueryInterface): Promise<NewsDataInterface[]>
  getNewsInfo(params: NewsInfoQueryInterface): Promise<NewsDataInterface>
  createNews(params: CommonCreateInterface): Promise<any> | any
  updateNews(params: CommonCreateInterface): Promise<any> | any
  deleteNews(params: NewsInfoQueryInterface): Promise<any>
  getShowData(): Promise<any>
  getNewestNews(): Promise<any>
  getHotNews(): Promise<any>
}
