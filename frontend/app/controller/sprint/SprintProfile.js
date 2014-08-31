Ext.define('Scrum.controller.sprint.SprintProfile', {
	extend: 'Ext.app.Controller',
	id : 'SprintProfile',
	requires : [
		'Scrum.store.Comments'
	],
    views: [
        'sprint.SprintManager'
    ],
    models : ['Sprint','SprintSummary'],
    getCommentsStore : function(storeId){
		return Ext.StoreManager.lookup('SprintComments');
	},
	getBurndownStatisticsStore : function(){
		return Ext.StoreManager.lookup('BurndownStatistic');
	},
    init : function(){
    	Ext.StoreManager.register(Ext.create('Scrum.store.sprint.BurndownStatistic',{
    		storeId : 'BurndownStatistic'
    	}));
    	Ext.StoreManager.register(Ext.create('Scrum.store.Comments', {
			storeId : 'SprintComments'
		}));

		this.control({
			'scrum-sprint-manager' : {
				render : { fn : this.setComponents ,  scope : this}
			},
			'scrum-sprint-card tool[action=refresh]' : {
				click : { fn : this.onRefreshProfileClick, scope : this}
			},
			'scrum-sprint-card tool[action=edit]' : {
				click : { fn : this.showSprintEditForm , scope : this}
			},
			'scrum-sprint-edit-form button[action=submit]' : {
				click : { fn : this.submitSprintForm, scope : this}
			},
			'scrum-sprint-edit-form tool[action=close]' : {
				click : { fn : this.closeSprintForm, scope : this}
			},
			'scrum-sprint-manager scrum-sprint-card' : {
				activate : { fn : this.drawSprintProfile, scope : this}
			},
			'scrum-sprint-manager scrum-commentpanel'  : {
				activate : { fn : this.startDrawComments, scope : this}
			},
			'scrum-sprint-manager scrum-sprint-summary' : {
				activate : { fn : this.drawSprintSummary, scope : this}
			},
			'scrum-sprint-manager #burndown' : {
				activate : { fn : this.drawSprintBurndown, scope : this}
			},
			'scrum-sprint-manager scrum-commentpanel button[action=submit]' : {
				click : { fn : this.submitCommentForm , scope : this}
			}
		});
    },
    setComponents : function(sprintManager){
    	this.sprintManager = sprintManager;
		this.sprintCard = sprintManager.down('scrum-sprint-card');
		this.sprintSummaryPanel = sprintManager.down('scrum-sprint-summary');
		this.commentPanel = sprintManager.down('scrum-commentpanel');
		this.burndownChart = this.sprintManager.down('scrum-sprint-burndown-chart');

		this.burndownChart.bindStore(this.getBurndownStatisticsStore());
    },
    setSprint : function(sprint){
		this.sprint = sprint;
	},
	closeSprintForm : function(){
		this.sprintCard.layout.setActiveItem('scrum-sprint-profile');
	},
	onRefreshProfileClick : function(){
		var sprint = this.getModel('Sprint');
		var profile = this.sprintCard.down('#scrum-sprint-profile');

		profile.setLoading({ msg : 'Loading...'});
		Scrum.model.Sprint.load(this.sprint.get('id'), {
			url : '/sprints/get',
			success : function(record, op){
				this.sprint.set(record.getData());
				profile.setLoading(false);
				this.drawSprintProfile();
			},
			scope : this
		})
	},
	showSprintEditForm : function(){
		var card = this.sprintCard;
		var rightTabPanel = this.sprintManager.down('tabpanel');
		var profileTab = rightTabPanel.down('header').down('#profile-tab');
		var form = card.layout.setActiveItem('scrum-sprint-edit-form');

		form.getForm().reset();
		form.down('hiddenfield[name=id]').setRawValue(this.sprint.get('id'));
		form.down('statusbar').hide();
		profileTab.setText('Edit');
		form.loadRecord(this.sprint); 
	},
	submitSprintForm : function(button){
		var sprintManager = this.sprintManager;
		var form = this.sprintCard.down('scrum-sprint-edit-form').getForm();

		if (form.isValid()){
			form.owner.setLoading({ msg : 'Please wait...'});
			form.submit({
				scope : this,
				success : function(form, action){
					var id = action.result.sprint.id;
					var updateTime = action.result.sprint.update_time;
					var sprint = this.sprint;
					var values = form.getValues();

					values['update_time'] = updateTime;
					sprint.set(values);
				
					form.owner.setLoading(false);
					this.drawSprintProfile();				
				}
			})
		}
		else {
			form.owner.onInvalidFields();
		}
	},
	drawSprintProfile : function(card){
		if (!card)
			card = this.sprintCard;

		card.layout.setActiveItem('scrum-sprint-profile');
		card.down('panel').update(this.sprint.getData());
	},
	drawSprintSummary : function(summary){
		var sprint = this.sprint;
		var sprintSummary = this.getSprintSummaryModel();
		var sprintSummaryPanel = this.sprintSummaryPanel;

		sprintSummary.load(sprint.get('id'),{
			callback : function(record){
				sprintSummaryPanel.fill(record);	
			}
		});
	},
	drawSprintBurndown : function(){
		var sprint = this.sprint;
		var burndownStatistic = this.getBurndownStatisticsStore();

		burndownStatistic.load({
			params : { id : sprint.get('id')},
			callback : function(records, op){
				this.burndownChart.redraw();
			},
			scope : this
		})
	},
	drawComments : function(comments, options){
		var sprint = this.sprint;
		var commentsList = this.commentPanel.down('dataview');
		var fn;

		if (options && options.redraw){
			fn = 'reload';
		}
		else {
			commentsList.bindStore(comments);	
			fn = 'load';
		}

		comments[fn].apply(comments, [{
			params : { sprint_id : sprint.get('id')},
			callback : function(records){
				comments.sort({ property : 'post_date', direction : 'DESC'});
				commentsList.refresh();		
			},
			scope : this
		}]);
	},
	startDrawComments : function(commentPanel){
		var comments = this.getCommentsStore();
		var commentForm = this.commentPanel.down('form');
		var commentScopeId;
		var options;

		if (comments.lastOptions && comments.lastOptions.params){
			options = { redraw : true};
		}
	
		commentForm.down('hiddenfield[name=author_id]').setRawValue(Ext.state.Manager.getProvider().get('user-id'));
		commentForm.down('hiddenfield[name=sprint_id]').setRawValue(this.sprint.get('id'));
		this.drawComments(comments, options);
	},
	submitCommentForm : function(button){
		var commentPanel = button.up('scrum-commentpanel');
		var form = button.up('form').getForm();
		var comments = this.getCommentsStore();
		var stateProvider = Ext.state.Manager.getProvider();

		if (form.isValid()){
			form.owner.setLoading({msg : 'Please wait...'});
			form.submit({
				success : function(form, action){
					var commentsList = commentPanel.down('dataview');
					var id = action.result.comment.id;
					var post_date = action.result.comment.post_date;

					var comment = Ext.create('Scrum.model.Comment', {
						id : id,
						author : stateProvider.get('firstname') + ' ' + stateProvider.get('lastname'),
						content : form.owner.down('textarea[name=content]').getRawValue(),
						post_date : post_date
					});
					
					comments.add(comment);
					commentsList.refresh();

					form.owner.down('textarea[name=content]').reset();
					form.owner.setLoading(false);
				},
				failure : function(){
					console.log('comment adding error');
				},
				scope : this
			})
		}
	}
});