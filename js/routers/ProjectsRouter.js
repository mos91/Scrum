ProjectsRouter = Backbone.Router.extend({
	routes : {
		'projects/trash' : 'getTrashProjects',
		'projects/all' : 'getAllProjects',
		'projects/delete/:id' : 'deleteProject',
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
	afterRoute : function(router, route, params){
		this.navigate('',{replace:true});
	},
	createProject : function(){
		this.trigger('createProject');
	},
	deleteProject : function(id){
		this.trigger('deleteProject', id);
	},
	editProject : function(id){
		this.trigger('editProject', id);
	}
})