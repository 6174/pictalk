/**
*Class
*@author:  chenxuejia
*/
 
(function(that){
  var Class;
  /**
  *原型继承模式
  *create 方法
  */
  if (typeof Object.create !== "function"){ 
    Object.create = function(o) {
      function F() {}
      F.prototype = o;
      return new F();
    };
  }

  Class = {
    inherited: function(){},
    created: function(){},
    moduleKeywords: ["included", "extended"],
    prototype: {
      initializer: function(){},
      init: function(){}
    },
    create: function(include, extend){

      var object = Object.create(this);
      object.parent    = this;
      //this.prototye覆盖了原型链, 但是还是存在一个__proto__
      //所以返回的object有一个prototype属性，但是只有__proto__
      object.prototype = object.fn = Object.create(this.prototype);

      if (include) object.include(include);
      if (extend)  object.extend(extend);

      object.created();
      this.inherited(object);
      return object;

    },

    init: function(){
      var initance = Object.create(this.prototype);
      initance.parent = this;

      initance.initializer.apply(initance, arguments);
      initance.init.apply(initance, arguments);
      return initance;
    },

    proxy: function(func){
      var thisObject = this;
      return(function(){
        return func.apply(thisObject, arguments);
      });
    },
   
    proxyAll: function(){
      var functions = [].slice.call(arguments, 0);
      for (var i=0; i < functions.length; i++)
        this[functions[i]] = this.proxy(this[functions[i]]);
    },

    include: function(obj){
      for(var key in obj)
        if (this.moduleKeywords.indexOf(key) == -1)
          this.fn[key] = obj[key];
     
      var included = obj.included;
      if (included) included.apply(this);
      return this;
    },

    extend: function(obj){
      for(var key in obj)
        if (this.moduleKeywords.indexOf(key) == -1)
          this[key] = obj[key];
     
      var extended = obj.extended;
      if (extended) extended.apply(this);
      return this;
    }
  };
  module.exports = Class;
}(this))





 