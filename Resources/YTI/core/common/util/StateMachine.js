
/**
*Statemachine
*/
CXJ.StateMachine = CXJ.Class.create();
CXJ.StateMachine.extend(CXJ.Event);
CXJ.StateMachine.fn.add = function(controller){
     this.bind("change", function(current){
          if(controller == current)
               controller.activate();
          else
               controller.deactivate();
     });
     controller.active = this.proxy(function(){
          this.trigger("change",controller);
        });
     /**
          usage:
          var con1={ activate:function(){ console.log(" 1activate");} , deactivate: function(){console.log("con1 deactivate");} ,c:2 };
          var con2={ activate:function(){ console.log(" 2activate");} , deactivate: function(){console.log("con2 deactivate");} };
          var sm = new CXJ.StateMachine;
          sm.add(con1);
          sm.add(con2);
          con1.active();
     */
}