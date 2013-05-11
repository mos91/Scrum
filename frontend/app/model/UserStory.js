Ext.define('Scrum.model.UserStory', {
	extend : 'Ext.data.Model',
	fields : [
		{ name : 'name', type:'string'},
		{ name : 'description', type : 'string'},
		{ name : 'estimate', type : 'int'},
		{ name : 'priority', type : 'int'},
		{ name : 'project_id', type : 'int'},
		{ name : 'sprint_id', type : 'int'},
		{ name : 'status', type : 'int'},
		{ 
			name : 'update_time',
			type : 'date',
			sortType : function(date){
				return date.getTime();
			},
			convert : function(value, record){
				return new Date(value * 1000);
			}
		}
	],
	proxy : {
		type : "ajax",
		url: '/userstory/get',
		reader : {
			type: 'json',
	        root: 'userstory',
	        successProperty: 'success'
		}
	}
});