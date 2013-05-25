(function(){
  var colors, baseFont;
  colors = require('/app/styles/colors');
  baseFont = {
    fontSize: "30px"
  };
  module.exports = {
    navBarView: {
      width: "100%",
      height: "120px",
      background: "black",
      bottom: "0px"
    },
    navGroup: {
      width: "100%",
      height: "100%"
    },
    navItemView: {
      width: "25%",
      height: "100%"
    },
    navLabel: {
      right: "0px",
      font: {
        fontSize: "40px",
        fontWeight: "bold"
      }
    },
    navIcon: {
      left: "0px",
      width: "60px"
    }
  };
}).call(this);