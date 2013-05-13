Ext.define('Scrum.store.Userstories', {
	extend : 'Ext.data.Store',
	requires : ['Scrum.model.UserStory'],
	model : 'Scrum.model.UserStory', 
	proxy : {
		type: 'ajax',
        url: '/userstories/get?all=1',
        reader: {
	        type: 'json',
	        root: 'userstories',
	        successProperty: 'success'
		}
	}
});