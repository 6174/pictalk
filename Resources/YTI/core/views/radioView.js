(function(){
  var assetsPath, radioOnSrc, radioOffSrc, TUI, defaultConf, radioGroup, createRadioView;
  assetsPath = "../../assets/images/";
  radioOnSrc = assetsPath + "radio_on.png";
  radioOffSrc = assetsPath + "radio_off.png";
  TUI = Ti.UI;
  defaultConf = {
    width: "70px",
    height: "70px"
  };
  radioGroup = {};
  createRadioView = function(conf){
    var container, className, image, turnOff, turnOn, getGroup, toggleState;
    container = TUI.createView(defaultConf);
    import$(container, conf) || {};
    className = conf["class"] || "default";
    radioGroup[className] = radioGroup[className] || [];
    radioGroup[className]["current"] = {
      value: "-1"
    };
    radioGroup[className].push(container);
    container.state = "off";
    container.selected = false;
    image = TUI.createImageView(defaultConf);
    image.image = radioOffSrc;
    image.top = "0px";
    image.left = "0px";
    container.add(image);
    container.off = turnOff = function(){
      image.image = radioOffSrc;
      container.state = "off";
      container.selected = false;
    };
    container.on = turnOn = function(){
      image.image = radioOffSrc;
      container.state = "on";
      container.selected = true;
    };
    container.getGroup = getGroup = function(){
      return radioGroup[className];
    };
    container.toggle = toggleState = function(){
      var src, i$, ref$, len$, item;
      log('clicked');
      src = image.image;
      switch (src) {
      case radioOffSrc:
        log('turn-on');
        radioGroup[className].current = container;
        image.image = radioOnSrc;
        container.state = "on";
        container.selected = true;
        break;
      case radioOnSrc:
        log('turn-off');
        radioGroup[className].current = {
          value: -1
        };
        image.image = radioOffSrc;
        container.state = "off";
        container.selected = false;
      }
      for (i$ = 0, len$ = (ref$ = radioGroup[className]).length; i$ < len$; ++i$) {
        item = ref$[i$];
        if (item !== container) {
          item.off();
        }
      }
    };
    container.addEventListener('click', function(ev){
      return toggleState();
    });
    return container;
  };
  module.exports = createRadioView;
  function import$(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
}).call(this);
