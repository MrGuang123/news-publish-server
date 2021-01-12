// 可插拔架构
(function(){
  var root =
    (typeof self === 'object' && self.self === self && self) ||
    (typeof global === 'object' && global.global === global && global) ||
    this ||
    {}

    var _ = function(obj) {
      if(obj instanceof _) return obj
      if(!(this instanceof _)) return new _(obj)
      this._wrapped = obj
    }
    _.xxx = function(){}

    root._ = _
})()
