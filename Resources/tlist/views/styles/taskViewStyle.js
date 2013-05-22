/**
 *@info style for taskView 
 */
(function(){
  var colors;
  colors = require('colors');
  module.exports = {
    page: {
      height: "100%",
      width: "100%",
      backgroundColor: colors.bgWhite,
      backgroundGradient: {},
      backgroundImage: ""
    },
    commonMargin: {
      bottom: "2px",
      top: "2px",
      left: "2px",
      right: "2px"
    },
    commonFont: {
      fontSize: "30px"
    },
    taskTextAreaView: {
      top: "0px",
      height: "400px",
      width: "100%",
      backgroundColor: colors.bgWhite,
      layout: "vertical"
    },
    taskTextLabel: {
      top: "0px",
      bottom: "0px",
      color: colors.deepDarkBlue,
      font: {
        fontSize: "30px",
        fontWeight: "bold"
      }
    },
    taskInfoView: {
      top: "400px",
      bottom: "120px",
      backgroundColor: colors.brown,
      width: "100%",
      layout: "vertical"
    },
    restTimeView: {
      height: "120px",
      width: "100%",
      borderColor: colors.borderGray,
      backgroundColor: colors.orange,
      borderWidth: 1
    },
    restTimeLabel: {
      text: "已经做了 3小时22分钟14秒",
      color: "white",
      font: {
        fontSize: "30px"
      }
    }
    /*****************************
     * rest-time-tool
     *****************************/,
    restTimeToolWrapperView: {
      height: "100%",
      width: "100%",
      left: "90%"
    },
    restTimeToolToggle: {
      left: "0px",
      height: "100%",
      width: "10%",
      backgroundColor: colors.orange
    },
    restTimeToolNavView: {
      left: "10%",
      right: "0px",
      height: "100%",
      scrollType: "horizontal",
      backgroundColor: colors.deepDarkBlue
    },
    restTimeToolBtn: {
      font: {
        fontSize: "30px"
      },
      color: colors.deepDarkBlue,
      backgroundColor: "white",
      height: "80%",
      textAlign: TUI.TEXT_ALIGNMENT_CENTER
    },
    advicesView: {
      height: "280px",
      backgroundColor: colors.babyblue,
      width: "100%"
    },
    advicesLabel: {
      font: {
        fontSize: "30px",
        fontWeight: "bold"
      },
      width: "90%",
      height: "90%",
      color: "gray"
    },
    startCountBtn: {
      width: "180px",
      height: "180px",
      top: "120px",
      backgroundColor: "white",
      borderWidth: 14,
      borderRadius: 180,
      borderColor: colors.darkBrown,
      font: {
        fontSize: "30px",
        fontWeight: "bold"
      },
      color: colors.orange,
      textAlign: TUI.TEXT_ALIGNMENT_CENTER,
      text: "开始计时"
    },
    bottomBarView: {
      bottom: "-400px",
      height: "520px",
      width: "100%",
      backgroundColor: colors.brown
    },
    bottomBarBar: {
      height: "120px",
      top: "0px",
      backgroundColor: colors.darkBrown
    },
    bottomBarToolNavView: {
      width: "100%",
      height: "400px",
      top: "120px",
      backgroundColor: "gray"
    },
    navBtn: {
      height: "100%",
      color: "white",
      font: {
        fontSize: "30px"
      },
      textAlign: TUI.TEXT_ALIGNMENT_CENTER
    },
    settingToolsView: {
      width: "100%",
      height: "400px",
      top: "120px",
      scrollType: "horizontal",
      backgroundColor: colors.brown
    }
  };
}).call(this);
