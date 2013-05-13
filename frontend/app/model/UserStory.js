Ext.define('Scrum.model.UserStory', {
	extend : 'Ext.data.Model',
	requires : ['Scrum.types.UserStoryStatus'],
	fields : [
		{ name : 'name', type:'string'},
		{ name : 'description', type : 'string'},
		{ name : 'estimate', type : 'int'},
		{ name : 'priority', type : 'int'},
		{ name : 'project_id', type : 'int'},
		{ 
			name : 'sprint', 
			convert : function(value, record){
				if (Ext.isObject(value)){
					return value;
				}
			}
		},
		/*{ name : 'status', type : 'int'},*/
		{
			name : 'status', type : Ext.data.Types.USER_STORY_STATUS
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