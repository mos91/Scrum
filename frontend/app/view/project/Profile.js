Ext.define('Scrum.view.project.Profile', {
	xtype : 'scrum-projectprofile',
	extend : 'Ext.panel.Panel',
	require : [
		'Scrum.view.project.CommentPanel',
		'Scrum.view.project.summary.Summary',
		'Scrum.view.project.Form'
	],
	layout : {
		type : 'hbox',
		align : 'stretch'
	},
	items : [
		{ 
			xtype :'panel', 
			flex : 2, 
			resizable : true,
			collapsible : true,
			title : 'Description',
			collapseDirection : 'left',
			bodyCls : 'project-card',
			tpl : new Ext.XTemplate('<span class="update-time">Update time - {[this.formatPostDate(values.update_time)]}</span><h2>{name}</h2></hr><div>{description}</div>', {
				formatPostDate : function(date){
					return Scrum.util.template.getPostDate(date);
				}
			}),
			autoScroll : true
		},
		{ 
			xtype :'tabpanel', 
			tabBar : { cls : 'scrum-tabbar'},
			flex : 4,
			layout : { type : 'fit'},
			items : [
				Ext.create('Scrum.view.project.Form', { title :'Edit', itemId : 'form'}),
				Ext.create('Scrum.view.project.summary.Summary', { title :'Summary', itemId:'summary'}),
				Ext.create('Scrum.view.project.CommentPanel', { title : 'Comments', itemId : 'comments'})
			]
		}
	]
})