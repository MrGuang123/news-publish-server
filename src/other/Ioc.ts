import { parseScript } from 'esprima'
import { Pattern } from 'estree'
import CreateIoc from './createIoc'
import 'reflect-metadata'

const container = new CreateIoc()

interface ITypes {
  [key: string]: Symbol
}
const TYPES: ITypes = {
  indexService: Symbol.for('indexService')
}

interface IIndexService {
  log(str: string): void;
}

class IndexService implements IIndexService {
  log(str: string) {
    console.log(str)
  }
}

container.bind(TYPES.indexService, () => new IndexService())

function _getParams(fn: Function) {
  let ast = parseScript(fn.toString())
  let node = ast.body[0]
  let fnParams: Pattern[] = []

  if (node.type === 'FunctionDeclaration') {
    fnParams = node.params
  }

  let validParams: string[] = []
  fnParams.forEach(obj => {
    if (obj.type === 'Identifier') {
      validParams.push(obj.name)
    }
  })
  return validParams
}

function hasKey<O extends Object>(obj: O, key: keyof any): key is keyof O {
  return obj.hasOwnProperty(key)
}

function controllertest<T extends { new(...args: any[]): {} }>(constructor: T) {
  class Controller extends constructor {
    constructor(...args: any[]) {
      super(args)

      let params = _getParams(constructor)
      let indentify: string
      for (indentify of params) {
        if (hasKey(this, indentify)) {
          // this[indentify] = container.get(TYPES[indentify])
          this[indentify] = Reflect.getMetadata(TYPES[indentify], constructor)
        }
      }
    }
  }

  return Controller
}

function inject(serviceIndentify: Symbol): Function {
  return (target: Function, targetKey: string, index: number) => {
    console.log(target, targetKey, index)
    // 只有构造函数没有targetKey，如果在info上面添加inject装饰器，targetKey为info
    if(!targetKey) {
      // 反射，在这里serviceIndentify为indexService，container.get(serviceIndentify)为indexService对应的实例，target为indexController
      Reflect.defineMetadata(serviceIndentify, container.get(serviceIndentify),target)
    }
  }
}

@controllertest
class IndexController {
  public indexService: IIndexService;
  constructor(@inject(TYPES.indexService) indexService?: IIndexService) {
    // 后面加! 表示肯定有值  不是undefined
    this.indexService = indexService!
  }

  info() {
    this.indexService.log('test🍑')
  }
}

const indexController = new IndexController()
indexController.info()

