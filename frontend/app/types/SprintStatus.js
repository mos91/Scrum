Ext.define('Scrum.types.SprintStatus', {
    requires: ['Ext.data.Types', 'Scrum.types.Enumerable'],
    singleton : true, 
    constructor : function(){
    	var type = Ext.define('Ext.data.Types.SprintStatus', {
    		extend : 'Ext.Base',
    		mixins : {
    		 	Enumerable : 'Ext.data.Types.Enumerable'
    		}
    	});

    	type.addStatics({
    		PLANNED : 0x0000,
	    	CURRENT : 0x0001,
	    	COMPLETED : 0x0002,
		    VD_PAIRS : {
			    0x0000 : 'Planned',
			    0x0001 : 'Active',
			    0x0002 : 'Completed'
			},
			DV_PAIRS : {
				'Planned' : 0x0000,
				'Active' : 0x0001,
				'Completed' : 0x0002
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
    	});
	}
});