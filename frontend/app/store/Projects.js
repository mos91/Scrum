Ext.define('Scrum.store.Projects', {
	extend : 'Ext.data.Store',
	model : 'Scrum.model.Project',
	proxy : {
		type : 'ajax',
		url : '/project/get?live=1',
		reader : {
			type : 'json',
			root: 'projects',
        	successProperty: 'success'
		}
	}
})