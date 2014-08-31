Ext.define('Scrum.store.Sprints', {
	extend : 'Ext.data.Store',
	model : 'Scrum.model.Sprint',
	proxy : {
		type : 'ajax',
		url : '/sprints/get',
		reader : {
			type : 'json',
			root : 'sprints',
			successProperty: 'success'
			//totalProperty : 'total'
		}
	}
});