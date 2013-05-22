(function(){
  var Event, Class, radioView, base, View;
  Ti.include("common/common.js");
  Ti.include("views/common.js");
  Event = require('common/util/Event');
  Class = require('common/Class');
  radioView = require('views/radioView');
  base = require('views/styles/base');
  /**
   *扩展Ti的View类， 增加更多新的方法
  */
  View = Class.create();
  View.extend(Event);
  View.include(Event);
  View.extend({
    createRadioView: radioView
  });
  View.createAppWindow = function(conf){
    var win;
    conf = conf || base.defaultStyle;
    win = TUI.createWindow({
      navBarHidden: true,
      title: "",
      backgroundColor: "white"
    });
    import$(win, conf);
    return win;
  };
  View.openPage = function(pageName, win, callback){
    var page, pageView;
    page = this[pageName];
    if (page) {
      if (this._currentPage) {
        this._currentPage.getPageView.hide();
      }
      this._currentPage = page;
      pageView = page.getPageView();
      pageView.show();
      return win.add(pageView);
    } else {
      return false;
    }
  };
  module.exports = View;
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
