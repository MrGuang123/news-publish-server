import { IApi } from "@interfaces/IApi"
import { IData } from "@interfaces/IData"

class ApiService implements IApi{
  getInfo() {
    return new Promise<IData>(resolve => {
      resolve({
        item: 'data',
        result: [1, 2, 3]
      })
    })
  }
}

export default ApiService
