Ext.define('Scrum.store.Userstories', {
	extend : 'Ext.data.Store',
	pageSize : 25,
	requires : ['Scrum.model.UserStory'],
	model : 'Scrum.model.UserStory', 
	proxy : {
		type: 'ajax',
        url: '/userstories/get',
        reader: {
	        type: 'json',
	        root: 'userstories',
	        totalProperty : 'total',
	        successProperty: 'success'
		}
	}
});