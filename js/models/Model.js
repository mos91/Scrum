Model = Backbone.Model.extend({
	parse : function(resp){
		return resp.data[0];
	}
})