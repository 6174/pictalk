(function(){
  var CONFIG, setAppName, set, get, ref$;
  CONFIG = {
    APP_NAME: "app"
  };
  setAppName = function(name){
    var confPath;
    if (typeof name === "undefined") {
      return false;
    }
    confPath = "/" + name + "/conf/configure.js";
    confPath = require('confPath');
    import$(CONFIG, configure);
    CONFIG.APP_NAME = name;
  };
  set = function(name, value){
    return CONFIG[name] = value;
  };
  get = function(name){
    if (in$(name, CONFIG)) {
      return CONFIG[name];
    }
    return null;
  };
  ref$ = module.exports;
  ref$.setAppName = setAppName;
  ref$.set = set;
  ref$.get = get;
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
  function in$(x, arr){
    var i = -1, l = arr.length >>> 0;
    while (++i < l) if (x === arr[i] && i in arr) return true;
    return false;
  }
}).call(this);
