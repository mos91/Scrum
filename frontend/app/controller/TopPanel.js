Ext.define('Scrum.controller.TopPanel', {
	extend : 'Ext.app.Controller', 
	views : [
		'ProjectsDropdown'
	],
	stores : [
		'FavoriteProjects'
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
			'scrum-projects-dropdown > menuitem[action=projectView]' : {
				click : { fn : this.onDropdownItemClick, scope : this}
			},
			'scrum-projects-dropdown > menuitem[action=activeProjectView]' : {
				click : { fn : this.onDropdownItemClick, scope : this}	
			}
		});
	},
	setContentPanel : function(panel){
		this.contentPanel = panel;
	},
	renderDropdown : function(dropdown){
		var menu = dropdown.menu;
		var items = [];
		var activeProject = this.getProjectModel();
		var favoriteProjects = this.getFavoriteProjectsStore();

		dropdown.setLoading({msg : 'Loading...'});
		activeProject.load(null,{ 
			callback : function(record){
				dropdown.setText(record.get('name'));
				dropdown.setLoading(false);
			},
			scope : this
		});

		favoriteProjects.load({
			callback : function(records){
				items.push('-');

				Ext.Array.each(records, function(record, index){
					items.push({ 
						text : record.get('name'), 
						action : 'projectView',
						projectId : record.get('id')
					});
				}, this);	

				menu.add(items);		
			}, 
			scope : this});	
	},
	onDropdownItemClick : function(item){
		var projectId = item.projectId;
		var store = this.getFavoriteProjectsStore();

		this.selectedProject = store.findRecord('id', projectId);
		item.up('scrum-projects-dropdown').setText(this.selectedProject.get('name'));
		this.contentPanel.layout.setActiveItem(0);
		this.contentPanel.layout.setActiveItem('project-profile');
	},
	showProjectProfile : function(profile){
		var activeProject;

		if (!this.selectedProject){
			activeProject = this.getProjectModel(); 
			activeProject.load(null, {
				callback : function(record){
					this.selectedProject = record;
					profile.fireEvent('viewProject', this.selectedProject);
				},
				scope : this
			})
		}
		else {
			profile.fireEvent('viewProject', this.selectedProject);
		}
	}
})