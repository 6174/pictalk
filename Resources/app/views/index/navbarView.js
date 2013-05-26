(function(){
  var navBarViewStyle, navBarView, addedToWindow;
  navBarViewStyle = require('styles/navBarViewStyle');
  navBarView = YTI.View.navBarView || YTI.View.create();
  navBarView.extend({
    Els: {},
    Data: {},
    Style: navBarViewStyle
  });
  addedToWindow = false;
  /*===========================View=====================/
  /**
   *@method get-page-view
   */
  navBarView.getPageView = function(){
    var view;
    if (this.Els["pageView"]) {
      return this.Els["pageView"];
    } else {
      view = this.createPageView();
      return view;
    }
  };
  navBarView.show = function(){
    var pageView;
    log('show-nav-bar-view');
    pageView = this.getPageView();
    pageView.show();
    if (!addedToWindow) {
      addedToWindow = true;
      YTI.APP.mainWindow.add(pageView);
    }
    return pageView;
  };
  navBarView.hide = function(){
    var pageView;
    log('hide-nav-bar-view');
    pageView = this.getPageView();
    pageView.setVisible(false);
    return pageView;
  };
  /**
   *@method create-nav-bar-view 
   */
  navBarView.createPageView = function(){
    var View;
    log('create-nav-bar-view');
    View = this.Els.pageView = TUI.createView(this.Style.navBarView);
    View.add(this.createNavGroup());
    View.hide();
    return View;
  };
  /**
   *@method create-nav-group
   */
  navBarView.createNavGroup = function(){
    var _this, navGroup, navList, createNavItem, left, i$, len$, item, itemView;
    _this = this;
    navGroup = this.Els.navGroup = TUI.createView(this.Style.navGroup);
    navList = [
      {
        name: "nav-home",
        title: "首页",
        icon: "",
        ev: "go-to-home"
      }, {
        name: "nav-contactlist",
        title: "通讯录",
        icon: "",
        ev: "go-to-contactlist"
      }, {
        name: "nav-like",
        title: "收藏",
        icon: "",
        ev: "go-to-like"
      }, {
        name: "nav-setting",
        title: "设置",
        icon: "",
        ev: "go-to-setting"
      }
    ];
    createNavItem = function(data){
      var navItem, label, icon;
      navItem = TUI.createView(_this.Style.navItemView);
      label = TUI.createLabel(_this.Style.navLabel);
      label.text = data.title;
      navItem.add(label);
      icon = TUI.createImageView(_this.Style.navIcon);
      icon.image = data.icon;
      navItem.add(icon);
      navItem.addEventListener('click', function(){
        log(data.ev);
        return _this.trigger(data.ev);
      });
      return navItem;
    };
    left = 0;
    for (i$ = 0, len$ = navList.length; i$ < len$; ++i$) {
      item = navList[i$];
      itemView = createNavItem(item);
      itemView.left = left + "%";
      left += 25;
      navGroup.add(itemView);
    }
    return navGroup;
  };
  /*==============================Controller=========================*/
  module.exports = navBarView;
}).call(this);
