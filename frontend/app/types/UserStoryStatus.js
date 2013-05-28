Ext.define('Scrum.types.UserStoryStatus', {
    requires: ['Ext.data.Types', 'Scrum.types.Enumerable'],
    singleton : true, 
    constructor : function(){
		var type = Ext.define('Ext.data.Types.UserStoryStatus', {
			extend : 'Ext.Base',
			mixins : { 
				Enumerable : 'Ext.data.Types.Enumerable'
			}
		});

		type.addStatics({
			OPEN : 0x0000,
	    	ACCEPTED : 0x0002,
	    	TODO : 0x0003,
	    	TO_TEST : 0x0005,
	    	DONE : 0x0007,
	    	COMPLETED : 0x0008,
	    	CLOSED : 0x000B,
	    	getNeighbours : function(status){
   	 			var value;

	   	 		if (Ext.isString(status) || Ext.isNumber(status) || Ext.isObject(status)){
	   	 			if (Ext.isString(status))
	   	 				value = type.DV_PAIRS[status];
	   	 			else if (Ext.isNumber(status))
	   	 				value = status;
	   	 			else if (Ext.isObject(status))
	   	 				value = status.value

	   	 			neighbours = type.ATT_GRAPH[value];
	   	 			neighbours.push(value);
	   	 			return Ext.Array.map(neighbours,function(value){
	   	 				return type.getFromValue(value);
	   	 			}, type);
	   	 		}
   	 		},
	   	 	isNeighbour : function(statusX, statusY){
	   	 		var valueX, valueY;

	   	 		if (!Ext.isString(statusX) && !Ext.isNumber(statusX) && !Ext.isObject(statusX))
	   	 			return null;

	   	 		if (!Ext.isString(statusY) && !Ext.isNumber(statusY) && !Ext.isObject(statusY))
	   	 			return null;

   	 			if (Ext.isString(statusX))
   	 				valueX = type.DV_PAIRS[statusX];
   	 			else if (Ext.isNumber(statusX))
   	 				valueX = statusX;
   	 			else if (Ext.isObject(statusX))
   	 				valueX = statusX.value;

   	 			if (Ext.isString(statusY))
   	 				valueY = type.DV_PAIRS[statusY];
   	 			else if (Ext.isNumber(statusY))
   	 				valueY = statusY;
   	 			else if (Ext.isObject(statusY))
   	 				valueY = statusY.value;

   	 			neighbours = type.ATT_GRAPH[valueX];
   	 			neighbours.push(valueX);
   	 			return Ext.Array.contains(neighbours, valueY);
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
			},
		    VD_PAIRS : {
			    0x0000 : 'Open',
			    0x0002 : 'Accepted',
			    0x0003 : 'Todo',
			    0x0005 : 'To test',
			    0x0007 : 'Done',
			    0x0008 : 'Completed',
			    0x000C : 'Closed'
			},
			DV_PAIRS : {
				'Open' : 0x0000,
				'Accepted' : 0x0002,
				'Todo' : 0x0003,
				'To test' : 0x0005,
				'Done' : 0x0007,
				'Completed' : 0x0008,
				'Closed' : 0x000B 
			},
			//attainability graph
			ATT_GRAPH : {
				0x0000 : [0x0002],
				0x0002 : [0x0000],
				0x0003 : [0x0005, 0x0007],
				0x0005 : [0x0003, 0x0007],
				0x0007 : [0x0003, 0x0005, 0x0008],
				0x0008 : [0x0007, 0x000B]
			}
		});	
	}
});