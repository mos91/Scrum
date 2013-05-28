Ext.define('Scrum.types.UserStoryPriority', {
    requires: ['Ext.data.Types', 'Scrum.types.Enumerable'],
    singleton : true, 
    constructor : function(){
    	var type = Ext.define('Ext.data.Types.UserStoryPriority', {
    		extend : 'Ext.Base',
    		mixins : {
    			Enumerable : 'Ext.data.Types.Enumerable'
    		}
    	});

    	type.addStatics({
    		LOW : 0x0000,
	    	MEDIUM : 0x0001,
	    	HIGH : 0x0002,
	     
		    VD_PAIRS : {
			    0x0000 : 'Low',
			    0x0001 : 'Medium',
			    0x0002 : 'High'
			},
			DV_PAIRS : {
				'Low' : 0x0000,
				'Medium' : 0x0001,
				'High' : 0x0002
			},
			convert : function(status, record){
				var enumerableMixin = type.prototype.mixins.Enumerable;
				return enumerableMixin.self.convert.apply(type, arguments);
			},
			getPairs : function(){
				var enumerableMixin = type.prototype.mixins.Enumerable;

				return enumerableMixin.self.getPairs.apply(type, arguments);
			},
			getHashes : function(){
				var enumerableMixin = type.prototype.mixins.Enumerable;

				return enumerableMixin.self.getHashes.apply(type, arguments);
			},
			getValues : function(){
				var enumerableMixin = type.prototype.mixins.Enumerable;

				return enumerableMixin.self.getValues.apply(type, arguments);
			},	
			getDisplays : function(){
				var enumerableMixin = type.prototype.mixins.Enumerable;

				return enumerableMixin.self.getDisplays.apply(type, arguments);
			},
			getFromValue : function(value){
				var enumerableMixin = type.prototype.mixins.Enumerable;

				return enumerableMixin.self.getFromValue.apply(type, arguments);
			},
			getFromDisplay : function(display){
				var enumerableMixin = type.prototype.mixins.Enumerable;

				return enumerableMixin.self.getFromDisplay.apply(type, arguments);
			}
    	})
	}
});