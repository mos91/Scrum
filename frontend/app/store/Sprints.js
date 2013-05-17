Ext.define('Scrum.store.Sprints', {
	require : [
		'Scrum.model.Sprint'
	],
	extend : 'Ext.data.Store',
	model : 'Scrum.model.Sprint',
	proxy : {
		type : 'ajax',
		url : '/sprints/get',
		reader : {
			type : 'json',
			root : 'sprints',
			successProperty: 'success',
			totalProperty : 'total'
		}
	}
});