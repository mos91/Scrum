Ext.define('Scrum.store.FavoriteProjects', {
	extend : 'Ext.data.Store',
	require : ['Scrum.model.Project'],
	model : 'Scrum.model.Project', 
	proxy : {
		type: 'ajax',
        url: '/project/get?favorite=1',
        reader: {
	        type: 'json',
	        root: 'projects',
	        successProperty: 'success'
		}
	}
});