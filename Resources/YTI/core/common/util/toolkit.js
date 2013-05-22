/**
 *util ---- toolkit.js
 *
 *@author chexuejia
 */
(function(that){
	var toolkit = {};

	/**
	 *Namespace
	 */
	toolkit.Namespace = function (str, context) {
	   var parts = str.split("."),
	        parent = context;
	   for(var i = 0, l = parts.length; i < l; i++) {
	        if( typeof parent[parts[i]] === "undefined" ) {
	             parent[parts[i]] = {};
	        }
	        parent = parent[parts[i]];
	   }
	   return parent;
	}

	/**
	*extend method
	*/
	toolkit.Extend = function (context, obj) {
     var obj = obj || {};
     for(var attr in obj) if(obj.hasOwnProperty(attr)) {
          context[attr] = obj[attr];
     }
     return obj;
	}
	
	/**
	*Deep extend
	*/
	toolkit.DeepExtend = function(parent, child) {
	     var i,
	          toStr = Object.prototype.toString,
	          astr = "[object Array]",
	          thisFunc = arguments.callee;
	     child = child || {};
	     for(i in parent) {
	          if(parent.hasOwnProperty(i)) {
	               if(typeof parent[i] === "object") {
	                    child[i] = (toStr.call(parent[i]) === astr) ? [] : {};
	                    thisFunc(parent[i], child[i]);
	               } else {
	                    child[i] = parent[i];
	               }
	          }
	     }
	     return child;
	}

	/**
	*mix 将多个对象合并为一个对象并返回该对象
	*/
	toolkit.Mix = function () {
	     var args, prop, obj = {};
	     for (arg = 0, l = arguments.length; arg < l; arg += 1 ) {
	          for (prop in arguments[arg]) {
	               if(arguments[arg].hasOwnProperty(prop)) {
	                    obj[prop] = arguments[arg][prop];
	               }
	          }
	     }
	     return obj;
	}

	/**
	*proxy method
	*/
	toolkit.Proxy = function (func, context) {
	     return function () {
	          func.apply(context, arguments);
	     }
	}

	/**
	*函数包装器件
	*/
	toolkit.Wrap=function(func, wrapper){
	       var __method=func;
	       return function(){
	         var args=Array.prototype.slice.call(arguments);
	          return wrapper.apply(this,[__method.bind(this)].concat(args));
	       }
	     /*
	     eg:
	     f=wrap(f, function(org,x,y){
	         console.log("x:"+x,"y:"+y);
	          var r=org(x,y);
	          console.log("result:"+r);
	       });
	     */
	}
	/**
	*curry method
	*/
	toolkit.Curry = function (func) {
	     var old_args = Array.slice.call(arguments, 1);
	     return function () {
	          var new_args = Array.slice.call(arguments),
	               args = old_args.concat(new_args);
	          return func.apply({}, args);
	     }
	}

	/**
	*把一个函数变成备忘模式
	*/
	toolkit.Backup = function (func) {
	     var cache = {};
	     return function () {
	          var args = Array.prototype.slice.call(arguments);
	          var key = JSON.stringify(args);
	          var result;
	          if(!cache[key]) {
	               result = func.apply({},args);
	               cache[key] = result;
	          }
	          return cache[key];
	     }
	     /*
	     function test (a, b) {
	          console.log("proccessing!");
	          return a + b;
	     }
	     var a = toolkit.prototype.setFuncBackupMode(test);
	     console.log(a(1, 2));
	     console.log(a(1, 2));
	     */
	}

	/**
	 *guid
	 */
	toolkit.guid = function(){
	    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
	      return v.toString(16);
	    }).toUpperCase();      
	}
	module.exports = toolkit;
}(this))
