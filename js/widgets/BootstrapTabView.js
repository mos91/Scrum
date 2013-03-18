BootstrapTabview = Backbone.View.extend({
	init : function(){
		
	},
	render : function(attributes, options){
		this.id = attributes.id;
		this.$el = $('#' + this.id);
	}
})