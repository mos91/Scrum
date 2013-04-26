Counter = Backbone.Model.extend({
	initialize : function(attrs, options){
		options = options || {};
		this.name(options.name);
	},
	defaults : {
		value : -1
	},
	parse : function(resp){
		return {value : parseInt(resp.count)};
	},
	add : function(){
		var value = this.get('value');
		this.set({ value: ++value});
	},
	sub : function(){
		var value = this.get('value');
		this.set({ value: --value});
	},
	reset : function(collection){
		this.set({ value : collection.length});
	},
	name : function(value){
		if (_.isString(value))
			this.name = value;
	}
})