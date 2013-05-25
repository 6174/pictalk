(function(){
  var colors, baseFont;
  colors = require('/app/styles/colors');
  baseFont = {
    fontSize: "30px"
  };
  module.exports = {
    infoListView: {
      backgroundColor: "white",
      backgroundImage: "",
      top: "120px",
      bottom: "120px",
      width: "100%"
    },
    scrollContainerView: {
      height: "100%",
      width: "100%",
      scrollType: "vertical",
      backgroundColor: "gray"
    },
    infoItemView: {
      width: "100%",
      borderColor: "gray",
      borderWidth: 1
    }
  };
}).call(this);
