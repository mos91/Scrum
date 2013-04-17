Ext.define('Scrum.view.feedviewer.feed.Viewer', {
	extend : 'Ext.panel.Panel',
	alias: 'widget.app-feedviewer',

	requires : [
		'Scrum.view.feedviewer.article.Grid',
		'Scrum.view.feedviewer.article.Preview'
	],
	closable : false,
	layout : {
		type : 'vbox',
		align : 'stretch'
	},
	margins: '5 5 5 5',
	items : [
		{
			xtype : 'app-articlegrid',
			flex : 1
		}, 
		{
			xtype : 'app-articlepreview',
			cls : 'app-articlepreview',
			height : 300
		}
	]
})