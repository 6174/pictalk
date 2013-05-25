(function(){
  var homeViewStyle, homeView, addedToWindow;
  homeViewStyle = require('styles/homeViewStyle');
  homeView = YTI.View.homeView || YTI.View.create();
  homeView.Els = {};
  homeView.Data = {};
  homeView.Style = homeViewStyle;
  /**
   *@private_variables
   */
  addedToWindow = false;
  /**
   *@private_methods
   */
  /*==========================View==================================*/
  /**
   *@method get-page-view
   */
  homeView.getPageView = function(){
    var view;
    if (this.Els["pageView"]) {
      return this.Els["pageView"];
    } else {
      view = this.createHomeView();
      return view;
    }
  };
  /**
   *@method show
   */
  homeView.show = function(){
    var pageView;
    pageView = this.getPageView();
    pageView.show();
    if (!addedToWindow) {
      YTI.APP.mainWindow.add(pageView);
    }
    return pageView;
  };
  /**
   *@method hide
   */
  homeView.hide = function(){
    var pageView;
    pageView = this.getPageView();
    pageView.hide();
    return pageView;
  };
  /**
   *@method create-home-view 
   */
  homeView.createHomeView = function(){
    var View;
    log('create-home-view');
    View = this.Els.pageView = TUI.createView(this.Style.pageView);
    return View;
  };
  /**
   *@method create-header-view 
   */
  homeView.createTopBarView = function(){
    return topBarView.getPageView();
  };
  /*==========================Control==================================*/
  module.exports = homeView;
}).call(this);
