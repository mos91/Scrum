/*	
	Collection.js
	this type of collection can be loaded from server partially - collection itself or 
	count of collection, or alltogether
*/

Collection = Backbone.Collection.extend({
	initialize : function(){
		this.count = new Counter();
	},
	parse : function(resp){
		return resp.data;
	}
})