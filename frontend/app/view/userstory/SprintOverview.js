Ext.define('Scrum.view.userstory.SprintOverview', {
	extend : 'Ext.grid.Panel',
	xtype : 'scrum-userstory-sprint-overview', 
	title : 'Sprint Overview',
	forceFit : true,
	tools : [
		{ type : 'refresh', action : 'refresh', tooltipType : 'title', tooltip : 'Refresh overview'}
	],
	tbar : {
		items : [
			{ xtype : 'combobox' , store : [['value1', 'value1'], ['value2', 'value2'], ['value3', 'value3']]}
		]
	},
	bbar : {
		xtype : 'pagingtoolbar',
		itemId : 'paging-toolbar',
		displayInfo: true,
        displayMsg: 'Displaying userstories {0} - {1} of {2}',
        emptyMsg: "No userstories to display",
	},
	initComponent : function(){
		
		Ext.apply(this, {
			tbar : {
				items : [
					{ xtype : 'combobox', action : 'get_sprints', displayField : 'name', valueField : 'id'}
				]	
			}
		});
		this.callParent();
	}
	columns : [
		{ 
			text : 'Name', dataIndex : 'name', 
			groupable : false
		},
		{ 
			text : 'Estimate',
			dataIndex : 'estimate',
			groupable : false
		},
		{ 
			text : 'Priority', dataIndex : 'priority',
			groupable : false,
			renderer : function(value){
				return Scrum.util.template.getPriorityDisplayValue(value);
			}
		},
		{ 
			text : 'Status', dataIndex : 'status',
			groupable : false,
			renderer : function(status){
				return status.display;
			},
			editor : {
				xtype : "combobox",
				queryModel : 'local',
				typeAhead : true, 
				triggerAction : 'all',
				selectOnTab : true,
				store : Ext.data.Types.USER_STORY_STATUS.getPairs(),
				valueField : 'value',
				displayField : 'display'
			}
		},
		{
			hidden : true,
			text : "In Sprint", dataIndex : 'sprint_group_field',
			renderer : function(value){
				if (Ext.isObject(value))
					return value.name;

				return '';
			}
		},
		{ 
			text : 'Update time', dataIndex : 'update_time',
			groupable : false,
			renderer : function(value){
				return Scrum.util.template.getPostDate(value);
			}
		}
	]
})