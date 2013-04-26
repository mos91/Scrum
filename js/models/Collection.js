/*	
	Collection.js
	this type of collection can be loaded from server partially - collection itself or 
	count of collection, or alltogether
*/

Collection = Backbone.Collection.extend({
	initialize : function(attrs, options){
		options = options || {};
		this.name(options.name);
	},
	parse : function(resp){
		return resp.data;
	},
	name : function(value){
		if (_.isString(value))
			this.name = value;
	}
})
