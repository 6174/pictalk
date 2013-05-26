(function(){
  var createPicViewStyle, createPicView, addedToWindow;
  createPicViewStyle = require('styles/createPicViewStyle');
  createPicView = YTI.View.createPicView || YTI.View.create();
  createPicView.extend({
    Els: {},
    Data: {},
    Style: createPicViewStyle
  });
  addedToWindow = false;
  /*=======================View==========================*/
  createPicView.extend({
    getPageView: function(){
      var view;
      if (this.Els["pageView"]) {
        return this.Els["pageView"];
      } else {
        view = this.createPageView();
        return view;
      }
    },
    show: function(){
      var pageView;
      pageView = this.getPageView();
      pageView.show();
      if (!addedToWindow) {
        addedToWindow = true;
        YTI.APP.mainWindow.add(pageView);
      }
      YTI.View.navBarView.hide();
      return pageView;
    },
    hide: function(){
      var pageView;
      pageView = this.getPageView();
      pageView.hide();
      YTI.View.navBarView.show();
      return pageView;
    }
  });
  /**
   *@method create-page-view
   */
  createPicView.createPageView = function(){
    var View;
    log('create-create-pic-view');
    View = this.Els.pageView = TUI.createView(this.Style.pageView);
    View.add(this.createEditPicView());
    View.add(this.createToolBarView());
    return View;
  };
  /**
   *@method create-edit-view
   */
  createPicView.createEditPicView = function(){
    var editPicView, picContainer;
    editPicView = TUI.createView(this.Style.editPicView);
    picContainer = this.Els.picContainer = TUI.createView(this.Style.picContainer);
    editPicView.add(picContainer);
    return editPicView;
  };
  /**
   *@method create-tool-bar-view
   */
  createPicView.createToolBarView = function(){
    var _this, toolBarView, submitBtn, toolsContainer, tools, createToolItem, left, marginLeft, width, i$, len$, tool;
    _this = this;
    toolBarView = TUI.createView(this.Style.toolBarView);
    submitBtn = TUI.createLabel(this.Style.submitBtn);
    toolsContainer = TUI.createScrollView(this.Style.toolsContainer);
    tools = [
      {
        name: "addvoice",
        title: "声音",
        ev: "add-voice"
      }, {
        name: "addtext",
        title: "文字",
        ev: "add-text"
      }, {
        name: "camera",
        title: "相机",
        ev: "camera"
      }, {
        name: "photogallary",
        title: "相册",
        ev: "photo-gallary"
      }, {
        name: "info",
        title: "info",
        ev: "add-info"
      }, {
        name: "check",
        title: "check",
        ev: "check"
      }
    ];
    createToolItem = function(data){
      var toolItem;
      toolItem = TUI.createLabel(_this.Style.toolItem);
      import$(toolItem, data.style);
      toolItem.addEventListener('click', function(){
        log(data.ev);
        return _this.trigger(data.ev);
      });
      return toolItem;
    };
    left = 20;
    marginLeft = 20;
    width = 120;
    for (i$ = 0, len$ = tools.length; i$ < len$; ++i$) {
      tool = tools[i$];
      tool.style = {
        text: tool.title,
        left: left + "px",
        width: width + "px"
      };
      left += marginLeft + width;
      toolsContainer.add(createToolItem(tool));
    }
    toolBarView.add(submitBtn);
    toolBarView.add(toolsContainer);
    return toolBarView;
  };
  /*===========================Control=========================*/
  module.exports = createPicView;
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
