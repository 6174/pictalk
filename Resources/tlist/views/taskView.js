/**
 *task-view-ccontroller
 */
(function(){
  var taskViewStyle, taskView, getTime, getDateStr;
  taskViewStyle = require('styles/taskViewStyle');
  taskView = YTI.View["taskView"] || YTI.View.create();
  taskView.Els = {
    taskTextAreaView: null,
    taskInfoView: null,
    bottomBarView: null
  };
  taskView.Data = {
    record: null,
    startedCount: false,
    lastTime: null,
    t: 0
  };
  taskView.Style = taskViewStyle;
  taskView.addedToWindow = false;
  /**
   *@private
   */
  getTime = function(delta){
    var time;
    return time = {
      hours: Math.floor(delta / (1000 * 60 * 60)),
      minutes: Math.floor((delta / (1000 * 60)) % 60),
      seconds: Math.floor((delta / 1000) % 60)
    };
  };
  getDateStr = function(date){
    var str;
    str = "";
    str += date.getFullYear() + "-";
    str += (date.getMonth() - 0 + 1) + "-";
    str += date.getDate() + "\n";
    str += date.getHours() + ":";
    str += date.getMinutes();
    return str;
  };
  /**
   *@method get-task-view
   */
  taskView.getPageView = function(){
    var view;
    log('create-task-view');
    if (this.Els["pageView"]) {
      return this.Els["pageView"];
    } else {
      view = this.createTaskView();
      return view;
    }
  };
  /**
   *@create create-task-view
   */
  taskView.createTaskView = function(){
    var view;
    view = this.Els["pageView"] = TUI.createView(this.Style.page);
    view.add(this.Els["taskTextAreaView"] = this.createTaskTextAreaView());
    view.add(this.Els["taskInfoView"] = this.createTaskInfoView());
    view.add(this.Els["bottomBarView"] = this.createBottomBarView());
    return view;
  };
  /**
   *@create create-task-text-area-view
   */
  taskView.createTaskTextAreaView = function(){
    var view, taskTextLabel;
    log('create-text-area-view');
    view = TUI.createView(this.Style.taskTextAreaView);
    taskTextLabel = this.Els["taskTextLabel"] = TUI.createLabel(this.Style.taskTextLabel);
    taskTextLabel.text = "什么都没有！";
    view.add(taskTextLabel);
    return view;
  };
  /**
   *@create create-task-info-view
   */
  taskView.createTaskInfoView = function(){
    var that, view, restTimeView, restTimeLabel, startCountBtn;
    log('create-task-info-view');
    that = this;
    view = TUI.createView(this.Style.taskInfoView);
    /*******************************
     *task 任务执行时间视图
     *******************************/
    restTimeView = TUI.createView(that.Style.restTimeView);
    restTimeLabel = this.Els["restTimeLabel"] = TUI.createLabel(that.Style.restTimeLabel);
    restTimeLabel.text = "888";
    restTimeView.add(restTimeLabel);
    restTimeView.add(this.createTimeToolsNavView());
    view.add(restTimeView);
    view.add(this.createTaskAdvicesView());
    /*******************************
     *count-btn
     *******************************/
    startCountBtn = this.Els["startCountBtn"] = TUI.createLabel(this.Style.startCountBtn);
    startCountBtn.addEventListener('click', function(){
      that.trigger('start-count');
    });
    view.add(startCountBtn);
    return view;
  };
  /**
   *@create create-task-list-view
   */
  taskView.createTaskAdvicesView = function(){
    var _this, advicesView, advicesLabel, createItem;
    _this = this;
    advicesView = TUI.createView(this.Style.advicesView);
    advicesLabel = TUI.createLabel(this.Style.advicesLabel);
    advicesLabel.text = "建议: \n 1：haha！ \n 2: hehe! \n 3: 好了！";
    createItem = function(imgSrc, attrs, ev){
      var itemContainer, itemImg, itemContent, itemLabel;
      itemContainer = TUI.createView({
        height: "120px",
        width: "50%",
        backgroundColor: "white"
      });
      import$(itemContainer, attrs);
      itemImg = TUI.createView({
        backgroundImage: "/assets/" + imgSrc,
        height: "100%",
        width: "120px",
        top: "0px",
        left: "0px"
      });
      itemImg.addEventListener('click', function(){
        _this.trigger(ev);
      });
      itemContainer.add(itemImg);
      itemContent = TUI.createView({
        height: "100%",
        left: "120px",
        top: "0px",
        right: "0px"
      });
      itemLabel = TUI.createLabel({
        font: {
          fontSize: "30px"
        },
        color: "gray",
        text: "2011-11-13 14:23"
      });
      itemContent.add(itemLabel);
      itemContainer.add(itemContent);
      itemContainer.setContent = function(str){
        itemLabel.text = str;
      };
      return itemContainer;
    };
    advicesView.add(this.Els.startTimeView = createItem("tool1.png", {
      left: "0px",
      top: "20px"
    }, "set-start-time"));
    advicesView.add(this.Els.endTimeView = createItem("tool2.png", {
      left: "50%",
      top: "20px"
    }, "set-finish-time"));
    advicesView.add(this.Els.deadLineView = createItem("tool3.png", {
      left: "0px",
      top: "140px"
    }, "set-dead-line"));
    advicesView.add(this.Els.lastTimeView = createItem("tool4.png", {
      left: "50%",
      top: "140px"
    }, "set-last-time"));
    return advicesView;
  };
  /**
   *@create create times-tool-nav-view
   */
  taskView.createTimeToolsNavView = function(it){
    var _this, wrapperView, toolNavView, toggle, tools, posX, width, marginX, i$, len$, toolBtn, closure;
    _this = this;
    wrapperView = TUI.createView(this.Style.restTimeToolWrapperView);
    toolNavView = TUI.createScrollView(this.Style.restTimeToolNavView);
    toggle = TUI.createView(this.Style.restTimeToolToggle);
    wrapperView.add(toggle);
    wrapperView.add(toolNavView);
    tools = [
      {
        title: "重置",
        name: "resetTimeBtn",
        ev: "resetTime"
      }, {
        title: "减少",
        name: "minusTimeBtn",
        ev: "minusTime"
      }, {
        title: "减5分钟",
        name: "minusFiveBtn",
        ev: "minusFiveTime"
      }, {
        title: "减10分钟",
        name: "minusTenBtn",
        ev: "minusTenTime"
      }, {
        title: "减30分钟",
        name: "minusThirtyBtn",
        ev: "minusThiryTime"
      }
    ];
    posX = 30;
    width = 160;
    marginX = 20;
    for (i$ = 0, len$ = tools.length; i$ < len$; ++i$) {
      it = tools[i$];
      toolBtn = TUI.createLabel(this.Style.restTimeToolBtn);
      toolBtn.left = posX + "";
      toolBtn.width = width;
      toolBtn.text = it.title;
      closure = fn$;
      closure(toolBtn, it);
      posX += width + marginX;
      toolNavView.add(toolBtn);
    }
    wrapperView.toggle = "off";
    toggle.addEventListener('click', function(){
      var animation;
      animation = TUI.createAnimation();
      animation.duration = 300;
      if (wrapperView.toggle === "off") {
        wrapperView.toggle = "on";
        animation.left = "0%";
        wrapperView.animate(animation);
      } else {
        wrapperView.toggle = "off";
        animation.left = "90%";
        wrapperView.animate(animation);
      }
    });
    return wrapperView;
    function fn$(btn, item){
      btn.addEventListener('click', function(){
        log('clicked' + item.title);
        _this.trigger(item.ev);
      });
    }
  };
  /**
   *@create create bottom-bar-view
   */
  taskView.createBottomBarView = function(){
    var that, view, barView, toolNavView;
    log('create-bottom-bar-view');
    that = this;
    view = TUI.createView(this.Style.bottomBarView);
    barView = TUI.createView(this.Style.bottomBarBar);
    toolNavView = TUI.createView(this.Style.bottomBarToolNavView);
    view.add(barView);
    view.add(toolNavView);
    /**********************************
     *create bottom bar view elements
     **********************************/
    (function(){
      var posX, width, backBtn, editBtn, detailBtn, deleteBtn, toggleBtn;
      posX = 0;
      width = 140;
      backBtn = that.Els.backBtn = TUI.createLabel(that.Style.navBtn);
      backBtn.text = "返回";
      backBtn.left = posX + "px";
      backBtn.width = width + "px";
      barView.add(backBtn);
      backBtn.addEventListener('click', function(){
        that.trigger('go-to-home');
      });
      posX += width;
      editBtn = that.Els.detailBtn = TUI.createLabel(that.Style.navBtn);
      editBtn.text = "编辑";
      editBtn.left = posX + "px";
      editBtn.width = width + "px";
      barView.add(editBtn);
      editBtn.addEventListener('click', function(){
        that.trigger('edit-task');
      });
      posX += width;
      detailBtn = that.Els.editBtn = TUI.createLabel(that.Style.navBtn);
      detailBtn.text = "详情";
      detailBtn.left = posX + "px";
      detailBtn.width = width + "px";
      barView.add(detailBtn);
      detailBtn.addEventListener('click', function(){
        that.trigger('task-detail');
      });
      posX += width;
      deleteBtn = that.Els.deleteBtn = TUI.createLabel(that.Style.navBtn);
      deleteBtn.text = "删除";
      deleteBtn.left = posX + "px";
      deleteBtn.width = width + "px";
      barView.add(deleteBtn);
      deleteBtn.addEventListener('click', function(){
        that.trigger('delete-task');
      });
      toggleBtn = TUI.createLabel(that.Style.navBtn);
      toggleBtn.text = "设置";
      toggleBtn.right = "0px";
      toggleBtn.width = width;
      toggleBtn.toggle = "off";
      toggleBtn.addEventListener('click', function(){
        var animation;
        animation = TUI.createAnimation();
        animation.duration = 300;
        if (this.toggle === "off") {
          this.toggle = "on";
          animation.bottom = "0px";
          view.animate(animation);
        } else {
          this.toggle = "off";
          animation.bottom = "-400px";
          view.animate(animation);
        }
      });
      barView.add(toggleBtn);
    })();
    /**********************************
     *add tools elements to tool-nav-view	
     **********************************/
    view.add(this.createSettingToolsView());
    return view;
  };
  /**
   *@create setting tools-view
   */
  taskView.createSettingToolsView = function(it){
    var _this, container, tools, posX, posY, marginX, marginY, width, height, i$, len$, info, view, closure;
    _this = this;
    container = TUI.createScrollView(this.Style.settingToolsView);
    tools = [
      {
        title: "开始时间",
        ev: "set-start-time"
      }, {
        title: "结束时间",
        ev: "set-finish-time"
      }, {
        title: "完成时间",
        ev: "set-dead-line"
      }, {
        title: "持续时间",
        ev: "set-last-time"
      }, {
        title: "重复",
        ev: "set-repeatment"
      }, {
        title: "分类",
        ev: "set-class"
      }, {
        title: "重要性",
        ev: "set-importance"
      }, {
        title: "提醒",
        ev: "set-remind-time"
      }
    ];
    posX = 40;
    posY = 40;
    marginX = 150;
    marginY = 100;
    width = 240;
    height = 120;
    for (i$ = 0, len$ = tools.length; i$ < len$; ++i$) {
      it = tools[i$];
      info = posX + ", " + posY;
      view = TUI.createButton({
        top: posY + "px",
        left: posX + "px",
        width: width + "px",
        height: height + "px",
        title: it.title
      });
      closure = fn$;
      closure(view, it);
      if (posY > 40) {
        posY = 40;
        posX += width + marginX;
      } else {
        posY += height + marginY;
      }
      container.add(view);
    }
    return container;
    function fn$(btn, item){
      btn.addEventListener('click', function(){
        log('clicked' + item.title + item.ev);
        return _this.trigger(item.ev);
      });
    }
  };
  /**
   *@render render 
   */
  taskView.renderByRecord = function(record){
    var time;
    this.Els.taskTextLabel.text = record.data.content;
    if (record.data.lastTime !== 0) {
      time = getTime(record.data.lastTime);
      this.Els["restTimeLabel"].text = time.hours + "小时 " + time.minutes + "分钟 " + time.seconds + "秒";
    } else {
      this.Els["restTimeLabel"].text = "任务艰巨， 赶紧完成啊少年！";
    }
    this.renderAdvicesView(record);
    if (record.meta.started) {
      return this.trigger('start-count');
    }
  };
  /**
   *@render render the time rules
   */
  taskView.renderAdvicesView = function(record){
    var startTime, endTime, deadLine;
    startTime = getDateStr(new Date(record.rules.startTime));
    endTime = getDateStr(new Date(record.rules.endTime));
    deadLine = getDateStr(new Date(record.rules.deadLine));
    this.Els.startTimeView.setContent(startTime);
    this.Els.endTimeView.setContent(endTime);
    this.Els.deadLineView.setContent(deadLine);
  };
  /************************************************
   *event handlers binding
   ************************************************/
  /**
   *@bind show-task
   */
  taskView.bind('show-task', function(record){
    var pageView;
    pageView = this.getPageView();
    if (!this.addedToWindow) {
      this.addedToWindow = true;
      YTI.APP.mainWindow.add(pageView);
    }
    pageView.show();
    this.record = record;
    this.Data = {};
    return this.renderByRecord(record);
  });
  /**
   *@bind delete-task
   */
  taskView.bind('delete-task', function(){
    var id, taskModel, homeView;
    id = this.record.id;
    taskModel = YTI.Model.taskModel;
    homeView = YTI.View.homeView;
    taskModel.deleteRecordById(id);
    homeView.updateTaskView();
    this.trigger('go-to-home');
  });
  /*
   *@bind start-count 开始计时
   */
  taskView.bind('start-count', function(){
    var _this, Data, taskModel, startCount, endTime, startTime;
    log("start-count");
    _this = this;
    Data = this.Data;
    taskModel = YTI.Model.taskModel;
    startCount = function(){
      var startedTime, delta, time;
      startedTime = _this.Data.startedTime;
      delta = _this.record.data.lastTime + (new Date() - startedTime);
      time = getTime(delta);
      _this.Els["restTimeLabel"].text = time.hours + "小时 " + time.minutes + "分钟 " + time.seconds + "秒";
    };
    if (!_this.Data.startedCount || _this.Data.startedCount === false) {
      _this.Data.startedCount = true;
      if (_this.record.meta.started) {
        _this.Data.startedTime = _this.record.meta.startedTime;
      } else {
        _this.Data.startedTime = new Date() - 0;
      }
      _this.record.meta.started = true;
      _this.record.meta.startedTime = _this.Data.startedTime;
      taskModel.save();
      _this.Els["startCountBtn"].text = "停止计时";
      _this.Data.t = setInterval(startCount, 1000);
    } else {
      _this.Data.startedCount = false;
      endTime = new Date() - 0;
      startTime = _this.Data.startedTime - 0;
      _this.Els["startCountBtn"].text = "开始计时";
      _this.record.meta.started = false;
      _this.record.meta.updateTime = endTime;
      _this.record.tracks.push([startTime, endTime]);
      _this.record.data.lastTime += endTime - startTime;
      taskModel.save();
      clearTimeout(_this.Data.t);
    }
  });
  /**
   *@bind go-to-home 返回到主界面
   */
  taskView.bind('go-to-home', function(){
    YTI.View.homeView.getPageView().show();
    if (this.Data.startedCount === true) {
      this.trigger('start-count');
    }
    return this.Els.pageView.hide();
  });
  taskView.bind('task-detail', function(){
    return alert('task-detal');
  });
  taskView.bind('resetTime', function(){
    alert('reset-time-clicked');
    this.trigger('set-finish-time');
  });
  /**
   *@bind 设置开始时间
   */
  taskView.bind('set-start-time', function(){
    var _this;
    _this = this;
    YTI.View.datePickerView.getDate(this, function(date){
      _this.record.rules.startTime = date;
      YTI.Model.taskModel.save();
      return _this.renderAdvicesView(_this.record);
    });
  });
  /**
   *@bind 设置完成时间
   */
  taskView.bind('set-finish-time', function(){
    var _this;
    _this = this;
    YTI.View.datePickerView.getDate(this, function(date){
      log('I-am-call-back-and-I-was-called');
      _this.record.rules.endTime = date;
      YTI.Model.taskModel.save();
      _this.renderAdvicesView(_this.record);
    });
  });
  /**
   *@bind 设置dead-line
   */
  taskView.bind('set-dead-line', function(){
    var _this;
    _this = this;
    YTI.View.datePickerView.getDate(this, function(date){
      _this.record.rules.deadLine = date;
      YTI.Model.taskModel.save();
      return _this.renderAdvicesView(_this.record);
    });
  });
  module.exports = taskView;
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
