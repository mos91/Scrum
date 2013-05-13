Ext.define('Scrum.view.ContentPanel', {
	xtype : 'scrum-contentpanel',
	extend : 'Ext.panel.Panel',
	require : [
		'Scrum.view.userstory.Backlog',
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
		Ext.create('Scrum.view.userstory.Backlog', {
			itemId : 'userstory-backlog'
		})
	]
});