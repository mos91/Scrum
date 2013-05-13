Ext.define('Scrum.types.UserStoryStatus', {
    requires: ['Ext.data.Types'],
    singleton : true, 
    constructor : function(){
	    	var type = Ext.data.Types.USER_STORY_STATUS = {
	    	type : Ext.data.Types.USER_STORY_STATUS,
	    	OPEN : 0x0000,
	    	ACCEPTED : 0x0002,
	    	TODO : 0x0003,
	    	TO_TEST : 0x0005,
	    	DONE : 0x0007,
	    	COMPLETED : 0x0008,
	    	CLOSED : 0x000B,
	        convert: function(status, record) {
	        	if (Ext.isObject(status))
	        		return status;
	        	else if (Ext.isNumeric(status))
	        		return { value : parseInt(status), display : type.VD_PAIRS[status]};

	        	return null;
	   	 	},
	   	 	/*get all possible values*/
	   	 	getValues : function(){
	   	 		var arr = [];
	   	 		for (value in type.VD_PAIRS){
	   	 			arr.push(value);
	   	 		}

	   	 		return arr;
	   	 	},
	   	 	/*get all possible display strings of values*/
	   	 	getDisplays : function(){
	   	 		var arr = [];
	   	 		for (value in type.VD_PAIRS){
	   	 			arr.push(type.VD_PAIRS[value]);
	   	 		}

	   	 		return arr;	
	   	 	},
	   	 	/*get all possible values and their displays like [{value :<int>, display : <string>},...]*/
	   	 	getHashes : function(){
	   	 		var arr = [];
	   	 		for (value in type.VD_PAIRS){
	   	 			arr.push({ value : value, display : type.VD_PAIRS[value]})
	   	 		}

	   	 		return arr;
	   	 	},
	   	 	/*get all possible values and their displays like [[value, display],...]*/
	   	 	getPairs : function(){
	   	 		var arr = [];
	   	 		for (value in type.VD_PAIRS){
	   	 			arr.push([value, type.VD_PAIRS[value]]);
	   	 		}

	   	 		return arr;
	   	 	},
	   	 	/*get UserStoryStatus object by passed value*/	
	   	 	getFromValue : function(value){
	   	 		if (value in type.VD_PAIRS){
	   	 			return { value : value, display : type.VD_PAIRS[value]};
	   	 		}

	   	 		return null;
	   	 	},
	   	 	//get UserStoryStatus object by passed display
	   	 	getFromDisplay : function(display){
	   	 		if (value in type.DV_PAIRS){
	   	 			return { display : display, value : type.DV_PAIRS[display]};
	   	 		}

	   	 		return null;
	   	 	},
	   	 	//get reachable statuses from passed status (string|int|{value:, display:})
	   	 	//return [{value:, display:}]
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
	   	 				return this.getFromValue(value);
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
			},
	    	type: 'UserStoryStatus'
    	};
    }
});