(function(){
  var Event, Class, Model;
  Ti.include("common/common.js");
  Event = require('common/util/Event');
  Class = require('common/Class');
  Model = Class.create();
  Model.extend(Event);
  Model.include(Event);
  module.exports = Model;
}).call(this);
