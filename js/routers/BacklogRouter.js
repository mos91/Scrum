BacklogRouter = new Backbone.Router.extend({
	routes : {
		'userstories/new' : 'getNewUserStories',
		'userstories/accepted' : 'getAcceptedUserStories',
		'userstories/refresh_new' : 'refreshNewUserStories',
		'userstories/refresh_accepted' : 'refreshAcceptedUserStories',
		'userstories/drop(/:id)' : 'dropUserStory',
		'userstories/edit/:id' : 'editUserStory',
		'userstories/accept(/:id)' : 'acceptUserStory',
		'userstories/deny(/:id)' : 'denyUserStory',
		'userstories/create' : 'createUserStory'
	},
	initialize : function(){
		this.on('route', this.afterRoute, this);
	},
	getNewUserStories : function(){
		this.trigger('getNewUserStories');
	},
	getAcceptedUserStories : function(){
		this.trigger('getAcceptedUserStories');
	},
	refreshNewUserStories : function(){
		this.trigger('refreshNewUserStories');
	},
	refreshAcceptedUserStories : function(){
		this.trigger('refreshAcceptedUserStories');
	},
	createUserStory : function(){
		this.trigger('createUserStory');
	},
	dropUserStory : function(id){
		if (id)
			this.trigger('dropUserStory', id);
		else
			this.trigger('dropUserStories');
	},
	editUserStory : function(id){
		this.trigger('editUserStory', id);
	},
	acceptUserStory : function(id){
		if (id)
			this.trigger('acceptUserStory', id);
		else
			this.trigger('acceptUserStories');
	},
	denyUserStory : function(id){
		if (id)
			this.trigger('denyUserStory', id);
		else
			this.trigger('denyUserStories');
	},
	afterRoute : function(router, route, params){
		this.navigate('',{replace:true});
	}
})