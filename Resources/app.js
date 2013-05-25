(function(){
  var YTI, homeView, topBarView, mainWindow;
  YTI = require('YTI/YTI');
  homeView = require('app/views/homeView');
  topBarView = require('app/views/topBarView');
  mainWindow = YTI.APP.mainWindow = YTI.View.createAppWindow();
  mainWindow.open();
  YTI.View.extend({
    homeView: homeView,
    topBarView: topBarView
  });
}).call(this);
