Ext.define('Scrum.view.userstory.Backlog', {
	extend : 'Ext.panel.Panel',
	xtype : 'scrum-backlog',
	layout : 'hbox',
	require : [
		'Scrum.view.userstory.BacklogOverview',
		'Scrum.view.userstory.SprintlogOverview',
		'Scrum.view.userstory.RightPart'
	],
	items : [
		{
			xtype : 'panel',
			flex : 1,
			layout : { type : 'vbox', align : 'stretch'},
			items : [
				Ext.create('Scrum.view.userstory.BacklogOverview', {
					flex : 1,
					height : 450,
					resizable : true,
					collapsible : true,
					collapseDirection : 'top'
				}),
				Ext.create('Scrum.view.userstory.SprintlogOverview', {
					flex : 1,
					height : 430,
					resizable : true,
					collapsible : true,
					collapseDirection : 'bottom'
				})	
			]
		},
		Ext.create('Scrum.view.userstory.RightPart', {
			flex : 1
		})
	]
})