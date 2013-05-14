Ext.define('Scrum.view.userstory.RightPart', {
	extend : 'Ext.container.Container',
	xtype : 'scrum-backlog-right-part',
	require : [
		'Scrum.view.userstory.Card',
		'Scrum.view.userstory.form.CreateForm',
		'Scrum.view.sprint.form.CreateForm',
		'Scrum.view.CommentPanel'
	],
	layout : { type : 'card'},
	items : [
		{
			xtype :'tabpanel', 
			tabBar : { cls : 'scrum-tabbar'},
			flex : 2,
			layout : { type : 'fit'},
			items : [
				Ext.create('Scrum.view.userstory.Card', {
					title : 'Profile',
					itemId : 'profile'
				}),
				Ext.create('Scrum.view.CommentPanel', {
					title : 'Comments',
					itemId : 'comments',
					commentableEntity : {
					 	url : '/userstory/comment',
					 	idField : 'userstory_id'
					}
				})
			]
		},
		Ext.create('Scrum.view.userstory.form.CreateForm', {
			itemId : 'scrum-userstory-create-form',
			cls : 'scrum-userstory-create-form',
			header : {
				titleAlign : 'left',
				titlePosition : 0,
				tooltipType : 'title',
				title : 'Create Userstory',
				cls : 'scrum-create-form-header',
				items : [
					{ type : 'close', title : 'Close', action : 'close'},
				]
			}
		}),	
		Ext.create('Scrum.view.sprint.form.CreateForm', {
			itemId : 'scrum-sprint-create-form',
			header : {
				titleAlign : 'left',
				tooltipType : 'title',
				cls : 'scrum-create-form-header',
				title : 'Create sprint',
				titlePosition : 0,
				items : [
					{ type : 'close', title : 'Close', action : 'close'},	
				]
			}
		})
	]
})