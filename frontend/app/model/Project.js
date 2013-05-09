Ext.define('Scrum.model.Project', {
	extend : 'Ext.data.Model',
	fields : [
		{ name : 'name', type:'string'},
		{ name : 'description', type : 'string'},
		{ name : 'active_sprint_id ', type : 'int'},
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
		url: '/project/get',
		reader : {
			type: 'json',
	        root: 'project',
	        successProperty: 'success'
		}
	}
});