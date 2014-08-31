Ext.define('Scrum.view.ProjectsDropdown', {
	extend : 'Ext.button.Split',
	xtype : 'scrum-projects-dropdown',
	text : 'Projects',
	menu : { 
		items : [
			{ text : "Create a new one", action : 'create'}
		]
	}
});