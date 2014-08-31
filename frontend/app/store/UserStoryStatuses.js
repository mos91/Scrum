Ext.define('Scrum.store.UserStoryStatuses', {
	extend : "Ext.data.Store",
	requires : [
		'Scrum.types.UserStoryStatus'
	],
	fields : [
		{ name : 'status', type : Ext.data.Types.USER_STORY_STATUS}
	],
	/*getData : function(){
		var statuses = Ext.data.Types.USER_STORY_STATUS.getValues();
		var converted = [];
		Ext.each(statuses, function(status){
			converted.push([status.value, status.display]);
		});

		console.log(converted);
		return converted;
	},*/
	initComponent : function(){
		/*Ext.apply(this, {
			data : this.getData()
		});*/

		this.callParent();
	},
	proxy : {
		type : 'memory'
	}
})