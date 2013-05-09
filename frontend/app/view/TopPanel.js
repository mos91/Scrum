Ext.define('Scrum.view.TopPanel' , {
	extend : 'Ext.toolbar.Toolbar',
	xtype : 'scrum-toppanel',
	require : [
		'Scrum.view.ProjectsDropdown'
	],
	cls : 'scrum-toppanel',
	items : [
		Ext.create('Scrum.view.ProjectsDropdown'),
		{
			text : 'Backlog'
		},
		{
			text : 'Sprints'
		}
	],
	height:40
})