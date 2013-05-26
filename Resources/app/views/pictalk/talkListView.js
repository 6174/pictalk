(function(){
  var talkListViewStyle, talkListView, addedToWindow;
  talkListViewStyle = require('styles/talkListViewStyle');
  talkListView = YTI.View.talkListView || YTI.View.create();
  talkListView.extend({
    Els: {},
    Data: {},
    Style: talkListViewStyle
  });
  /**
   *@private
   */
  addedToWindow = false;
  /*================================View struct==================/
  /**
   *@method get-page-view
   */
  talkListView.getPageView = function(){
    var view;
    if (this.Els["pageView"]) {
      return this.Els["pageView"];
    } else {
      view = this.createPageView();
      return view;
    }
  };
  /**
   *@method show
   */
  talkListView.show = function(){
    var pageView;
    pageView = this.getPageView();
    pageView.show();
    if (!addedToWindow) {
      addedToWindow = true;
      YTI.APP.mainWindow.add(pageView);
    }
    YTI.View.navBarView.hide();
    return pageView;
  };
  /**
   *@method hide
   */
  talkListView.hide = function(){
    var pageView;
    pageView = this.getPageView();
    pageView.hide();
    YTI.View.navBarView.show();
    return pageView;
  };
  /**
   *@method create-page-view
   */
  talkListView.createPageView = function(){
    var View;
    View = this.Els.pageView = TUI.createView(this.Style.pageView);
    View.add(this.createTalkListView());
    View.add(this.createReplyView());
    return View;
  };
  /**
   *@method create-back-button
   */
  talkListView.createReplyView = function(){
    var replyButton;
    replyButton = TUI.createButton(this.Style.replyButton);
    return replyButton;
  };
  /**
   *@method create-talk-list-view
   */
  talkListView.createTalkListView = function(){
    var scrollContainer;
    log('create-talk-list-view');
    scrollContainer = this.Els.scrollContainer = TUI.createScrollView(this.Style.scrollContainerView);
    this.updateTalkList();
    return scrollContainer;
  };
  /**
   *@method create-talk-item
   */
  talkListView.createTalkItem = function(data){
    var View, cardUserInfoBar, label, picCardView;
    View = TUI.createView(this.Style.talkItemView);
    import$(View, data.style);
    cardUserInfoBar = TUI.createView(this.Style.cardUserInfoBar);
    label = TUI.createLabel(this.Style.cardInfoBarDate);
    label.text = "2012/3/15";
    cardUserInfoBar.add(label);
    picCardView = TUI.createView(this.Style.picCardView);
    View.add(cardUserInfoBar);
    View.add(picCardView);
    return View;
  };
  /**
   *@method update-talk-list
   */
  talkListView.updateTalkList = function(){
    var scrollContainer, top, marginTop, height, i$, i, data, itemView;
    scrollContainer = this.Els.scrollContainer;
    top = 70;
    marginTop = 70;
    height = 540;
    for (i$ = 0; i$ <= 10; ++i$) {
      i = i$;
      data = {
        style: {
          top: top + "px"
        }
      };
      top += marginTop + height;
      itemView = this.createTalkItem(data);
      scrollContainer.add(itemView);
    }
  };
  /*===================================Control=======================*/
  module.exports = talkListView;
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
