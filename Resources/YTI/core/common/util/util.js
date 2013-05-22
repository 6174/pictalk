(function(){
  var util, platform;
  util = {};
  platform = Ti.Platform.name;
  util.isIphone = function(){
    return platform === {
      'iPhone OS': true != null ? true : false
    };
  };
  util.isAndroid = function(){
    return platform === {
      'android': true != null ? true : false
    };
  };
  util.dp2px = function(densityPixels){
    if (this.isIphone) {
      return densityPixels;
    }
    return densityPixels * Ti.platform.displayCaps.dpi / 160;
  };
  util.log = function(msg){
    Ti.API.info(msg);
  };
  util.getJSON = function(args){
    var url, data, method, callBack, errorBack, context, xhr;
    url = args.url;
    data = args.data;
    method = args.method;
    callBack = args.success || function(){};
    errorBack = args.error || function(){};
    context = args.context || {};
    xhr = Ti.Network.createHTTPClient();
    xhr.onload = function(){
      var responseText, data, e;
      responseText = this.responseText;
      try {
        data = JSON.parse(responseText);
        callBack.call(context, data);
      } catch (e$) {
        e = e$;
        alert(responseText);
      }
    };
    xhr.onerror = function(){
      errorBack.call(context);
    };
    xhr.open(method, url);
    return xhr.send(data);
  };
  module.exports = util;
}).call(this);
