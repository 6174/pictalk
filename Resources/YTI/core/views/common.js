(function(){
  var TiViewProto, extendMethods;
  TiViewProto = Ti.UI.View.prototype;
  extendMethods = {
    $add: function(view, attrs){
      if (typeof attrs === "object") {
        import$(view, attrs);
      }
      view.parent = this;
      this.add(view);
    },
    $findById: function(id){
      var children, len, queue, c_view, _children;
      children = this.getChildren();
      len = children.length;
      if (len === 0) {
        return;
      }
      queue = [];
      queue.push(children[0]);
      while (queue.length > 0) {
        c_view = queue.shift;
        if (id === c_view.id) {
          return c_view;
        }
        _children = c_view.getChildren();
        queue.concat(_children);
      }
      return null;
    },
    $findByClassName: function(className){
      var ret, children, len, queue, c_view, classArr, _children;
      ret = [];
      children = this.getChildren();
      len = children.length;
      if (len === 0) {
        return;
      }
      queue = [];
      queue.push(children[0]);
      while (queue.length > 0) {
        c_view = queue.shift;
        classArr = c_view['class'].split(/\s+/);
        if (classArr.indexOf(className > -1)) {
          ret.push(c_view);
        }
        _children = c_view.getChildren();
        queue.concat(_children);
      }
      return ret;
    },
    $removeById: function(id){
      var _view;
      _view = this.findById$(id);
      if (_view !== null) {
        return this.remove(_view.parent);
      }
    },
    $test: function(){
      return Ti.API.info("extended method test");
    }
  };
  import$(TiViewProto, extendMethods);
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
