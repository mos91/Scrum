Projects = Backbone.Model.extend({
	name : 'projects',
	initialize : function(attributes, options){
		this.activeProject = new Backbone.Model();
		this.collection = new Backbone.Collection();
	},
	fetch : function(options){
		var self = this;
		$.when(this.activeProject.fetch({url : '/project/get', data:{activeProject:1}, silent:true}), 
			   this.collection.fetch({url : '/project/get', silent:true})).done(function(data){
				   self.trigger('sync', self, data, options);
			   }).fail(function(data){
				   Backbone.Events.trigger('error', 'Projects have not fetched from server!');
			   });
	},
	onChangeActiveProject : function(id){
		var self = this;
		this.activeProject.fetch({url:'/project/change', type:"POST", data:{id:id}, silent:true})
		.done(function(){
			self.trigger('change:activeProject', self, self.activeProject);
		})
		.fail(function(data){
			Backbone.Events.trigger('error', 'Project have not changed');
		 });
	},
	onAdd : function(data){
		if (data.project){
			if (data.makeActive){
				this.activeProject.set(data.project);
				this.trigger('change:activeProject', this, this.activeProject);
			}
			this.collection.add(data.project, {silent:true});
			this.trigger('add', this, this.collection);
		}
	}
})