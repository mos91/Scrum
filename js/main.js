//import
/*$(document).ready(function(){
	$('script[src*="main.js"]').before();
});*/

TopPanelRouter = Backbone.Router.extend({
	routes : {
		'project/change/:id' : 'changeActiveProject',
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
	changeActiveProject : function(id){
		this.trigger('projectChange', id);	
	},
	getUserStory : function(id){
		this.trigger('getUserStory', id);
	},
	createNewProject : function(){
		this.trigger('projectCreate');
	},
	createNewUserStory : function(){
		this.trigger('userStoryCreate');
	}
});

TopPanel = Backbone.View.extend({
	renderDropdown : function(activeProject, projects){
		this.renderBrand(activeProject);
		this.renderProjectList(activeProject, projects);
	},
	renderBrand : function(activeProject){
		$('a#projects_dropdown_toggle').html(activeProject.get('name') + '<b class="caret"></b>');
	},
	renderProjectList : function(activeProject, projects){
		var $projectList = $('#project_list');
		var html = '';
		var project,projectId;
		var activeProjectId;
		
		html += '<li><a href="#project/get"><i class="icon-th-list"></i> View all</a></li><li class="divider"></li>';
		for(var i = 0;i < projects.models.length;i++){
			project = projects.models[i];
			projectId = project.get('id'); 
			activeProjectId = activeProject.get('id'); 
			if (projectId != activeProjectId){
				html += '<li class="project-list-item"><a href="#project/change/' + projectId + '"><i class="icon-book"></i> '
				+ project.get('name')+ '</a></li>';
			}
		}
		html += '<li class="divider"></li><li class="project-add"><a href="#project/create"><i class="icon-plus"></i> Add New</a></li>';
		
		$projectList.html(html);
	},
	renderUserStoryList : function(userStories){
		var $userStoryList = $('#user_story_list');
		var html = '';
		var userStory;
		
		html += '<li><a href="#userstories/get"><i class="icon-th-list"></i> View all</a></li><li class="divider"></li>';
		for (var i = 0;i < userStories.models.length;i++){
			userStory = userStories.models[i];
			html += '<li class="user-story-list-item"><a href="#userstories/get/' + userStory.get('id') + '"><i class="icon-file"></i> ' +
				userStory.get('name') + '</a></li>';
		}
		html += '<li class="divider"></li><li class="user-story-add"><a href="#userstories/create"><i class="icon-plus"></i> Add New</a></li>';
		$userStoryList.html(html);
	}
});

TopPanelBehaviour = function(){
	this.init();
}

TopPanelBehaviour.prototype.init = function(){
	this.initRouters();
	this.initModels();
	this.initViews();
	this.bind();
}

TopPanelBehaviour.prototype.initModels = function(){
	this.models = {};

	this.models['activeProject'] = new Backbone.Model();
	this.models['activeProject'].name = 'activeProject';
	
	this.models['projects'] = new Backbone.Collection();
	this.models['projects'].name = 'projects';
	
	this.models['userStories'] = new Backbone.Collection();
	this.models['userStories'].name = 'userStories';
}

TopPanelBehaviour.prototype.initViews = function(){
	this.popups = {};
	this.views = {};
	this.views['topPanel'] = new TopPanel();
	this.popups['projectCreatePopup'] = new PopupForm({
		url : '/project/create',
		id:'project_create_popup',
		title : 'Project Create'
	});
	this.popups['userStoryCreatePopup'] = new PopupForm({
		url: '/userstories/create',
		id: 'user_story_create_popup',
		title : 'User Story Create'
	});
	this.popups['errorPopup'] = new Alert();
}

TopPanelBehaviour.prototype.initRouters = function(){
	this.routers = {};
	this.routers['topPanelRouter'] = new TopPanelRouter();
}

/*{
 * 'model:activeProject' => 'topPanelRouter', 'projectChange', function(args){...} 
	}*/
TopPanelBehaviour.prototype.bind = function(){
	var self = this;
	//models bindings
	this.models['activeProject'].listenTo(this.routers['topPanelRouter'], 'projectChange', function(id){
		this.fetch({url:'/project/change', type:"POST", data:{id:id}});
	});
	this.models['projects'].listenTo(this.popups['projectCreatePopup'],'submit:popup',function(data){
		if (data.project){
			if (data.makeActive){
				self.models['activeProject'].set(data.project);
				this.add(data.project, {silent:true});
			}
			else 
				this.add(data.project);
		}
	});
	this.models['userStories'].listenTo(this.popups['userStoryCreatePopup'], 'submit:popup', function(data){
		if (data.userStory)
			this.add(data.userStory);
	});
	this.models['userStories'].listenTo(this.models['activeProject'], 'change', function(){
		this.fetch({ url : '/userstories/get', data:{limit:10}}).error(function(){
			Backbone.Events.trigger('error', 'User stories have not fetched from server!');
		});
	});
	
	//view bindings
	this.views['topPanel'].listenTo(this.models['projects'], 'add', function(newProject, projects){
		this.renderProjectList(self.models['activeProject'], projects);
	});
	this.views['topPanel'].listenTo(this.models['userStories'], 'add', function(newUserStory, userStories){
		this.renderUserStoryList(userStories);
	});
	this.views['topPanel'].listenTo(this.models['activeProject'], 'change', function(activeProject){
		this.renderBrand(activeProject);
		this.renderProjectList(activeProject, self.models['projects']);
	});
	this.views['topPanel'].listenTo(this.models['projects'], 'reset', function(projects){
		this.renderProjectList(self.models['activeProject'], projects);
	});
	this.views['topPanel'].listenTo(this.models['userStories'], 'reset', function(userStories){
		this.renderUserStoryList(self.models['userStories']);
	});
	
	//popup bindings
	this.popups['projectCreatePopup'].listenTo(this.routers['topPanelRouter'], 'projectCreate', function(){
		this.render();
	});
	this.popups['userStoryCreatePopup'].listenTo(this.routers['topPanelRouter'], 'userStoryCreate', function(){
		this.render();
	});
	
	Backbone.Events.on('error', function(errorMessage){
		self.popups['errorPopup'].render(errorMessage);
	});
}

TopPanelBehaviour.prototype.fetchData = function(){
	var self = this;
	var fetchProjectsAndActiveProject = $.when(this.models['activeProject'].fetch({
		url : '/project/get', data:{activeProject:1}, silent:true
	}), this.models['projects'].fetch({
		url : '/project/get', silent:true
	})).done(function(data){
		self.models['activeProject'].trigger('change', self.models['activeProject']);
		self.models['projects'].trigger('reset', self.models['projects']);
	}).fail(function(data){
		Backbone.Events.trigger('error', 'Projects have not fetched from server!');
	});
}

$(document).ready(function(){
	if ($.cookies.get('login')){ 
		topPanelBehaviour = new TopPanelBehaviour();
		topPanelBehaviour.fetchData();
	}
	 
	Backbone.history.start();
})