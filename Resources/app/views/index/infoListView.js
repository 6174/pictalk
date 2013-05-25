(function(){
  var infoListViewStyle, infoListView;
  infoListViewStyle = require('styles/infoListViewStyle');
  infoListView = YTI.View.infoListView || YTI.View.create();
  infoListView.extend({
    Els: {},
    Data: {},
    Style: infoListViewStyle
  });
  /*=========================View==========================*/
  /**
   *@method get-page-view
   */
  infoListView.getPageView = function(){
    var view;
    if (this.Els["pageView"]) {
      return this.Els["pageView"];
    } else {
      view = this.createPageView();
      return view;
    }
  };
  /**
   *@method create-info-list-view
   */
  infoListView.createPageView = function(){
    var View;
    log('create-info-list-view');
    View = this.Els.pageView = TUI.createView(this.Style.infoListView);
    View.add(this.createScrollContainerView());
    return View;
  };
  /**
   *@method create-scroll-container-view
   */
  infoListView.createScrollContainerView = function(){
    var scrollContainer;
    scrollContainer = this.Els.scrollContainer = TUI.createScrollView(this.Style.scrollContainerView);
    this.updateInfoList();
    return scrollContainer;
  };
  /**
   *@method create-info-item-view
   */
  infoListView.createInfoItemView = function(data){
    var infoItem, label;
    infoItem = TUI.createView(this.Style.infoItemView);
    import$(infoItem, data.style);
    label = TUI.createLabel({
      text: "in item",
      font: {
        fontSize: "30px",
        fontWeight: "bold"
      }
    });
    infoItem.add(label);
    return infoItem;
  };
  /**
   *@method update-info-list
   */
  infoListView.updateInfoList = function(infoList){
    var scrollContainer, top, height, marginTop, i$, i, data, item;
    scrollContainer = this.Els.scrollContainer;
    top = 0;
    height = 160;
    marginTop = 2;
    for (i$ = 0; i$ <= 10; ++i$) {
      i = i$;
      data = {
        style: {
          top: top + "px",
          height: height
        }
      };
      item = this.createInfoItemView(data);
      top += height + marginTop;
      scrollContainer.add(item);
    }
  };
  /*================================control===========================*/
  module.exports = infoListView;
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
