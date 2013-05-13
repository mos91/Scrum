Ext.define('Scrum.controller.Backlog', {
	extend : 'Ext.app.Controller', 
	views : ['userstory.Backlog'],
	stores : ['Userstories'],
	models : ['UserStory'],
	init : function(){
		this.control({
			'scrum-backlog' : {
				viewBacklog : { fn : this.drawBacklog, scope : this },
				render : { fn : this.setBacklog ,  scope : this}
			},
			'scrum-userstory-overview grid' : {
				itemclick : { fn : this.showUserstoryProfile, scope : this},
				onCompleteEditStatus : { fn : this.changeUserStoryStatus, scope : this}
			}, 
			'scrum-userstory-overview tool[action=create]' : {
				click : { fn : this.showUserstoryCreateForm , scope : this}
			},
			'scrum-userstory-overview tool[action=refresh]'	: {
				click : { fn : this.onRefreshGridClick, scope : this }
			},
			'scrum-userstory-card tool[action=refresh]' : {
				click : { fn : this.onRefreshProfileClick, scope : this}
			},
			'scrum-userstory-card tool[action=edit]' : {
				click : { fn : this.showUserStoryEditForm , scope : this}
			},
			'scrum-userstory-create-form button[action=submit]' : {
				click : { fn : this.submitUserstoryCreateForm, scope : this}
			},
			'scrum-userstory-create-form tool[action=close]' : {
				click : { fn : this.closeUserStoryForm, scope : this}
			},
			'scrum-userstory-edit-form button[action=submit]' : {
				click : { fn : this.submitUserstoryEditForm, scope : this}
			},
			'scrum-userstory-edit-form tool[action=close]' : {
				click : { fn : this.closeUserStoryForm, scope : this}
			}
		});
	},
	setBacklog : function(backlog){
		this.backlog = backlog;
		this.userstoryCard = backlog.down('scrum-userstory-card');
		this.overview = backlog.down('scrum-userstory-overview');
	},
	onRefreshGridClick : function(){
		this.drawBacklog(null, { redraw : true});
	},
	onRefreshProfileClick : function(){
		var userstory = this.getModel('UserStory');
		var currentUserStory = this.userstory;
		var profile = this.userstoryCard.down('panel');
		var userstories = this.getUserstoriesStore();

		profile.setLoading({ msg : 'Loading...'});
		Scrum.model.UserStory.load(currentUserStory.get('id'), {
			url : '/userstories/get',
			success : function(record, op){
				this.userstory.set(record.getData());
				profile.setLoading(false);
				this.showUserstoryProfile(null, this.userstory);
			},
			scope : this
		})
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
	showUserStoryEditForm : function(){
		var card = this.userstoryCard;
		var rightTabPanel = this.backlog.down('tabpanel');
		var profileTab = rightTabPanel.down('header').down(0);
		var form = card.layout.setActiveItem('scrum-userstory-edit-form');
		var project = this.project;

		form.down('hiddenfield[name=id]').setRawValue(this.userstory.get('id'));
		form.down('statusbar').hide();
		profileTab.setText('Edit');
		form.loadRecord(this.userstory); 
	},
	closeUserStoryForm : function(){
		var grid = this.overview.down('grid');

		grid.fireEvent('itemclick', grid, this.userstory);
	},
	showUserstoryProfile : function(grid, record){
		var card = this.userstoryCard;
		var rightTabPanel = this.backlog.down('tabpanel');
		var profileTab;

		rightTabPanel.layout.setActiveItem('profile');
		profileTab = rightTabPanel.down('header').down(0);
		profileTab.setText('Profile');
		card.layout.setActiveItem(0);
		card.down('panel').update(record.getData());

		this.userstory = record;
	},
	submitUserstoryCreateForm : function(button){
		var overview = this.overview;
		var userstoryCard = this.userstoryCard;
		var grid = overview.down('grid');
		var form = this.userstoryCard.down('form').getForm();
		var userstories = this.getUserstoriesStore();
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
					userstories.add(userstory);			
					grid.reconfigure(userstories);

					form.owner.setLoading(false);
					if (continueCreate = continueCreateCheckbox.getRawValue()){
						form.owner.onSuccessfulCreation(userstory);
					}
					else {
						statusBar.hide();
						grid.fireEvent('itemclick', grid, userstory);	
					}

					form.reset();
					form.owner.down('checkbox[action=continue_create]').setRawValue(continueCreate);
				}
			})
		}
		else {
			form.owner.onInvalidFields();
		}
	},
	submitUserstoryEditForm : function(button){
		var userstories = this.getUserstoriesStore();
		var grid = this.overview.down('grid');
		var form = this.userstoryCard.down('scrum-userstory-edit-form').getForm();

		if (form.isValid()){
			form.owner.setLoading({ msg : 'Please wait...'});
			form.submit({
				scope : this,
				success : function(form, action){
					var id = action.result.userstory.id;
					var updateTime = action.result.userstory.update_time;
					var userstory = userstories.findRecord('id', id);
					var values = form.getValues();

					values['update_time'] = updateTime;
					userstory.set(values);
				
					form.owner.setLoading(false);
					grid.fireEvent('itemclick', grid, userstory);					
				}
			})
		}
		else {
			form.owner.onInvalidFields();
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
	drawBacklog : function(project, options){
		var fn;
		var store = this.getUserstoriesStore();
		var grid = this.overview.down('grid');
		var userstoryCard = this.userstoryCard;

		if (project)
			this.project = project;
		if (options.redraw){
			fn = 'reload';
		}
		else {
			fn = 'load';
		}

		grid.setLoading({ msg : 'Refresh...'});
		store[fn].apply(store,[{
			url : '/userstories/get' ,
			params : {
				project_id : this.project.get('id'),
				all : true
			},
			scope : this,
			callback : function(records){
				store.group({ property : 'sprint', 
					//fix : as i can't find how to group by nested fields in objects, i replace 'sprint' object field
					//by 'nested sprint.name' field
					transform : function(value){
						if (Ext.isObject(value)){
							value = value.name;
						}
					}
				});
				if (store.count()){
					grid.fireEvent('itemclick', grid, store.getAt(0));
				}
				else {
					this.showUserstoryCreateForm();
					userstoryCard.down('scrum-userstory-create-form tool[action=close]').hide();
				}

				grid.reconfigure(store);
				grid.setLoading(false);
			}
		}])
	}
});