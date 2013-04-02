//import
/*$(document).ready(function(){
	$('script[src*="main.js"]').before();
});*/

TopPanelRouter = Backbone.Router.extend({
	routes : {
		'project/change/:id' : 'changeActiveProject',
		'project/create' : 'createNewProject'
	},
	changeActiveProject : function(id){
		this.navigate('',{replace:true});
		this.trigger('projectChange', id);
		
	},
	createNewProject : function(){
		this.navigate('', {replace:true});
		this.trigger('projectCreate');
	}
});

TopPanel = Backbone.View.extend({
	renderDropdown : function(activeProject, projects){
		this.renderBrand(activeProject);
		this.renderProjectList(activeProject, projects);
	},
	renderBrand : function(activeProject){
		$('a.brand').html(activeProject.get('name') + '<b class="caret"></b>');
	},
	renderProjectList : function(activeProject, projects){
		var $projectList = $('#project_list');
		var html = '';
		var project,projectId;
		var activeProjectId;
		
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
	}
});

$(document).ready(function(){
	if ($.cookies.get('login')){
		models = {};
		popups = {};
		popups['projectCreatePopup'] = new PopupForm({
			url : '/project/create',
			id:'project_create_popup',
			title : 'Project Create'
		});
		popups['errorPopup'] = new Alert();
		
		views = {};
		views['topPanel'] = new TopPanel(); 
		routers = {};
		routers['topPanelRouter'] = new TopPanelRouter();
		
		models['activeProject'] = new Backbone.Model(); 
		models['activeProject'].name = 'activeProject';
		models['activeProject'].listenTo(routers['topPanelRouter'], 'projectChange', function(id){
			this.fetch({url:'/project/change', type:"POST", data:{id:id}});
		});
		
		models['projects'] = new Backbone.Collection();
		models['projects'].name = 'projects';
		models['projects'].listenTo(popups['projectCreatePopup'],'submit:popup',function(project){
			this.add(project);
		})
		
		views['topPanel'].listenTo(models['projects'], 'add', function(newProject, projects){
			this.renderProjectList(models['activeProject'], projects);
		});
		views['topPanel'].listenTo(models['activeProject'], 'sync', function(activeProject){
			this.renderDropdown(activeProject, models['projects']);
		});
		views['topPanel'].on('sync:activeProject,projects', function(activeProject, projects){
			this.renderDropdown(activeProject, projects);
		}, views['topPanel']);
		
		popups['projectCreatePopup'].listenTo(routers['topPanelRouter'], 'projectCreate', function(){
			this.render();
		});
		Backbone.Events.on('error', function(errorMessage){
			popups['errorPopup'].render(errorMessage);
		});
		
		$.when(models['activeProject'].fetch({
			url : '/project/get', data:{activeProject:1}
		}), models['projects'].fetch({
			url : '/project/get'
		})).done(function(data){
			views['topPanel'].trigger('sync:activeProject,projects', models['activeProject'], models['projects']);
		}).fail(function(data){
			Backbone.Events.trigger('error', 'General failure reading your disk!');
		});
	}
	 
	Backbone.history.start();
})