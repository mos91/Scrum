Ext.define('Scrum.view.team.Overview', {
	extend : 'Ext.grid.Panel',
	xtype : 'scrum-team-overview',
	forceFit : true,
	title : 'Team Overview',
	tools : [
		{ type : 'plus', action : 'create', tooltipType : 'title', tooltip : 'Add new user'},
		{ type : 'refresh', action : 'refresh',  tooltipType : 'title', tooltip : 'Refresh overview'}
	],
	initComponent : function(){
		Ext.apply(this, {
			columns : [
				{ 
					text : 'Firstname', dataIndex : 'firstname',
					groupable : false
				},
				{
					text : 'Lastname', dataIndex : 'lastname',
					groupable : false
				}
			]
		});

		this.callParent();
	}
})