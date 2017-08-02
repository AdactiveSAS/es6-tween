import Plugins from './Plugins'

export default class Composite {
  constructor (domNode) {
    this.domNode = domNode
    this.plugins = {}

    this.map = this.map.bind(this)
    this.render = this.render.bind(this)
    this.init = this.init.bind(this)
    this.fetch = this.fetch.bind(this)

    return this
  }

  map (type, ...args) {
    let {plugins} = this

    for (let p in plugins) {
      let plugin = plugins[p]

      plugin && plugin[type] && plugin[type].apply(this, args)
    }

    return this
  }

  render (object, value, elapsed) {
    return this.map('update', object, value, elapsed)
  }

  init (object) {
    return this.map('init', object)
  }

  fetch (object) {
    return this.map('fetch', object)
  }

  applyPlugin (name, ...args) {
    if (Plugins[name] !== undefined) {
      this.plugins[name] = Plugins[name].apply(this, args)
      return this.plugins[name]
    }

    return this
  }

  appendTo (node) {
    node.appendChild(this.domNode)
    return this
  }
}
