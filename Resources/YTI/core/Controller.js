/**
 *Controller 类
 *
 *负责view的事件驱动， model的更改， 以及view的渲染
 */
(function(){
  var Class, Event, Controller;
  Class = require('common/Class');
  Event = require('common/util/Event');
  Controller = Class.create();
  Controller.extend(Event);
  Controller.extend({
    EL: null,
    els: [],
    events: null
  });
  module.exports = Controller;
}).call(this);
