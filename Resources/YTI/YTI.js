/**
 *YTI MVC library
 *facade of YTI
 *
 */
(function(){
  var Event, util, toolkit, Class, View, APP, Controller, Model, color, underscore;
  Ti.include("core/common/common.js");
  Event = require('core/common/util/Event');
  util = require('core/common/util/util');
  toolkit = require('core/common/util/toolkit');
  Class = require('core/common/Class');
  View = require('core/View');
  APP = require('core/APP');
  Controller = require('core/Controller');
  Model = require('core/Model');
  color = require('core/lib/color');
  underscore = require('core/lib/underscore');
  this.YTI = Class.create();
  this.YTI.extend(util);
  this.YTI.extend(toolkit);
  this.YTI.extend(Event);
  this.YTI.extend({
    View: View,
    APP: APP,
    Controller: Controller,
    Model: Model
  });
  this.YTI.Color = color;
  this._ = underscore;
  module.exports = this.YTI;
}).call(this);
