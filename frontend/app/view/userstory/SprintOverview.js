Ext.define('Scrum.view.userstory.SprintOverview', {
	extend : 'Ext.grid.Panel',
	xtype : 'scrum-userstory-sprint-overview', 
	title : 'Overview',
	forceFit : true,
	/*tools : [
		{ type : 'plus', action : 'create', tooltipType : 'title', tooltip : 'Add new userstory'},
		{ type : 'refresh', action : 'refresh', tooltipType : 'title', tooltip : 'Refresh overview'}
	]*/
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