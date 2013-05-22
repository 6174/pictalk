(function(){
  var test, fullScreen, defaultStyle;
  test = require('test');
  fullScreen = {
    width: "100%",
    heght: "100%"
  };
  defaultStyle = {
    backgroundColor: "white",
    font: {
      fontColor: "black",
      fontSize: "30px"
    }
  };
  import$(defaultStyle, fullScreen);
  module.exports = {
    defaultStyle: defaultStyle,
    fullScreen: fullScreen
  };
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
