Ext.define('Scrum.types.SprintStatus', {
    requires: ['Ext.data.Types'],
    singleton : true, 
    constructor : function(){
	    	var type = Ext.data.Types.SPRINT_STATUS = {
	    	type : Ext.data.Types.SPRINT_STATUS,
	    	PLANNED : 0x0000,
	    	CURRENT : 0x0001,
	    	COMPLETED : 0x0002,
	
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
		    VD_PAIRS : {
			    0x0000 : 'Planned',
			    0x0001 : 'Active',
			    0x0002 : 'Completed'
			},
			DV_PAIRS : {
				'Planned' : 0x0000,
				'Active' : 0x0001,
				'Completed' : 0x0002
			}
    	};
    }
});