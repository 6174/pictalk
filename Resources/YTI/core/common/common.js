/**
 *common method of the whole app
 *any module can use these alias and methods
 */
(function(){
  this.TUI = Ti.UI;
  this.TFS = Ti.Filesystem;
  this.log = function(info){
    Ti.API.info(info);
  };
  this.inspect2 = function(obj){
    var hasown, attr;
    hasown = {}.hasOwnProperty;
    log('------------inspect2---------------');
    for (attr in obj) {
      if (hasown.call(obj, attr)) {
        log(attr);
      } else {
        log("proto-" + attr);
      }
    }
    return log('-----------------------------------');
  };
  this.inspect = function(obj, tabSize){
    var tabs, str, tabStr, tab, tostr, hasown, stringify, i, type, attr, val, results$ = [];
    tabs = tabSize || 0;
    str = "";
    tabStr = "";
    tab = "  ";
    tostr = {}.toString;
    hasown = {}.hasOwnProperty;
    stringify = JSON.stringify;
    i = tabs;
    type = tostr.call(obj);
    if (type === "[object Function]") {
      Ti.API.info("Function\n");
      return;
    }
    if (type !== "[object Array]" && type !== "[object Object]") {
      Ti.API.info(stringify(obj));
      return;
    }
    while (i--) {
      tabStr += tab;
    }
    for (attr in obj) {
      if (hasown.call(obj, attr)) {
        val = obj[attr];
        type = tostr.call(obj[attr]);
        switch (type) {
        case "[object Object]":
          str = tabStr + attr + ":\n";
          Ti.API.info(str);
          this.inspect(val, tabs + 1);
          break;
        case "[object Array]":
          str = tabStr + attr + ": Array(\n";
          Ti.API.info(str);
          this.inspect(val, tabs + 1);
          Ti.API.info(tabStr + " )\n");
          break;
        case "[object Function]":
          str = tabStr + attr + ": ";
          str += "[Function]";
          results$.push(Ti.API.info(str));
          break;
        default:
          str = tabStr + attr + ": ";
          str += val;
          results$.push(Ti.API.info(str));
        }
      }
    }
    return results$;
  };
}).call(this);
