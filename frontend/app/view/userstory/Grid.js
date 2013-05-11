Ext.define('Scrum.view.userstory.Grid', {
	extend : 'Ext.grid.Panel',
	forceFit : true,
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
			renderer : function(value){
				return Scrum.util.template.getUserStoryDisplayValue(value);
			}
		}, 
		{ 
			text : 'update_time', dataIndex : 'update_time',
			renderer : function(value){
				return Scrum.util.template.getPostDate(value);
			}
		}
	]
})