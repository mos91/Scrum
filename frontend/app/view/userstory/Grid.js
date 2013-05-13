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
		Ext.apply(this, {
			groupField : 'sprint',
			features: [{
				ftype:'grouping',
				groupHeaderTpl : '{columnName}: {groupValue.name}'
							/*new Ext.XTemplate('<tpl if="this.isDefined(values.renderedGroupValue)">' +
								 '{columnName}: {renderedGroupValue.name}' +
								 '<tpl else>Not in any sprint</tpl>', {
								 	isDefined : function(value){
								 		return value != undefined;
								 	}
								 })*/
			}],
			plugins : 
				[{ 
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
				}],
			columns : [
				{ text : 'Name', dataIndex : 'name'},
				{ text : 'Estimate', dataIndex : 'estimate'},
				{ 
					text : 'Priority', dataIndex : 'priority',
					renderer : function(value){
						return Scrum.util.template.getPriorityDisplayValue(value);
					}
				},
				{ 
					text : 'Status', dataIndex : 'status',
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
					text : "In Sprint", dataIndex : 'sprint',
					renderer : function(value){
						if (Ext.isObject(value))
							return value.name;

						return '';
					}
				},
				{ 
					text : 'update_time', dataIndex : 'update_time',
					renderer : function(value){
						return Scrum.util.template.getPostDate(value);
					}
				}
			]
		});

		this.callParent();
	}
})