(function(){
  var topBarViewStyle, topBarView, addedToWindow;
  topBarViewStyle = require('styles/topBarViewStyle');
  topBarView = YTI.View.topBarView || YTI.View.create();
  topBarView.extend({
    Els: {},
    Data: {},
    Style: topBarViewStyle
  });
  addedToWindow = false;
  /*===========================View=====================*/
  /**
   *@method get-top-bar-view
   */
  topBarView.getPageView = function(){
    var view;
    if (this.Els["pageView"]) {
      return this.Els["pageView"];
    } else {
      view = this.createPageView();
      return view;
    }
  };
  topBarView.show = function(){
    var pageView;
    pageView = this.getPageView();
    pageView.show();
    if (!addedToWindow) {
      addedToWindow = true;
      YTI.APP.mainWindow.add(pageView);
    }
    return pageView;
  };
  topBarView.hide = function(){
    var pageView;
    pageView = this.getPageView();
    pageView.hide();
    return pageView;
  };
  /**
   *@method create-top-bar-view
   */
  topBarView.createPageView = function(){
    var View;
    log('create-top-bar-view');
    View = this.Els.pageView = TUI.createView(this.Style.topBarView);
    View.add(this.createTitleView());
    return View;
  };
  /**
   *@method create-top-bar-navs
   */
  topBarView.createTitleView = function(){
    var title;
    title = TUI.createLabel(this.Style.titleView);
    title.text = "图吖啊！";
    return title;
  };
  /*===========================Control===================*/
  module.exports = topBarView;
}).call(this);
