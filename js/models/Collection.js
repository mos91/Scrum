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
	},
	fetch : function(options){
		var self = this;
		var takeAll, takeCount;
		var options, _options;

		//backup options
		_options =  options ? _.clone(options) : {};
		/*if we not specify what we want to take from server, then we take all - data and count*/
		if (!options || !options.giveme || (options.giveme === true) || 
			(options.giveme['count'] && options.giveme['data'])) {
			takeAll = true;
		}
		//exclude 'giveme' option from passed to native 'fetch' operation 
		_options = _.omit(_options, 'giveme');
		if (options.giveme['count'] && !takeAll){
			this._fetchCount(_options);
		}

		if (options.giveme['data'] && !takeAll){
			this._fetchData(_options);
		}

		if (takeAll){
			this._fetchCountAndData(_options);
		}
	},
	_fetchCountAndData : function(options){
		var self = this;
		/* i suspend 'add' event for collection, instead fire only 'reset' event, 
			it useful for bulk operations - and that's why 'reset' option is specified */
		var defaults = { data : { count:true, data:true }, reset : true};
		options = _defaults(options, defaults);

		Collection.__super__.fetch.apply(this,[options])
		.done(function(data){
			var model = self.count;
			if (!model.set(model.parse(data, options), options)) return false;
			self.trigger('sync:count', self, data, options);
			self.trigger('sync:data', self, data, options);
		})
		.fail(function(){
			Backbone.Events.trigger('error', 'Collection count haven\'t fetched form server!');
			Backbone.Events.trigger('error', 'Collection data haven\'t fetched form server!');
		})
	},
	_fetchCount : function(options){
		var self = this;
		var defaults  = { data:{ count: true, data:false}};
		options = _.defaults(options, defaults);
		
		this.count.fetch(options)
		.done(function(data){
			self.trigger('sync:count', self, data, options);
			self.trigger('sync', self, data, options);
		})
		.fail(function(){
			Backbone.Events.trigger('error', 'Collection count haven\'t fetched form server!');
		});
	},
	_fetchData : function(options){
		var self = this;
		var defaults = { data:{ count : false, data:true}, reset:true};
		options = _.defaults(options, defaults);

		/* i suspend 'add' event for collection, instead fire only 'reset' event, 
			it useful for bulk operations - and that's why 'reset' option is specified */
		Collection.__super__.fetch.apply(this,[options])
		.done(function(data){
			self.trigger('sync:data', self, data, options);
			self.trigger('sync', self, data, options);
		})
		.fail(function(){
			Backbone.Events.trigger('error', 'Collection data haven\'t fetched form server!');
		});
	}
})