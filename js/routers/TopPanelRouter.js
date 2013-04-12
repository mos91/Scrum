TopPanelRouter = Backbone.Router.extend({
	routes : {
		'project/get' : 'getProjects',
		'project/change/:id' : 'changeActiveProject',
		'userstories/get' : 'getUserStories',
		'userstories/get/:id' : 'getUserStory',
		'project/create' : 'createNewProject',
		'userstories/create' : 'createNewUserStory'
	},
	initialize : function(){
		this.on('route', this.afterRoute, this);
	},
	afterRoute : function(router, route, params){
		this.navigate('',{replace:true});
	},
	getProjects : function(){
		this.trigger('getProjects');
	},
	changeActiveProject : function(id){
		this.trigger('projectChange', id);	
	},
	getUserStory : function(id){
		this.trigger('getUserStory', id);
	},
	getUserStories : function(){
		this.trigger('getUserStories');
	},
	createNewProject : function(){
		this.trigger('projectCreate');
	},
	createNewUserStory : function(){
		this.trigger('userStoryCreate');
	}
});