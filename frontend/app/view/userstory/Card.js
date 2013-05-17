Ext.define('Scrum.view.userstory.Card', {
	extend : "Ext.panel.Panel",
	xtype : 'scrum-userstory-card',
	//flex : 2,
	require : [
		'Scrum.view.userstory.form.EditForm'
	],
	layout : 'card',
	bodyCls : 'userstory-card', 
	items :  [
		Ext.create('Ext.panel.Panel', { 
			itemId : 'scrum-userstory-profile',
			overflowY : 'scroll',
			header : {
				titleAlign : 'right',
				tooltipType : 'title',
				items : [
					{ type : 'refresh', title : 'Refresh Profile', action : 'refresh'},
					{ type : 'edit', title : 'Edit Profile', action : 'edit'}
				]
			},
			tpl : new Ext.XTemplate(
					'<span class="update-time">Update time - {[this.formatPostDate(values.update_time)]}</span>' + 
					'<span class="tag"><b>{status.display}</b></span>' + 
				'<h2>{name}</h2></hr><div>{description}</div>', {
				formatPostDate : function(date){
					return Scrum.util.template.getPostDate(date);
				}
			})
		}),
		Ext.create('Scrum.view.userstory.form.EditForm', { 
			itemId : 'scrum-userstory-edit-form',
			header : {
				tooltipType : 'title',
				titleAlign : 'left',
				title : 'Edit Userstory',
				titlePosition : 0,
				items : [
					{ type : 'close', title : 'Close', action : 'close'},
				]
			}
		})
	]
});