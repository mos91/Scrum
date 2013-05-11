Ext.define('Scrum.view.userstory.Card', {
	extend : "Ext.panel.Panel",
	xtype : 'scrum-userstory-card',
	flex : 2,
	//title : 'Description',
	require : [
		'Scrum.view.userstory.EditForm'
	],
	layout : 'card',
	/*tools : [
		{
			type : 'refresh', tooltip : 'Refresh Profile', tooltipType : 'title'
		},
		{
			type : 'edit', tooltip : 'Edit Profile', tooltipType : 'title', action : 'edit'
		},
		{
			type : 'profile', tooltip : 'Show description', tooltipType : 'title', action : 'view', hidden : true
		}
	],*/
	items :  [
		Ext.create('Ext.panel.Panel', { 
			bodyCls : 'project-card', 
			overflowY : 'scroll',
			tpl : new Ext.XTemplate('<span class="update-time">Update time - {[this.formatPostDate(values.update_time)]}</span><h2>{name}</h2></hr><div>{description}</div>', {
				formatPostDate : function(date){
					return Scrum.util.template.getPostDate(date);
				}
			})
		}),
		Ext.create('Scrum.view.userstory.CreateForm', {
			itemId : 'scrum-userstory-create-form'
		}),
		Ext.create('Scrum.view.userstory.EditForm', { 
			itemId : 'scrum-userstory-edit-form'
		})
	]
});