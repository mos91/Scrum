Counter = Backbone.Model.extend({
	defaults : {
		value : 0
	},
	parse : function(resp){
		return resp.count;
	}
})