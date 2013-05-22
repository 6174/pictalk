/** 
 *util----event
 *
 *@author chenxuejia
 */
(function(that){
  var  Event ;
  Event = {
    bind: function(ev, callback) {
          var evs   = ev.split(" ");
           var calls = this._callbacks || (this._callbacks = {});
         for (var i=0; i < evs.length; i++)
           (this._callbacks[evs[i]] || (this._callbacks[evs[i]] = [])).push(callback);
         return this;
    },
    trigger: function() {
          var args = Array.prototype.slice.call(arguments, 0);
          var ev = args.shift();
          var list, calls, i, l;
          if( !(calls = this._callbacks)) return this;
          if( !(list = this._callbacks[ev])) return this;
          for(i = 0, l = list.length; i < l; i++) {
               list[i].apply(this, args);
          }
          return this;
    },
    remove: function(ev) {
          if(!this._callbacks) return this;
          if(!this._callbacks[ev]) return this;
          this._callbacks[ev] = [];
    },
    unbind: function(ev, callback){
      if ( !ev ) {
        this._callbacks = {};
        return this;
      }
      var list, calls, i, l;
      if (!(calls = this._callbacks)) return this;
      if (!(list  = this._callbacks[ev])) return this;
     
      for (i = 0, l = list.length; i < l; i++) {
        if (callback === list[i]) {
          list.splice(i, 1);
          break;
        }
      }
      return this;
    }
  }
  Event.on = Event.addEventListener = Event.bind;
  module.exports = Event;
}(this))