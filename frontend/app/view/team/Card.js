Ext.define('Scrum.view.team.Card', {
	extend : "Ext.panel.Panel",
	xtype : 'scrum-team-card',
	layout : 'card',
	bodyCls : 'userstory-card', 
	items :  [
		Ext.create('Ext.panel.Panel', { 
			itemId : 'scrum-user-profile',
			overflowY : 'scroll',
			header : {
				titleAlign : 'right',
				tooltipType : 'title',
				items : [
					{ type : 'refresh', title : 'Refresh Profile', action : 'refresh'}
				]
			}
			/*tpl : new Ext.XTemplate(
					'<span class="update-time">Update time - {[this.formatPostDate(values.update_time)]}</span>' + 
					'<span class="tag"><b>{status.display}</b></span>' + 
				'<h2>{name}</h2></hr><div>{description}</div>', {
				formatPostDate : function(date){
					return Scrum.util.template.getPostDate(date);
				}
			})*/
		})
	]
});