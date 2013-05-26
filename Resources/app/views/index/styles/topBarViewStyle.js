(function(){
  var colors, baseFont;
  colors = require('/app/styles/colors');
  baseFont = {
    fontSize: "30px"
  };
  module.exports = {
    topBarView: {
      backgroundColor: "black",
      backgroundImage: "",
      height: "120px",
      top: "0px",
      width: "100%",
      zIndex: 10
    },
    titleView: {
      font: baseFont,
      color: "white"
    }
  };
}).call(this);
