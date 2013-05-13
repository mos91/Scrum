Ext.define('Scrum.view.userstory.Backlog', {
	extend : 'Ext.panel.Panel',
	xtype : 'scrum-backlog',
	layout : 'hbox',
	require : [
		'Scrum.view.userstory.Overview',
		'Scrum.view.userstory.Card',
	],
	items : [
		Ext.create('Scrum.view.userstory.Overview'),
		{
			xtype :'tabpanel', 
			tabBar : { cls : 'scrum-tabbar'},
			flex : 2,
			layout : { type : 'fit'},
			items : [
				Ext.create('Scrum.view.userstory.Card', {
					title : 'Profile',
					itemId : 'profile'
				})
				/*Ext.create('Scrum.view.CommentPanel', {
					title : 'Comments',
					itemId : 'comments',
					commentableEntity : {
					 	url : '/userstory/comment',
					 	idField : 'userstory_id'
					}
				})*/
			]
		}
	]
})