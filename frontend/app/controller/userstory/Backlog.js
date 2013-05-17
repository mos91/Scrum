Ext.define('Scrum.controller.userstory.Backlog', {
	id : 'backlogController',
	extend : 'Ext.app.Controller', 
	views : ['userstory.Backlog'],
	//stores : ['Userstories'],
	models : ['UserStory'],
	getBacklogStore : function(){
		if (!this.backlogStore){
			this.backlogStore = Ext.StoreManager.lookup('backlog');
		}
		return this.backlogStore;
	},
	getSprintlogStore : function(){
		if (!this.sprintlogStore){
			this.sprintlogStore = Ext.StoreManager.lookup('sprintlog');
		}
		return this.sprintlogStore;
	},
	getSprintsStore : function(){
		if (!this.sprintsStore){
			this.sprintsStore = Ext.StoreManager.lookup('sprints');
		}
		return this.sprintsStore;	
	},
	init : function(){
		this.backlogStore = Ext.create('Scrum.store.Userstories', {
			storeId : 'backlog'
		});
		this.sprintlogStore = Ext.create('Scrum.store.Userstories', {
			storeId : 'sprintlog'
		});
		
		if (!(this.sprintsStore = Ext.StoreManager.lookup('sprints'))){
			this.sprintsStore = Ext.create('Scrum.store.Sprints', {
				storeId : 'sprints'
			});
			Ext.StoreManager.register(this.sprintsStore);
		}

		Ext.StoreManager.register(this.backlogStore);
		Ext.StoreManager.register(this.sprintlogStore);

		this.control({
			'scrum-backlog' : {
				viewBacklog : { fn : function(project){
					if (project instanceof Scrum.model.Project){
						this.project = project;
						this.activeSprint = project.get('active_sprint');
					}
					
					this.drawGrid(this.backlogGrid, this.getBacklogStore());
					this.drawGrid(this.sprintlogGrid, this.getSprintlogStore());
				}, scope : this },
				render : { fn : this.setComponents ,  scope : this}
			},
			'scrum-backlog scrum-commentpanel' : {
				activate : { fn : function(commentPanel){
					this.activeTab = commentPanel;
				}, scope : this}
			},
			'scrum-backlog scrum-userstory-card' : {
				activate : { fn : function(card){
					this.activeTab = card;
				}, scope : this}
			},
			//bindings for backlog overview
			'scrum-userstory-backlog-overview' : {
				itemclick : { fn : this.showUserstoryProfile, scope : this},
				onCompleteEditStatus : { fn : this.changeUserStoryStatus, scope : this}
			}, 
			'scrum-userstory-backlog-overview gridview' : {
				detachFromSprint : { fn : this.detachFromSprint, scope : this}
			},
			'scrum-userstory-create-form button[action=submit]' : {
				click : { fn : this.submitUserstoryCreateForm, scope : this}
			},
			'scrum-userstory-create-form tool[action=close]' : {
				click : { fn : function(){
					this.grid.fireEvent('itemclick', this.grid);
				}, scope : this}
			},
			'scrum-userstory-backlog-overview tool[action=create]' : {
				click : { fn : this.showUserstoryCreateForm , scope : this}
			},
			'scrum-userstory-backlog-overview tool[action=refresh]'	: {
				click : { fn : this.onRefreshBacklogGrid, scope : this }
			},
			//bindings for sprint overview
			'scrum-userstory-sprint-overview' : {
				itemClick : { fn : this.showUserstoryProfile, scope : this},
				onCompleteEditStatus : { fn : this.changeUserStoryStatus, scope : this}
			},
			'scrum-userstory-sprint-overview combobox[action=get_sprints]' : {
				expand : { fn : this.loadSprintList, scope : this},
				select : { fn : function(combobox, record){
					this.activeSprint = record[0];
					this.drawGrid(this.sprintlogGrid, this.getSprintlogStore(), { redraw : true});
				}, scope : this}
			},
			'scrum-userstory-sprint-overview gridview' : {
				attachToSprint : { fn : this.attachToSprint, scope : this}
			},
			'scrum-userstory-sprint-overview tool[action=refresh]' : {
				click : { fn : this.onRefreshSprintlogGrid, scope : this}
			}
		});
	},
	setComponents : function(backlog){
		var backlogStore = this.backlogStore;
		var sprintlogStore = this.sprintlogStore;

		this.backlog = backlog;
		this.backlogGrid = backlog.down('scrum-userstory-backlog-overview');
		this.sprintlogGrid = backlog.down('scrum-userstory-sprint-overview');

		this.createForm = backlog.down('scrum-userstory-create-form');
		this.rightPart = backlog.down('scrum-backlog-right-part');
		this.commentPanel = backlog.down('scrum-commentpanel');
		this.profile = backlog.down('#profile');

		backlogStore.addListener('beforeload', function(store, options){
			 store.proxy.extraParams = { fromBacklog: true, project_id: this.project.get('id') };
		}, this);
		sprintlogStore.addListener('beforeload', function(store, options){
			var activeSprint = this.activeSprint;
			if (!activeSprint || !activeSprint.id){
				this.sprintlogGrid.setLoading(false);
				return false;
			}
			store.proxy.extraParams = { sprint_id : activeSprint.id };
		}, this);
		this.backlogStore.addListener('load', this.onLoadBacklog, this);
		this.backlogGrid.reconfigure(backlogStore);
		this.sprintlogGrid.reconfigure(sprintlogStore);
		this.sprintlogGrid.down('comboxbox[action=get_sprints]').bindStore(this.getSprintsStore());
	},
	onRefreshBacklogGrid : function(tool){
		this.drawGrid(tool.up('grid'), this.getBacklogStore(), { redraw : true});
	},
	onRefreshSprintlogGrid : function(tool){
		this.drawGrid(tool.up('grid'), this.getSprintlogStore(), { redraw : true});
	},
	/*showUserstoryOverview : function(){
		var overview = this.overview;
		overview.layout.setActiveItem('scrum-userstory-grid');
	},*/
	showUserstoryCreateForm : function(){
		var form = this.rightPart.layout.setActiveItem('scrum-userstory-create-form');
		var project = this.project;

		form.down('hiddenfield[name=project_id]').setRawValue(project.get('id'));
		form.down('statusbar').hide();
	},
	showSprintCreateForm : function(){
		var form = this.rightPart.layout.setActiveItem('scrum-sprint-create-form');
		var project = this.project;

		form.down('hiddenfield[name=project_id]').setRawValue(project.get('id'));
		form.down('statusbar').hide();
	},
	submitUserstoryCreateForm : function(button){
		var backlog = this.backlog;
		var project = this.project;
		var grid = this.backlogGrid;
		var form = this.createForm.getForm();
		var backlogStore = this.getBacklogStore();
		var statusBar = form.owner.down('statusbar');

		if (form.isValid()){
			form.owner.setLoading({ msg : 'Please wait...'});
			form.submit({
				scope : this,
				success : function(form, action){
					var userstory = Ext.create('Scrum.model.UserStory');
					var continueCreateCheckbox = form.owner.down('checkbox[action=continue_create]'); 
					var continueCreate;

					userstory.set(form.getValues());
					userstory.setId(action.result.userstory.id);
					userstory.set('update_time', action.result.userstory.update_time);
					userstory.set('status', action.result.userstory.status);
					backlogStore.add(userstory);			

					form.owner.setLoading(false);
					continueCreate = continueCreateCheckbox.getRawValue();
					form.reset();
					if (continueCreate){
						form.owner.onSuccessfulCreation(userstory);
						form.owner.down('hiddenfield[name=project_id]').setRawValue(project.get('id'));
					}
					else {
						statusBar.hide();
						grid.fireEvent('itemclick', grid, userstory);	
					}
					
					form.owner.down('checkbox[action=continue_create]').setRawValue(continueCreate);
				}
			})
		}
		else {
			form.owner.onInvalidFields();
		}
	},
	showUserstoryProfile : function(grid, userstory){
		var backlog = this.backlog;
		var rightPart = this.rightPart;
		var tabPanel = rightPart.down('#scrum-userstory-tabpanel');
		var profileTab;
		var profile, comments;

		rightPart.layout.setActiveItem('scrum-userstory-tabpanel');
		tabPanel.layout.setActiveItem('empty-panel');
		if (userstory instanceof Scrum.model.UserStory)
			this.getController('userstory.UserStoryProfile').setUserstory(userstory);

		if (!this.activeTab || this.activeTab.itemId == 'profile'){
			tabPanel.layout.setActiveItem('profile');	

			profileTab = tabPanel.down('header').down('#profile-tab');
			profileTab.setText('Profile');
		}
		else if (this.activeTab.itemId == 'comments'){
			comments = tabPanel.layout.setActiveItem('comments');
		}
	},
	changeUserStoryStatus : function(grid, event){
		var record = event.record;
		var oldStatus = event.oldStatus.value;
		var newStatus = event.newStatus.value;

		record.save({
			url : '/userstories/changeStatus',
			params : { id : record.get('id') , oldStatus: oldStatus, newStatus : newStatus}
		});
	},
	detachFromSprint : function(model){
		model.save({
			url : '/userstories/changeSprint',
			params : { id : model.get('id'), detach : true},
			scope : this,
			callback : function(record, op){
				return true;
			}
		})
	},
	attachToSprint : function(model, sprint){
		model.save({
			url : '/userstories/changeSprint', 
			params : { id: model.get('id'), sprint_id : sprint.id },
			scope : this,
			callback : function(record, op){
				return true;
			}
		})
	},
	loadSprints : function(combobox){
		var store = this.getSprintsStore();
		if (!store.count()){
			combobox.setLoading({ msg : 'Loading...'});
			store.load({
				params : { project_id : this.project.get('id')}
			})
		}
	},
	drawGrid : function(grid, store, options){
		var paging;
		var partially,redraw;

		options = options || {};
		partially = options.partially;
		redraw = options.redraw;

		if (Ext.isEmpty(partially)){
			grid.setLoading({ msg : 'Refresh...'});
			if (redraw){
				store.reload({
					callback : function(){
						grid.setLoading(false);
					},
					scope : this
				});	
			}
			else {
				paging = grid.getDockedComponent('paging-toolbar');
				paging.bind(store);	
				store.loadPage(1, {
					scope : this,
					callback : function(){
						grid.setLoading(false);
					}
				});	
			}	
		}
		else {
			grid.reconfigure(store);
		}
	},
	onLoadBacklog : function(store){
		if (store.count()){
			this.backlogGrid.fireEvent('itemclick', this.backlogGrid, store.getAt(0));
		}
		else {
			this.showUserstoryCreateForm();
		}
	}
});