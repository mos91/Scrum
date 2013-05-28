Ext.define('Scrum.model.UserStory', {
	extend : 'Ext.data.Model',
	requires : ['Scrum.types.UserStoryStatus', 'Scrum.types.UserStoryStatus'],
	fields : [
		{ name : 'name', type:'string'},
		{ name : 'description', type : 'string'},
		{ name : 'estimate', type : 'int'},
		{ 
			name : 'priority', 
			type : Ext.data.Types.UserStoryPriority,
			sortType : function(priority){
				return priority.value;
			}
		},
		{ name : 'project_id', type : 'int'},
		{ 
			name : 'sprint', 
			convert : function(value, record){
				if (Ext.isObject(value)){
					return value;
				}
			}
		},
		{
			name : 'status', type : Ext.data.Types.UserStoryStatus,
			sortType : function(status){
				return status.value;
			}
		},
		{ 
			name : 'update_time',
			type : 'date',
			sortType : function(date){
				return date.getTime();
			},
			convert : function(value, record){
				if (Ext.isNumeric(value))
					return new Date(value * 1000);
				else if (Ext.isDate(value))
					return value;
			}
		}
	],
	proxy : {
		type : "ajax",
		url: '/userstories/get',
		reader : {
			type: 'json',
	        root: 'userstory',
	        successProperty: 'success'
		}
	}
});