(function(){
  var createPicViewStyle, createPicView, addedToWindow;
  createPicViewStyle = require('styles/createPicViewStyle');
  createPicView = YTI.View.createPicView || YTI.View.create();
  createPicView.extend({
    Style: createPicViewStyle,
    Els: {},
    Data: {
      stateCode: {
        free: 0,
        addText: 1,
        addVoice: 2,
        movePic: 3,
        moveText: 4,
        scalePic: 5
      },
      state: 0,
      pic: {
        texts: [],
        voices: [],
        image: "",
        info: ""
      }
    }
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
    var _this, editPicView, picContainer;
    _this = this;
    editPicView = TUI.createView(this.Style.editPicView);
    editPicView.addEventListener('click', function(ev){
      return _this.trigger('click-edit-pic-view', ev);
    });
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
        ev: "add-voice-state"
      }, {
        name: "addtext",
        title: "文字",
        ev: "add-text-state"
      }, {
        name: "camera",
        title: "相机",
        ev: "camera"
      }, {
        name: "photogallary",
        title: "相册",
        ev: "photo-gallery"
      }, {
        name: "info",
        title: "info",
        ev: "add-info-state"
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
  /**
   *@bind photo-gallary
   */
  createPicView.bind('photo-gallery', function(){
    var _this;
    _this = this;
    log('open-photo-gallery');
    return Ti.Media.openPhotoGallery({
      success: function(ev){
        var bgImg, pageView, touchMoveBase;
        log('success-get-image-event');
        bgImg = _this.Els.bgImg = TUI.createImageView({
          image: ev.media,
          top: 0,
          left: 0,
          width: "500px",
          height: "500px"
        });
        _this.Els.picContainer.add(bgImg);
        pageView = _this.getPageView();
        touchMoveBase = {
          set: function(ev){
            this.x = ev.x;
            return this.y = ev.y;
          },
          curX: bgImg.left,
          curY: bgImg.top,
          moveCount: 0
        };
        pageView.addEventListener('touchstart', function(e){
          log('touch-start');
          touchMoveBase.set(e);
          touchMoveBase.moveCount = 0;
        });
        pageView.addEventListener('touchmove', function(e){
          var img;
          touchMoveBase.moveCount += 1;
          if (touchMoveBase.moveCount % 2 !== 0) {
            return;
          }
          img = _this.Els.bgImg;
          touchMoveBase.curX += e.x - touchMoveBase.x;
          touchMoveBase.curY += e.y - touchMoveBase.y;
          img.animate({
            top: touchMoveBase.curY,
            left: touchMoveBase.curX,
            duration: 1
          });
          touchMoveBase.set(e);
        });
        pageView.addEventListener('touchend', function(e){
          log('move-count:' + touchMoveBase.moveCount);
        });
      }
    });
  });
  /**
   *@bind click-edit-pic-view
   */
  createPicView.bind('click-edit-pic-view', function(ev){
    var state, stateCode;
    state = this.Data.state;
    stateCode = this.Data.stateCode;
    switch (state) {
    case stateCode.free:
      this.trigger('nothing', ev);
      break;
    case stateCode.addText:
      this.trigger('add-text', ev);
      break;
    case stateCode.addVoice:
      this.trigger('add-voice', ev);
      break;
    }
  });
  /**
   *@bind add-text-state
   * turn to add-text-state
   */
  createPicView.bind('add-text-state', function(){
    this.Data.state = this.Data.stateCode.addText;
  });
  /**
   *@bind add-text
   */
  createPicView.bind('add-text', function(ev){
    var picContainer, textTip;
    picContainer = this.Els.picContainer;
    textTip = TUI.createView(this.Style.textTip);
    textTip.center = {
      x: ev.x,
      y: ev.y
    };
    textTip.addEventListener('longtap', function(){});
    picContainer.add(textTip);
  });
  /**
   *@bind add-voice-state
   */
  createPicView.bind('add-voice-state', function(){
    this.Data.state = this.Data.stateCode.addVoice;
  });
  /**
   *@bind add-voice
   */
  createPicView.bind('add-voice', function(ev){
    var picContainer, voiceTip;
    picContainer = this.Els.picContainer;
    voiceTip = TUI.createView(this.Style.voiceTip);
    voiceTip.center = {
      x: ev.x,
      y: ev.y
    };
    picContainer.add(voiceTip);
  });
  module.exports = createPicView;
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
