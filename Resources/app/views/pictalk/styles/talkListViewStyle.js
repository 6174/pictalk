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
      backgroundColor: "yellow"
    },
    scrollContainerView: {
      top: "120px",
      bottom: "120px",
      width: '100%',
      scrollType: "vertical",
      backgroundColor: "gray"
    },
    talkItemView: {
      height: "400px",
      left: "20px",
      right: "20px",
      borderWidth: 1,
      borderColor: "gray"
    },
    cardUserInfoBar: {
      height: "60px",
      width: "100%",
      backgroundColor: "#123412"
    },
    cardInfoBarDate: {
      right: "20px",
      font: baseFont,
      color: "gray"
    },
    picCardView: {
      height: "340px",
      backgroundColor: "white"
    }
  };
}).call(this);
