Ext.define('Scrum.view.project.summary.Summary', {
	require : ['Scrum.view.project.summary.Backlog'],
	xtype : 'scrum-projectsummary',
	extend : "Ext.panel.Panel",
	layout : {
		type : 'column'
	},
	items : [
		{
			columnWidth : 100,
			border : false,
			layout : { type: 'vbox'},
			items : [
				Ext.create('Scrum.view.project.summary.Backlog', {itemId : 'backlogSummary'})
			]
		}
	]	
});