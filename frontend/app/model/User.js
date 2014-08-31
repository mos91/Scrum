Ext.define('Scrum.model.User', {
	extend : 'Ext.data.Model',
	fields : [
		{ name : 'firstname', type : 'string'},
		{ name : 'lastname', type : 'string'}
	],
	proxy : {
		type : "ajax",
		url : '/users/get',
		reader : {
			type : 'json',
			root : 'user',
			successProperty : 'success'
		}
	}
});