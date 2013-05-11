Ext.define('Scrum.view.ContentPanel', {
	xtype : 'scrum-contentpanel',
	extend : 'Ext.panel.Panel',
	require : [
		'Scrum.view.userstory.Overview',
		'Scrum.view.project.Profile'
	],
	layout : {
		type : 'card'
	},
	border : false,
	cls : 'scrum-contentpanel',
	activeItem : 0,
	items : [
		Ext.create('Ext.panel.Panel'),
		Ext.create('Scrum.view.project.Profile',{
			itemId : 'project-profile'
		}),
		Ext.create('Scrum.view.userstory.Overview', {
			itemId : 'userstory-overview'
		})
	]
});