Ext.define('Scrum.controller.TopPanel', {
	extend : 'Ext.app.Controller', 
	views : [
		'ProjectsDropdown'
	],
	stores : [
		'Projects'
	],
	models : [
		'Project'
	],
	init : function(){
		this.control({
			'scrum-contentpanel' : {
				render : { fn : this.setContentPanel, scope : this}
			},
			'scrum-projects-dropdown' : {
				render : { fn : this.renderDropdown, scope : this}
			},
			'scrum-projectprofile' : {
				activate : { fn : this.showProjectProfile, scope : this}
			},
			'scrum-backlog' : {
				activate : { fn : this.showBacklog, scope : this}
			},
			'scrum-projects-dropdown > menuitem[action=projectView]' : {
				click : { fn : this.onProjectClick, scope : this}
			},
			'scrum-toppanel button[action=backlog]' : {
				click : { fn : this.onBacklogClick, scope : this}
			},
			'scrum-toppanel button[action=sprints]' : {
				click : { fn : this.onSprintsClick, scope : this}
			}
		});
	},
	setContentPanel : function(panel){
		this.contentPanel = panel;
	},
	renderDropdown : function(dropdown){
		var menu = dropdown.menu;
		var items = [];
		var projects = this.getProjectsStore();
		dropdown.setLoading({msg : 'Loading...'});

		projects.load({
			url : '/project/get?favorite=1',
			callback : function(records){
				var activeProjectId = Ext.state.Manager.getProvider().get('project-id');
				var activeProject = projects.getById(activeProjectId);
				var activeProjectItem;

				Ext.Array.each(records, function(record, index){
					if (record.get('id') !== activeProjectId){
						items.push({ 
							text : record.get('name'), 
							action : 'projectView',
							projectId : record.get('id')
						});	
					}
				}, this);	

				activeProjectItem = menu.add({ 
					text : activeProject.get('name'), 
					action : 'projectView', 
					projectId : activeProject.get('id')
				});
				menu.add(['-']);
				menu.add(items);	

				dropdown.setLoading(false);	
				activeProjectItem.fireEvent('click', activeProjectItem);
			}, 
			scope : this});	
	},
	onProjectClick : function(item){
		var projectId = item.projectId;
		var store = this.getProjectsStore();

		this.selectedProject = store.getById(projectId);
		this.contentPanel.layout.setActiveItem(0);
		this.contentPanel.layout.setActiveItem('project-profile');
	},
	onBacklogClick : function(){
		this.contentPanel.layout.setActiveItem(0);
		this.contentPanel.layout.setActiveItem('userstory-backlog');
	},
	onSprintsClick : function(){
		return true;
	},
	showProjectProfile : function(profile){
		profile.fireEvent('viewProject', this.selectedProject);
	},
	showBacklog : function(backlog){
		backlog.fireEvent('viewBacklog', this.selectedProject);
	}
})