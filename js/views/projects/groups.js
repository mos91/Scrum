ProjectGroups = Backbone.View.extend({
	models : [],
	initialize : function(options){
		options = options || {};
		this.models = (options.models)? options.models : [];
	},
	onCounter : function(counter){
		$(_.escapedIdSelector(counter.name)).html(counter.get("value"));
	},
	onSwitchGroup : function(oldGroup, newGroup){
		$(_.escapedIdSelector(oldGroup) + '.group-item').removeClass('active');
		$(_.escapedIdSelector(newGroup) + '.group-item').addClass('active');
	}
})