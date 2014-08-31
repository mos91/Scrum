Ext.define('Scrum.store.Comments', {
	require : [
		'Scrum.model.Comment'
	],
	extend : 'Ext.data.Store',
	model : 'Scrum.model.Comment',
	proxy : {
		type : 'ajax',
		url : '/comments/get',
		reader : {
			type : 'json',
			root : 'comments',
			successProperty: 'success',
			totalProperty : 'total'
		}
	}
});