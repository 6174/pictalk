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
    }
  };
}).call(this);
