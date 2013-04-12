TopPanel = Backbone.View.extend({
	renderDropdown : function(activeProject, projects){
		this.renderBrand(activeProject);
		this.renderProjectList(activeProject, projects);
	},
	renderBrand : function(activeProject){
		$('a#projects_dropdown_toggle').html(activeProject.get('name') + '<b class="caret"></b>');
	},
	renderProjectList : function(projects,activeProject){
		var $projectList = $('#project_list');
		var html = '';
		var project,projectId;
		var activeProjectId;
		
		html += '<li><a href="/project/get"><i class="icon-th-list"></i> View all</a></li>';
		if (projects.models.length){
			html += '<li class="divider"></li>';
			for(var i = 0;i < projects.models.length;i++){
				project = projects.models[i];
				projectId = project.get('id'); 
				activeProjectId = activeProject.get('id'); 
				if (projectId != activeProjectId){
					html += '<li class="project-list-item"><a href="#project/change/' + projectId + '"><i class="icon-book"></i> '
					+ project.get('name')+ '</a></li>';
				}
			}
		}
		html += '<li class="divider"></li><li class="project-add"><a href="#project/create"><i class="icon-plus"></i> Add New</a></li>';
		
		$projectList.html(html);
	},
	renderUserStoryList : function(userStories){
		var $userStoryList = $('#user_story_list');
		var html = '';
		var userStory;
		
		html += '<li><a href="/userstories/get"><i class="icon-th-list"></i> View all</a></li>';
		if (userStories.length){
			html += '<li class="divider"></li>';
			for (var i = 0;i < userStories.length;i++){
				userStory = userStories[i];
				html += '<li class="user-story-list-item"><a href="#userstories/get/' + userStory.get('id') + '"><i class="icon-file"></i> ' +
					userStory.get('name') + '</a></li>';
			}
		}
		
		html += '<li class="divider"></li><li class="user-story-add"><a href="#userstories/create"><i class="icon-plus"></i> Add New</a></li>';
		$userStoryList.html(html);
	},
	onActiveProjectChange: function(projects, activeProject){
		this.renderBrand(activeProject);
		this.renderProjectList(projects.collection, activeProject);
	},
	onAddProject : function(projects){
		this.renderProjectList(projects.collection, projects.activeProject);
	},
	onAddUserStory : function(newUserStory, userStories){
		this.renderUserStoryList(userStories.slice(0, Const.USER_STORY_LIST_LIMIT));
	},
	onResetProjects : function(projects){
		var activeProject = projects.activeProject;
		var collection = projects.collection;
		this.renderProjectList(collection, activeProject);
	},
	onResetUserStories : function(userStories){
		this.renderUserStoryList(userStories.slice(0, Const.USER_STORY_LIST_LIMIT));
	}
});