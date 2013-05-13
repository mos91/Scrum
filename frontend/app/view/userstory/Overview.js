Ext.define('Scrum.view.userstory.Overview', {
	extend : 'Ext.panel.Panel',
	xtype : 'scrum-userstory-overview', 
	layout : 'card',
	require : [
		'Scrum.view.userstory.Grid'
	],
	items : [
		Ext.create('Scrum.view.userstory.Grid', {
			itemId : 'scrum-userstory-grid',
		})
	],
	flex : 1,
	resizable : true,
	collapsible : true,
	title : 'Overview',
	collapseDirection : 'left',
	tools : [
		{ type : 'plus', action : 'create', tooltipType : 'title', tooltip : 'Add new userstory'},
		{ type : 'refresh', action : 'refresh', tooltipType : 'title', tooltip : 'Refresh overview'}
	]
})