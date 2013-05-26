(function(){
  var YTI, homeView, topBarView, infoListView, navBarView, talkListView, mainWindow;
  YTI = require('YTI/YTI');
  homeView = require('app/views/index/homeView');
  topBarView = require('app/views/index/topBarView');
  infoListView = require('app/views/index/infoListView');
  navBarView = require('app/views/index/navBarView');
  talkListView = require('app/views/pictalk/talkListView');
  mainWindow = YTI.APP.mainWindow = YTI.View.createAppWindow();
  mainWindow.open();
  YTI.View.extend({
    homeView: homeView,
    topBarView: topBarView,
    infoListView: infoListView,
    navBarView: navBarView,
    talkListView: talkListView
  });
  mainWindow.add(topBarView.getPageView());
  mainWindow.add(talkListView.getPageView());
  mainWindow.add(navBarView.getPageView());
}).call(this);
