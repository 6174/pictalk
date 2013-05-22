/**
 *Klass
 */
(function(that){
	var Klass;

	Klass = function(Parent, props) {
	    var Child, F, i;

	    Child = function () {
	          if(Child.Parent && Child.Parent.hasOwnProperty("__construct")) {
	               Child.Parent.__construct.apply(this, arguments);
	          }
	          if(Child.prototype.hasOwnProperty("__construct")) {
	               Child.prototype.__construct.apply(this, arguments);
	          }
	    };

	     Parent = Parent || Object;
	     F = function () {};
	     F.prototype = Parent.prototype;
	     Child.prototype = new F();
	     Child.Parent = Parent.prototype;
	     Child.prototype.constructor = Child;

	     for(i in props) {
	          if(props.hasOwnProperty(i)) {
	               Child.prototype[i] = props[i];
	          }         
	     }
	    return Child;
	}
	module.exports = Klass;
}(this))