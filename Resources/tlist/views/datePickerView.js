/**
 *date-picker-view
 */
(function(){
  var datePickerViewStyle, datePickerView, addedToWindow;
  datePickerViewStyle = require('styles/datePickerViewStyle');
  datePickerView = YTI.View.create();
  datePickerView.Els = {};
  datePickerView.Data = {};
  datePickerView.Style = datePickerViewStyle;
  /**
   *@private
   */
  addedToWindow = false;
  /**
   *@create picker-view
   */
  datePickerView.getPageView = function(data){
    var view;
    if (this.Els.pageView) {
      return this.Els.pageView;
    } else {
      return view = this.createPickerView(data);
    }
  };
  /**
   *@create create-picker-view
   */
  datePickerView.createPickerView = function(data){
    var view;
    view = this.Els.pageView = TUI.createView(this.Style.pageStyle);
    view.add(this.createDatePickerView(data));
    view.add(this.createTimePickerView(data));
    view.add(this.Els.topBarView = this.createTopBarView());
    return view;
  };
  /**
   *@create create-picker-view
   */
  datePickerView.createDatePickerView = function(data){
    var that, picker;
    that = this;
    picker = this.Els.datePickerView = TUI.createPicker(this.Style.datePickerStyle);
    return picker;
  };
  /**
   *@create create-time-picker-view
   */
  datePickerView.createTimePickerView = function(data){
    var that, picker, date;
    that = this;
    picker = this.Els.timePickerView = TUI.createPicker(this.Style.timePickerView);
    date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    picker.value = date;
    return picker;
  };
  /**
   *@create top-bar-view
   */
  datePickerView.createTopBarView = function(){
    var that, view, btnStyle, cancelBtn, okBtn;
    that = this;
    view = TUI.createView(this.Style.topBar);
    btnStyle = this.Style.topBarBtn;
    cancelBtn = TUI.createLabel(btnStyle);
    okBtn = TUI.createLabel(btnStyle);
    import$(cancelBtn, this.Style.cancelBtn);
    import$(okBtn, this.Style.okBtn);
    okBtn.addEventListener('click', function(){
      that.trigger('ok');
    });
    cancelBtn.addEventListener('click', function(){
      that.trigger('cancel');
    });
    view.add(cancelBtn);
    view.add(okBtn);
    return view;
  };
  /**
   *@getter get-date-data
   */
  datePickerView.getDateData = function(){
    var date, time;
    date = this.Els.datePickerView.getValue();
    time = this.Els.timePickerView.getValue();
    log(date.getMonth() + " " + date.getDate());
    log(time.getHours() + " " + time.getMinutes());
    inspect({
      date: date,
      time: time
    });
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes());
  };
  /**
   *@rigister get-date
   */
  datePickerView.getDate = function(context, callback){
    var _this, _callback;
    log('regist-get-date');
    _this = this;
    _this.show();
    _callback = function(){
      var value;
      value = _this.getDateData();
      callback.call(context, value);
      _this.unbind('ok', _callback);
      _this.hide();
    };
    return this.bind('ok', _callback);
  };
  datePickerView.hide = function(){
    return this.getPageView().hide();
  };
  datePickerView.show = function(){
    if (addedToWindow === false) {
      log('first-time');
      addedToWindow = true;
      YTI.APP.mainWindow.add(this.getPageView());
    }
    return this.getPageView().show();
  };
  /**
   *@bind cancel
    */
  datePickerView.bind('cancel', function(data){
    this.hide();
  });
  module.exports = datePickerView;
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
