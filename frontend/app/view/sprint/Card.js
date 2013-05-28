Ext.define('Scrum.view.sprint.Card', {
	extend : "Ext.panel.Panel",
	xtype : 'scrum-sprint-card',
	require : [
		'Scrum.view.sprint.form.EditForm'
	],
	layout : 'card',
	bodyCls : 'sprint-card', 
	items : [
		Ext.create('Ext.panel.Panel', { 
			itemId : 'scrum-sprint-profile',
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
		Ext.create('Scrum.view.sprint.form.EditForm', { 
			itemId : 'scrum-sprint-edit-form',
			header : {
				tooltipType : 'title',
				titleAlign : 'left',
				title : 'Edit Sprint',
				titlePosition : 0,
				items : [
					{ type : 'close', title : 'Close', action : 'close'},
				]
			}
		})
	]
})