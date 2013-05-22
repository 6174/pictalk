/**
 *@Info style for date-picker-view
 */
(function(){
  module.exports = {
    pageStyle: {
      width: "100%",
      backgroundColor: "white",
      zIndex: 101
    },
    datePickerStyle: {
      top: "200px",
      type: Ti.UI.PICKER_TYPE_DATE,
      minDate: new Date(2009, 0, 1),
      maxDate: new Date(2018, 11, 31),
      value: new Date()
    },
    timePickerView: {
      top: "600px",
      type: TUI.PICKER_TYPE_TIME
    },
    topBar: {
      top: "0px",
      height: "100px",
      width: "100%",
      backgroundColor: "#222"
    },
    topBarBtn: {
      width: "30%",
      height: "100px",
      color: "#fff",
      font: {
        fontSize: "30px"
      },
      textAlign: TUI.TEXT_ALIGNMENT_CENTER
    },
    cancelBtn: {
      text: "取消",
      left: "18%"
    },
    okBtn: {
      text: "确定",
      right: "18%"
    }
  };
}).call(this);
