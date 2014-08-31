Ext.define('Scrum.view.project.Profile', {
	xtype : 'scrum-projectprofile',
	extend : 'Ext.panel.Panel',
	require : [
		'Scrum.view.CommentPanel',
		'Scrum.view.project.summary.Summary',
		'Scrum.view.project.form.EditForm'
	],
	layout : {
		type : 'hbox',
		align : 'stretch'
	},
	items : [
		{
			xtype : 'panel',
			flex : 2,
			resizable : true,
			collapsible : true,
			collapseDirection : 'left',
			title : 'Description',
			layout : 'card',
			tools : [
				{
					type : 'refresh', tooltip : 'Refresh Profile', tooltipType : 'title', action : 'refresh'
				},
				{
					type : 'edit', tooltip : 'Edit Profile', tooltipType : 'title', action : 'edit'
				},
				{
					type : 'profile', tooltip : 'Show description', tooltipType : 'title', action : 'view', hidden : true
				}
			],
			items :  [
				Ext.create('Ext.panel.Panel', 
				{ 
					bodyCls : 'project-card', 
					overflowY : 'scroll',
					tpl : new Ext.XTemplate('<span class="update-time">Update time - {[this.formatPostDate(values.update_time)]}</span><h2>{name}</h2></hr><div>{description}</div>', {
						formatPostDate : function(date){
							return Scrum.util.template.getPostDate(date);
						}
					})
				}),
				Ext.create('Scrum.view.project.form.EditForm', { itemId : 'form'})
			]
		},
		{ 
			xtype :'tabpanel', 
			tabBar : { cls : 'scrum-tabbar'},
			flex : 4,
			layout : { type : 'fit'},
			items : [
				Ext.create('Scrum.view.project.summary.Summary', { title :'Summary', itemId:'summary'}),
				Ext.create('Scrum.view.CommentPanel', { 
					title : 'Comments',
					itemId : 'comments',
					commentableEntity : {
					 	url : '/comments/create',
					 	idField : 'project_id'
					}
				})
			]
		}
	]
})