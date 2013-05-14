Ext.define('Scrum.controller.Backlog', {
	id : 'backlogController',
	extend : 'Ext.app.Controller', 
	views : ['userstory.Backlog'],
	stores : ['Userstories'],
	models : ['UserStory'],
	init : function(){
		this.control({
			'scrum-backlog' : {
				viewBacklog : { fn : function(project){
					this.drawBacklogOverview(project);
					this.backlog.fireEvent('viewSprint');
					this.backlog.fireEvent('viewUserStoryProfile');
				}, scope : this },
				render : { fn : this.setComponents ,  scope : this}
			},
			'scrum-userstory-backlog-overview' : {
				itemclick : { fn : this.showUserstoryProfile, scope : this},
				onCompleteEditStatus : { fn : this.changeUserStoryStatus, scope : this}
			}, 
			'scrum-userstory-overview gridview' : {
				detachFromSprint : { fn : this.detachFromSprint, scope : this}
			},
			'scrum-userstory-overview tool[action=create]' : {
				click : { fn : this.showUserstoryCreateForm , scope : this}
			},
			'scrum-userstory-overview tool[action=refresh]'	: {
				click : { fn : this.onRefreshGridClick, scope : this }
			}
		});
	},
	setComponents : function(backlog){
		this.backlog = backlog;
		this.grid = backlog.down('scrum-userstory-backlog-overview');
	},
	onRefreshGridClick : function(){
		this.drawBacklog(null, { redraw : true});
	},
	showUserstoryOverview : function(){
		var overview = this.overview;
		overview.layout.setActiveItem('scrum-userstory-grid');
	},
	showUserstoryCreateForm : function(){
		var userstoryCard = this.userstoryCard;
		var form = userstoryCard.layout.setActiveItem('scrum-userstory-create-form');
		var profileTab = this.backlog.down('tabpanel > header').down(0);
		var project = this.project;

		form.down('hiddenfield[name=project_id]').setRawValue(project.get('id'));
		form.down('statusbar').hide();
		profileTab.setText('Create userstory');
	},
	showUserstoryProfile : function(grid, record){
		var card = this.userstoryCard;
		var rightTabPanel = this.backlog.down('tabpanel');
		var profileTab;

		rightTabPanel.layout.setActiveItem('profile');
		profileTab = rightTabPanel.down('header').down(0);
		profileTab.setText('Profile');
		card.layout.setActiveItem(0);

		userstoryController = this.getController('userstoryController');
		userstoryController.fireEvent('viewProfile', record);
		//card.down('panel').update(record.getData());

		//this.userstory = record;
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
	drawBacklogOverview : function(project, options){
		var backlog = this.backlog;
		var store = this.getUserstoriesStore();
		var grid = this.backlogGrid;

		options = options || {};
		partially = options.partially;
		if (project)
			this.project = project;
	
		if (Ext.isEmpty(partially)){
			this.fullRedrawBacklog(options)	
		}
		else {
			grid.reconfigure(store);
		}
	},
	fullRedrawBacklog : function(options){
		var grid = this.grid;
		var store = this.getUserstoriesStore();
		//var userstoryCard = this.userstoryCard;
		var fn;
		var redraw;

		options = (options)? options : {};
		if (redraw = options.redraw){
			fn = 'reload';
		}
		else {
			fn = 'load';
		}

		grid.setLoading({ msg : 'Refresh...'});
		store[fn].apply(store,[{
			url : '/userstories/get',
			params : {
				project_id : this.project.get('id'),
				fromBacklog : true
			},
			scope : this,
			callback : function(records){
				grid.setLoading(false);	
				grid.reconfigure(store);

				if (Ext.isEmpty(redraw)){
					if (store.count()){
						grid.fireEvent('itemclick', grid, store.getAt(0));	
					}
					else {
						this.showUserstoryCreateForm();
						userstoryCard.down('scrum-userstory-create-form tool[action=close]').hide();	
					}	
				}
			}
		}])
	}
});