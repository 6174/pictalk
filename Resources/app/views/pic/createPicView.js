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
    View = this.Els.pageView = TUI.createView(this.Stle.pageView);
    View.add(this.createEditPicView());
    View.add(this.createToolBar());
    return View;
  };
  /**
   *@method create-edit-view
   */
  createPicView.createEditPicView = function(){
    var editPicView;
    editPicView = TUI.createView(this.Style.editPicView);
    return editPicView;
  };
  /**
   *@method create-tool-bar
   */
  createPicView.createToolBarView = function(){
    var toolBarView, submitBtn, toolsContainer;
    toolBarView = TUI.createView(this.Style.toolBarView);
    submitBtn = TUI.createLabel(this.Style.submitBtn);
    toolsContainer = TUI.createScrollView(this.Style.toolsContainer);
    toolBarView.add(submitBtn);
    toolBarView.add(toolsContainer);
    return toolBarView;
  };
  /*===========================Control=========================*/
  module.exports = createPicView;
}).call(this);
