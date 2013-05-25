(function(){
  var YTI, homeView, topBarView, infoListView, mainWindow;
  YTI = require('YTI/YTI');
  homeView = require('app/views/index/homeView');
  topBarView = require('app/views/index/topBarView');
  infoListView = require('app/views/index/infoListView');
  mainWindow = YTI.APP.mainWindow = YTI.View.createAppWindow();
  mainWindow.open();
  YTI.View.extend({
    homeView: homeView,
    topBarView: topBarView,
    infoListView: infoListView
  });
  mainWindow.add(homeView.getPageView());
}).call(this);
