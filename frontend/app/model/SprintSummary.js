Ext.define('Scrum.model.SprintSummary', {
	extend : 'Ext.data.Model',
	require : [
		'Scrum.model.Project'
	],
	fields : [
		{ name : 'total', type : 'int'},
		{ name : 'todo', type:'int'},
		{ name : 'totest', type : 'int'},
		{ name : 'done', type : 'int'},
		{ name : 'completed', type : 'int'}
	],
	proxy : {
		type : "ajax",
		url: '/project/get?sprintSummary=1',
		reader : {
			type: 'json',
	        root: 'summary',
	        successProperty: 'success'
		}
	}
});