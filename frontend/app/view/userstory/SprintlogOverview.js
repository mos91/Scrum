Ext.define('Scrum.view.userstory.SprintlogOverview', {
	extend : 'Ext.grid.Panel',
	xtype : 'scrum-userstory-sprintlog-overview', 
	title : 'Sprint Overview',
	forceFit : true,
	require : [
		'Ext.grid.plugin.DragDrop'
	],
	tools : [
		{ type : 'refresh', action : 'refresh', tooltipType : 'title', tooltip : 'Refresh overview'}
	],
	tbar : {
		items : [
			{ xtype : 'combobox' , action : 'get_sprints', displayField : 'name', valueField : 'id', queryMode : 'local'}
		]
	},
	bbar : {
		xtype : 'pagingtoolbar',
		itemId : 'paging-toolbar',
		displayInfo: true,
        displayMsg: 'Displaying userstories {0} - {1} of {2}',
        emptyMsg: "No userstories to display",
	},
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
				queryMode : 'local',
				typeAhead : true, 
				triggerAction : 'all',
				selectOnTab : true,
				store : Ext.data.Types.USER_STORY_STATUS.getPairs(),
				valueField : 'value',
				displayField : 'display'
			}
		},
		{ 
			text : 'Update time', dataIndex : 'update_time',
			groupable : false,
			renderer : function(value){
				return Scrum.util.template.getPostDate(value);
			}
		}
	],
	onBeforeUserStoryDrop : function(node, data, overModel){
		var draggedModel = data.records[0];

		if (Ext.isEmpty(this.down('combobox').getRawValue()))
			return false;
		
		if ((Ext.isEmpty(overModel) || overModel.get('sprint')) && !draggedModel.get('sprint')){
			return true;	
		}

		return false;
	},
	onAfterUserStoryDrop : function(node, data, overModel){
		var sprint;
		var draggedModel = data.records[0];

		this.view.fireEvent('attachToSprint', draggedModel);
	},
	initComponent : function(){
		Ext.apply(this, {
			viewConfig : {
				plugins : {
            		ptype: 'gridviewdragdrop',
            		dragGroup: 'sprintlogGridDDGroup',
            		dropGroup: 'backlogGridDDGroup',
            		dragText: 'Drag and drop to detach from sprint'
	        	},
				listeners : {
					beforedrop : { fn : this.onBeforeUserStoryDrop  , scope : this},
					drop : { fn : this.onAfterUserStoryDrop, scope : this}
				}
			}
		});

		this.callParent();
	}
})