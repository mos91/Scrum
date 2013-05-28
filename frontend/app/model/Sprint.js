Ext.define('Scrum.model.Sprint', {
	extend : 'Ext.data.Model',
	fields : [
		{ name : 'name', type:'string'},
		{ name : 'description', type : 'string'},
		{ name : 'project_id', type : 'int'},
		{ name : 'estimate', type : 'int'},
		{
			name : 'status', 
			type : Ext.data.Types.SprintStatus,
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
		url: '/sprints/get',
		reader : {
			type: 'json',
	        root: 'sprint',
	        successProperty: 'success'
		}
	}
});