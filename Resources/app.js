(function(){
  var YTI, homeView, taskView, datePickerView, taskModel, mainWindow;
  YTI = require('YTI/YTI');
  homeView = require('tlist/views/homeView');
  taskView = require('tlist/views/taskView');
  datePickerView = require('tlist/views/datePickerView');
  taskModel = require('tlist/models/taskModel');
  mainWindow = YTI.APP.mainWindow = YTI.View.createAppWindow();
  mainWindow.open();
  YTI.Model.extend({
    taskModel: taskModel
  });
  YTI.View.extend({
    homeView: homeView,
    taskView: taskView,
    datePickerView: datePickerView
  });
  mainWindow.add(homeView.getPageView());
}).call(this);
