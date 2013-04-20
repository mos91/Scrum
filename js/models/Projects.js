Projects = Backbone.Model.extend({
	name : 'projects',
	initialize : function(attributes, options){
		/**/
		this.active = new Backbone.Model();
		/*live projects - projects which are currently not deleted*/
		this.live = {   
						count : new Backbone.Model({ count : 0}), 
						collection : new Backbone.Collection()
					};
		this.trashed = 	{ 
							count : new Backbone.Model({ count : 0}), 
							collection : new Backbone.Collection()
						};
	},
	/*
		fetch.giveme :
		active (true|false) - give me only active project

		live (true|false|object) - give me only live projects
		live.onlyCount(int) - give me only count of live projects
		live.limit - give me collection of specified limit, 
					 if not specified live.offset option, 
					 then server will take projects from first row till limit
		live.offset - give me collection from specified offset till specified limit, 
					  if limit was not specified, then server takes projects from offset till the end

		trashed(true|false|object) - give me only trashed projects
		trashed.onlyCount(int) - give me only count of trashed projects
		trashed.limit - see live.limit
		trashed.offset - see live.offset
	*/
	fetch : function(options){
		var self = this;
		var takeAll;
		var options, _options;

		//backup options
		_options = _.clone(options);
		/*if we not clarify what we want to take from server, then we take all - active project,live and dropped projects*/
		if (!options || !options.giveme || options.giveme === true) {
			takeAll = true;
		}

		if (takeAll || options.giveme['active']){
			this._fetchActiveProject(_options);
		}
		if (takeAll || options.giveme['live']){
			options = options.giveme['live'];
			if (options['onlyCount'])
				this._fetchLiveProjectsCount(_options);
			else {
				this._fetchLiveProjects(_options);
			}
		}
		if (takeAll || options.giveme['trashed']){
			options = options.giveme['trashed'];
			if (options['onlyCount'])
				this._fetchTrashedProjectsCount(_options);
			else {
				this._fetchTrashedProjects(_options);
			}
		}
		
	},
	_fetchLiveProjectsCount : function(options){
		this.live.count.fetch({ url : '/project/get' , data: {live:true, count:true, data:false}, silent : true})
		.done(function(data){
			self.trigger('sync:live.count', self, data, options);
			self.trigger('sync', self, data, options);
		})
		.fail(function(){
			Backbone.Events.trigger('error', 'Live projects count not fetched form server!');
		});
	},
	_fetchLiveProjects : function(options){
		this.live.collection.fetch({ url : '/project/get', data: { live :  true}, silent : true})
		.done(function(data){
			self.trigger('sync:live.count', self, data, options);
			self.trigger('sync:live', self, data, options);
			self.trigger('sync', self, data, options);	
		})
		.fail(function(){
			Backbone.Events.trigger('error', 'Live projects have not fetched from server!');
		});
	},
	_fetchTrashedProjectsCount : function(options){
		this.trashed.count.fetch({ url : '/project/get' , data: {trashed:true, count:true, data:false}, silent : true})
		.done(function(data){
			self.trigger('sync:trashed.count', self, data, options);
			self.trigger('sync', self, data, options);
		})
		.fail(function(){
			Backbone.Events.trigger('error', 'Trashed projects count not fetched form server!');
		});
	}
	_fetchTrashedProjects : function(options){
		var data = { trashed :  true};
		if (options.onlyCount){
			
			this.live.count
		}

		this.live.collection.fetch( {url : '/project/get', data: data, silent : true})
		.done(function(data){
			if (options.onlyCount){
				self.trigger('sync:trashed.count', self, data, options);
				self.trigger('sync', self, data, options);
			}
			else {
				self.trigger('sync:trashed.count', self, data, options);
				self.trigger('sync:trashed', self, data, options);
				self.trigger('sync', self, data, options);	
			}
		})
		.fail(function(){
			Backbone.Events.trigger('error', 'Trashed projects have not fetched from server!');
		});
	},
	_fetchActiveProject : function(options){
		this.active.fetch({ url : '/project/get', data:{activeProject:1}, silent:true})
		.done(function(data){ 
			self.trigger('sync:active', self, data, options);
			self.trigger('sync', self, data, options);
		)})
		.fail(function(){
			Backbone.Events.trigger('error', 'Active project have not fetched from server!')l
		});
	},
	onChangeActiveProject : function(id){
		var self = this;
		this.active.fetch({url:'/project/change', type:"POST", data:{id:id}, silent:true})
		.done(function(data){
			self.trigger('sync:active', self, data, options);
			self.trigger('sync', self, data, options);
			self.trigger('change:active', self, self.active);
		})
		.fail(function(data){
			Backbone.Events.trigger('error', 'Project have not changed');
		 });
	},
	onAdd : function(data){
		if (data.project){
			this.collection.add(data.project, {silent:true});
			this.trigger('add', this, this.collection);
		}
	}
})