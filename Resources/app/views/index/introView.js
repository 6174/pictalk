/**
 *介绍页面， 第一次安装应用的时候会出现应用的介绍
 *当第二次打开的时候就不会出现这个页面
 * 
 *scrollableView
 */
(function(){
  var YTI, view1, view2, view3, scrollableView;
  YTI = YTI;
  view1 = TUI.createView({
    backgroundColor: '#123'
  });
  view2 = TUI.createView({
    backgroundColor: '#246'
  });
  view3 = TUI.createView({
    backgroundColor: '#48b'
  });
  scrollableView = Ti.UI.createScrollableView({
    views: [view1, view2, view3],
    showPagingControl: false
  });
  module.exports = scrollableView;
}).call(this);
