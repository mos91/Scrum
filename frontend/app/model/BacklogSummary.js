Ext.define('Scrum.model.BacklogSummary', {
	extend : 'Ext.data.Model',
	require : [
		'Scrum.model.Project'
	],
	fields : [
		{ name : 'total', type : 'int'} ,
		{ name : 'open', type:'int'},
		{ name : 'accepted', type : 'int'},
		{ name : 'closed', type : 'int'}
	],
	proxy : {
		type : "ajax",
		url: '/project/get?backlogSummary=1',
		reader : {
			type: 'json',
	        root: 'summary',
	        successProperty: 'success'
		}
	}
});