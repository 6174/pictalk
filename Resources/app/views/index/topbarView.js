(function(){
  var topBarViewStyle, topBarView;
  topBarViewStyle = require('styles/topBarViewStyle');
  topBarView = YTI.View.topBarView || YTI.View.create();
  topBarView.extend({
    Els: {},
    Data: {},
    Style: topBarViewStyle
  });
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
    log('create-title-view');
    title = TUI.createLabel(this.Style.titleView);
    title.text = "图吖啊！";
    return title;
  };
  /*===========================Control===================*/
  module.exports = topBarView;
}).call(this);
