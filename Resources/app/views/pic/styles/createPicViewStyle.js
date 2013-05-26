(function(){
  var colors, baseFont;
  colors = require('/app/styles/colors');
  baseFont = {
    fontSize: "30px"
  };
  module.exports = {
    pageView: {
      height: "100%",
      width: "100%",
      backgroundColor: colors.lightGray
    },
    editPicView: {
      top: "120px",
      bottom: "120px",
      backgroundColor: "#eefe79"
    },
    toolBarView: {
      bottom: "0px",
      height: "120px",
      borderWidth: 1,
      borderColor: "gray"
    },
    submitBtn: {
      text: "提交",
      width: "20%",
      height: "100%",
      left: "0px",
      top: "0px",
      color: "white",
      backgroundColor: "#1133ee",
      font: {
        fontSize: "30px",
        fontWeight: "bold"
      }
    },
    toolsContainer: {
      width: "80%",
      right: "0px",
      backgroundColor: "white",
      scrollType: "horizontal"
    }
  };
}).call(this);
