/**
 *@method rgb
 * 将rgb转化为16进制的rgb格式
 */
(function(){
  var Color, rgb;
  Color = YTI.Color;
  rgb = function(r, g, b){
    var toStr, str;
    toStr = Number.prototype.toString;
    str = "#";
    str += toStr.call(r, 16);
    str += toStr.call(g, 16);
    str += toStr.call(b, 16);
    return str;
  };
  module.exports = {
    rgb: rgb,
    borderGray: "#eee",
    lightGray: "#fef",
    bgWhite: "#fff",
    orange: rgb(255, 151, 112),
    babyblue: rgb(212, 250, 253),
    darkBlue: rgb(173, 204, 206),
    deepDarkBlue: rgb(105, 123, 127),
    brown: rgb(162, 128, 119),
    darkBrown: rgb(155, 121, 112)
  };
}).call(this);
