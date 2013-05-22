/**
 *home-view
 */
(function(){
  var homeViewStyle, homeView;
  homeViewStyle = require('styles/homeViewStyle');
  homeView = YTI.View.homeView || YTI.View.create();
  homeView.Els = {
    topBarView: null,
    footerBarView: null,
    taskListView: null
  };
  homeView.Data = {
    list: []
  };
  homeView.Style = homeViewStyle;
  /**
   *@method get-page-view
   */
  homeView.getPageView = function(){
    var view;
    if (this.Els["pageView"]) {
      return this.Els["pageView"];
    } else {
      view = this.createHomeView();
      return view;
    }
  };
  /**
   *@method create-home-view
   */
  homeView.createHomeView = function(){
    var view;
    log('create-home-view');
    view = this.Els.pageView = TUI.createView(this.Style.page);
    view.add(this.createTopBarView());
    view.add(this.createTaskListView(YTI.Model.taskModel.getRecords()));
    view.add(this.createFooterBarView());
    return view;
  };
  /**
   *@method create-top-bar-view
   *
   */
  homeView.createTopBarView = function(){
    var view, btnStyle, recentTaskBtn, recentHabitBtn;
    view = TUI.createView(this.Style.topBar);
    btnStyle = this.Style.topBarBtn;
    recentTaskBtn = TUI.createLabel(btnStyle);
    import$(recentTaskBtn, this.Style.recentTaskBtn);
    recentHabitBtn = TUI.createLabel(btnStyle);
    import$(recentHabitBtn, this.Style.recentHabitBtn);
    view.add(recentTaskBtn);
    view.add(recentHabitBtn);
    return view;
  };
  /**
   *@method create-task-list-view
   *
   */
  homeView.createTaskListView = function(records){
    var _this, View, container, size, it, item, view, label;
    _this = this;
    log('create-task-list-view');
    if (this.Els.taskListView) {
      this.Els.taskListView.remove(this.Els.taskListViewContainer);
      View = this.Els.taskListView;
    } else {
      View = this.Els.taskListView = TUI.createView(this.Style.taskListView);
    }
    container = this.Els.taskListViewContainer = TUI.createScrollView(this.Style.taskListViewContainer);
    View.add(container);
    size = 0;
    for (it in records) {
      size += 1;
      item = records[it];
      view = TUI.createView(this.Style.listItemView);
      view.recordData = item;
      label = TUI.createLabel({
        text: item.data.content + ""
      });
      import$(label, this.Style.listItemLabel);
      view.add(label);
      view.addEventListener('click', fn$);
      container.add(view);
    }
    if (size === 0) {
      label = TUI.createLabel(this.Style.taskListNoRecordLabel);
      container.add(label);
    }
    return View;
    function fn$(){
      var id;
      id = this.recordData.id;
      log(id);
      _this.trigger('go-to-task', id);
    }
  };
  /**
   *@method update-task-list-vew
   */
  homeView.updateTaskView = function(){
    var records;
    records = YTI.Model.taskModel.getRecords();
    this.createTaskListView(records);
  };
  /**
   *@method create-footer-bar-view
   *
   */
  homeView.createFooterBarView = function(){
    var _this, view, newTaskBtn, taskTextFiled;
    _this = this;
    view = TUI.createView(this.Style.footerBarView);
    newTaskBtn = TUI.createLabel(this.Style.newTaskBtn);
    taskTextFiled = this.Els.taskTextFiled = TUI.createTextField(this.Style.taskTextFiled);
    taskTextFiled.addEventListener('click', function(){
      this.focus();
    });
    newTaskBtn.addEventListener('click', function(){
      _this.trigger('new-task');
    });
    taskTextFiled.blur();
    view.add(taskTextFiled);
    view.add(newTaskBtn);
    return view;
  };
  /**
   *
   *@bind new-task
   */
  homeView.bind('new-task', function(){
    var value, taskData, taskModel, record;
    value = this.Els.taskTextFiled.value.replace(/^\s+/g, "").replace(/\s+$/g, "");
    if (value === "") {
      alert("不能为空白啊！");
      return;
    }
    this.Els.taskTextFiled.value = "";
    this.Els.taskTextFiled.blur();
    taskData = {
      taskText: value,
      createdTime: new Date()
    };
    taskModel = YTI.Model.taskModel;
    record = taskModel.createTask(taskData);
    YTI.View.taskView.trigger('show-task', record);
    this.updateTaskView();
  });
  /**
   *@bind go-to-task
   */
  homeView.bind('go-to-task', function(id){
    var taskModel, record;
    taskModel = YTI.Model.taskModel;
    record = taskModel.getRecordById(id);
    YTI.View.taskView.trigger('show-task', record);
  });
  module.exports = homeView;
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
