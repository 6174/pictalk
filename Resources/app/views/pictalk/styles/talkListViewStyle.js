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
      bottom: "0px",
      width: '100%',
      scrollType: "vertical",
      backgroundColor: "gray"
    },
    talkItemView: {
      height: "600px",
      left: "20px",
      right: "20px",
      borderWidth: 1,
      borderColor: "gray"
    },
    cardUserInfoBar: {
      top: "0px",
      height: "120px",
      width: "100%",
      backgroundColor: "white"
    },
    cardInfoBarDate: {
      right: "20px",
      font: baseFont,
      color: "gray"
    },
    picCardView: {
      top: "120px",
      height: "400px",
      backgroundColor: "#121212"
    },
    picCardFooter: {
      top: "520px",
      height: "80px"
    },
    replyButton: {
      title: "回复",
      font: {
        fontSize: "40px",
        fontWeight: "bold"
      },
      bottom: "0px"
    }
  };
}).call(this);
