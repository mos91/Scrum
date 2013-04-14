ProjectsRouter = Backbone.Router.extend({
	routes : {
		'projects/trash' : 'getTrashProjects',
		'projects/all' : 'getAllProjects',
		'projects/refresh' : 'refreshAllProjects',
		'projects/refresh_trash' : 'refreshTrashedProjects',
		'projects/drop(/:id)' : 'dropProject',
		'projects/restore(/:id)' : 'restoreProject',
		'projects/edit/:id' : 'editProject',
		'projects/create' : 'createProject'
	},
	initialize : function(){
		this.on('route', this.afterRoute, this);
	},
	getTrashProjects : function(){
		this.trigger('getTrashProjects');
	},
	getAllProjects : function(){
		this.trigger('getAllProjects');
	},
	refreshAllProjects : function(){
		this.trigger('refreshAllProjects');
	},
	refreshTrashedProjects : function(){
		this.trigger('refreshTrashedProjects');
	},
	createProject : function(){
		this.trigger('createProject');
	},
	dropProject : function(id){
		if (id)
			this.trigger('dropProject', id);
		else
			this.trigger('dropProjects');
	},
	restoreProject : function(id){
		if (id)
			this.trigger('restoreProject',id);
		else
			this.trigger('restoreProjects');
	},
	editProject : function(id){
		this.trigger('editProject', id);
	},
	
	afterRoute : function(router, route, params){
		this.navigate('',{replace:true});
	}
})