Ext.define('Scrum.controller.Backlog', {
	extend : 'Ext.app.Controller', 
	views : ['userstory.Overview'],
	stores : ['Userstories'],
	models : ['UserStory'],
	init : function(){
		this.control({
			'scrum-userstory-overview' : {
				viewBacklog : { fn : this.drawUserstoryOverview, scope : this },
				render : { fn : this.setOverview ,  scope : this}
			},
			'scrum-userstory-overview grid' : {
				itemclick : { fn : this.showUserstoryProfile, scope : this}
			}, 
			'scrum-userstory-overview tool[action=create]' : {
				click : { fn : this.showUserstoryCreateForm , scope : this}
			},
			'scrum-userstory-overview tool[action=grid]' : {
				click : { fn : this.showUserstoryOverview, scope : this}
			},
			'scrum-userstory-overview tool[action=refresh]'	: {
				click : { fn : this.onRefreshClick, scope : this }
			},
			'scrum-userstory-create-form button[action=submit]' : {
				click : { fn : this.submitUserstoryCreateForm, scope : this}
			}
		});
	},
	setOverview : function(overview){
		this.overview = overview;
		this.userstoryCard = overview.down('scrum-userstory-card');
		this.leftPanel = overview.down('panel');
	},
	onRefreshClick : function(){
		this.drawUserstoryOverview(null, { redraw : true});
	},
	showUserstoryOverview : function(){
		var leftPanel = this.leftPanel;
		//var form = leftPanel.down('form');

		//form.getForm().reset();
		leftPanel.layout.setActiveItem('scrum-userstory-grid');
		//leftPanel.tools.table.hide();
		//leftPanel.tools.plus.show();
	},
	showUserstoryCreateForm : function(){
		var userstoryCard = this.userstoryCard;
		//var leftPanel = this.leftPanel;
		var form = userstoryCard.layout.setActiveItem('scrum-userstory-create-form');
		var project = this.project;
		var profileTab = this.overview.down('tabpanel > header').down(0);

		form.down('hiddenfield[name=project_id]').setRawValue(project.get('id'));
		form.down('statusbar').hide();
		profileTab.setText('Create userstory');
	},
	showUserstoryProfile : function(grid, record){
		var card = this.userstoryCard;
		var rightTabPanel = this.overview.down('tabpanel');
		var profileTab;

		rightTabPanel.layout.setActiveItem('profile');
		profileTab = rightTabPanel.down('header').down(0);
		profileTab.setText('Profile');
		card.layout.setActiveItem(0);
		card.down('panel').update(record.getData());
	},
	submitUserstoryCreateForm : function(button){
		var leftPanel = this.leftPanel;
		var userstoryCard = this.userstoryCard;
		var grid = leftPanel.down('grid');
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

					userstory.set(form.getValues());
					userstory.setId(action.result.userstory.id);
					userstory.set('update_time', action.result.userstory.update_time);
					userstories.add(userstory);			
					grid.reconfigure(userstories);

					form.owner.setLoading(false);
					if (continueCreateCheckbox.getRawValue()){
						form.owner.onSuccessfulCreation(userstory);
					}
					else {
						statusBar.hide();
						grid.fireEvent('itemclick', grid, userstory);	
					}
					form.reset();
				}
			})
		}
		else {
			form.owner.onInvalidFields();
		}
	},
	drawUserstoryOverview : function(project, options){
		var fn;
		var store = this.getUserstoriesStore();
		var grid = this.overview.down('grid');
		var userstoryCard = this.overview.down('scrum-userstory-card');

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
				open : true
			},
			callback : function(records){
				if (store.count()){
					grid.fireEvent('itemclick', grid, store.getAt(0));
				}
				else {
					userstoryCard.layout.setActiveItem('scrum-userstory-create-form');
				}

				grid.reconfigure(store);
				grid.setLoading(false);
			}
		}])
	}
});