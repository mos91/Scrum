Ext.define('Scrum.view.userstory.Overview', {
	extend : 'Ext.panel.Panel',
	xtype : 'scrum-userstory-overview',
	layout : 'hbox',
	require : [
		'Scrum.view.userstory.Card',
		'Scrum.view.userstory.Grid',
		'Scrum.view.userstory.CreateForm'
	],
	items : [
		{
			xtype : 'panel', 
			layout : 'card',
			items : [
				Ext.create('Scrum.view.userstory.Grid', {
					itemId : 'scrum-userstory-grid',
				})
				/*Ext.create('Scrum.view.userstory.CreateForm', {
					itemId : 'scrum-userstory-create-form'
				})*/
			],
			flex : 1,
			resizable : true,
			collapsible : true,
			title : 'Overview',
			collapseDirection : 'left',
			tools : [
				//{ type : 'table' , action : 'grid', tooltipType : 'title', hidden : true, tooltip : 'Show grid'},
				{ type : 'plus', action : 'create', tooltipType : 'title', tooltip : 'Add new userstory'},
				{ type : 'refresh', action : 'refresh', tooltipType : 'title', tooltip : 'Refresh overview'}
			]
		},
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