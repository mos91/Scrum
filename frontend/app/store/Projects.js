Ext.define('Scrum.store.Projects', {
	extend : 'Ext.data.Store',
	require : ['Scrum.model.Project'],
	model : 'Scrum.model.Project', 
	proxy : {
		type: 'ajax',
        url: '/project/get?all=1',
        reader: {
	        type: 'json',
	        root: 'projects',
	        successProperty: 'success'
		}
	}
});