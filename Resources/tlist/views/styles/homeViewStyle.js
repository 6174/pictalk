/**
 *@info style for HomeView 
 */
(function(){
  var colors;
  colors = require('colors');
  module.exports = {
    page: {
      height: "100%",
      width: "100%",
      backgroundColor: colors.lightGray
    },
    topBar: {
      top: "0px",
      height: "100px",
      width: "100%",
      backgroundColor: colors.orange
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
    recentTaskBtn: {
      text: "TODO",
      left: "18%"
    },
    recentHabitBtn: {
      text: "习惯",
      right: "18%"
    },
    taskListNoRecordLabel: {
      top: "30%",
      font: {
        fontSize: "40px"
      },
      text: "没有任何记录"
    },
    taskListView: {
      top: "100px",
      height: "100%",
      width: "100%",
      backgroundColor: colors.bgWhite
    },
    taskListViewContainer: {
      scrollType: "vertical",
      width: "100%",
      height: "100%",
      backgroundColor: colors.bgWhite,
      layout: 'vertical'
    },
    listItemView: {
      height: "160px",
      borderColor: "gray",
      borderWidth: 1
    },
    listItemLabel: {
      font: {
        fontSize: "30px"
      }
    },
    footerBarView: {
      bottom: "0px",
      height: "120px",
      backgroundColor: colors.babyBlue
    },
    newTaskBtn: {
      text: "新建任务",
      color: "white",
      height: "100%",
      width: "20%",
      right: "0px",
      backgroundColor: colors.darkBrown,
      font: {
        fontSize: "30px"
      },
      textAlign: TUI.TEXT_ALIGNMENT_CENTER
    },
    taskTextFiled: {
      width: "80%",
      right: "20%",
      height: "100%",
      backgroundColor: "#eee"
    }
  };
}).call(this);
