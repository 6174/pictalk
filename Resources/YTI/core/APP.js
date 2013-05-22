/**
 *APP
 *App 包含应用的当前状态情况， window级别应用事件驱动， 以及配置文件
 *
 */
(function(){
  var Class, Event, Test, APP;
  Ti.include("common/common.js");
  Class = require('common/Class');
  Event = require('common/util/Event');
  Test = require('../Test');
  APP = Class.create();
  APP.extend(Event);
  APP.extend({
    config: null,
    status: null,
    data: null
  });
  APP.open = function(page_name, animation){};
  module.exports = APP;
}).call(this);
