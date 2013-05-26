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
      backgroundColor: "black",
      bottom: "0px",
      zIndex: 10
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
      right: "30px",
      color: "white",
      font: {
        fontSize: "25px",
        fontWeight: "bold"
      }
    },
    navIcon: {
      left: "0px",
      width: "60px"
    }
  };
}).call(this);
