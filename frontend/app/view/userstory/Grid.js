Ext.define('Scrum.view.userstory.Grid', {
	extend : 'Ext.grid.Panel',
	forceFit : true,
	require : [
		'Ext.form.field.ComboBox',
		'Ext.grid.plugin.CellEditing',
		'Scrum.store.UserStoryStatuses'
	],
	getAvailableUserStoryStatuses : function(cellEditing, event){
		var activeEditor = event.column.getEditor();
		var userstoryStatus = event.value;

		activeEditor.store.clearFilter();
		activeEditor.store.filterBy(function(status){
			var userstoryStatus = event.value.value; 
			var status = parseInt(status.raw[0]);
			return Ext.data.Types.USER_STORY_STATUS.isNeighbour(userstoryStatus, status);
		}, this);
	},
	disableGrouping : function(button){
		var toolbar = button.up('toolbar');
		button.hide();
		toolbar.down('button[action=enable_grouping]').show();

		this.groupingFeature.disable();
	},
	enableGrouping : function(button){
		var toolbar = button.up('toolbar');
		button.hide();
		toolbar.down('button[action=disable_grouping]').show();

		this.groupingFeature.enable();
	},
	onBeforeUserStoryDrop : function(node, data, overModel){
		var sprint; 
		var draggedModel = data.records[0];

		if (overModel.get('sprint')){
			sprint = overModel.get('sprint');
			data.view.fireEvent('attachToSprint', draggedModel, sprint);
		}
		else if (Ext.isEmpty(overModel.sprint) && !Ext.isEmpty(draggedModel)){
			data.view.fireEvent('detachFromSprint', draggedModel)
		}
	},
	onBeforeEdit : function(cellEditing, event){
		if (event.field === 'status'){
			this.getAvailableUserStoryStatuses.apply(this, arguments);
			//fix : replace UserStoryStatus type object by value.display for valide view of cell edit
			event.value = event.value.display;
		}
	},
	onValidateEdit : function(cellEditing, event){
		var value = parseInt(event.value);
		if (event.field === 'status'){
			event.value = Ext.data.Types.USER_STORY_STATUS.getFromValue(value);
		}
	},
	onCancelEdit : function(cellEditing, event){
		if (event.field === 'status'){
			event.value = this.oldStatus;
		}
	},
	onCompleteEdit : function(cellEditing, event){
		this.fireEvent('onCompleteEditStatus', event.grid, 
			{ 
				record : event.record,
				oldStatus : event.originalValue,
			 	newStatus : event.value
			}
		);
	},
	initComponent : function(){
		this.groupingFeature = Ext.create('Ext.grid.feature.Grouping', {
			collapsible : true,
			groupHeaderTpl : '<tpl if="name">{columnName}: {name}<tpl else>Not currently in any sprint</tpl>'
		});

		Ext.apply(this, {
			groupField : 'sprint_group_field',
			features: [this.groupingFeature],
			tbar : {
				items : [{
					text:'Show all',
					action : 'disable_grouping',
                	scope: this,
                	handler: this.disableGrouping
                },
                {
                	text : 'Show by sprints',
                	hidden : true,
                	action : 'enable_grouping',
                	scope : this,
                	handler : this.enableGrouping
                }]	
			},
			viewConfig : {
				plugins : [
					{
	            		ptype: 'gridviewdragdrop',
	            		dragText: 'Drag and drop to reorganize'
	        		}
				],
				listeners : {
					beforedrop : { fn : this.onBeforeUserStoryDrop , scope : this}
				}
			},
			plugins : 
				[
					{ 
						ptype : 'cellediting', 
						pluginId : 'cellediting',
						clicksToEdit : 2,
						listeners : {
							beforeedit : { 
								fn : this.onBeforeEdit, scope : this
							},
							validateedit : {
								fn : this.onValidateEdit, scope : this
							},
							edit : {
								fn : this.onCompleteEdit, scope : this
							}
						}
					}
				],
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
		});

		this.callParent();
	}
})