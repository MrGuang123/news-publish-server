import { parseScript } from 'esprima'
import { Pattern } from 'estree'
import CreateIoc from './createIoc'

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
          this[indentify] = container.get(TYPES[indentify])
        }
        // console.log(this[indentify].toString())
      }
    }
  }

  return Controller
}

@controllertest
class IndexController {
  public indexService: IIndexService;
  constructor(indexService?: IIndexService) {
    // 后面加! 表示肯定有值  不是undefined
    this.indexService = indexService!
  }

  info() {
    this.indexService.log('test')
  }
}

const indexController = new IndexController()
indexController.info()

