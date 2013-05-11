Ext.define('Scrum.controller.ProjectProfile', {
	extend : 'Ext.app.Controller', 
	views : ['project.Profile'],
	stores : ['Comments'],
	models : ['Project','BacklogSummary', 'SprintSummary'],
	init : function(){
		this.control({
			'scrum-projects-dropdown' : {
				render : {fn : this.setDropdown, scope : this}
			},
			'scrum-projectprofile' : {
				render : {fn : this.setProjectProfile , scope : this},
				viewProject : { fn : this.fillProjectProfile, scope : this}
			},
			'scrum-projectprofile tool[action=edit]' : {
				click : { fn : this.showProjectForm, scope : this}
			},
			'scrum-projectprofile tool[action=refresh]' : {
				click : { fn : this.refreshProjectProfile, scope : this} 
			},
			'scrum-projectprofile tool[action=view]' : {
				click : { fn : this.hideProjectForm, scope : this}
			},
			'scrum-projectform button[action=submit]' : {
				click : { fn : this.submitProjectForm, scope : this}
			},
			'scrum-commentpanel'  : {
				activate : { fn : this.startDrawComments, scope : this}
			},
			'scrum-commentpanel button[action=submit]' : {
				click : { fn : this.submitCommentForm, scope : this}
			}
		});
	},
	setDropdown : function(dropdown){
		this.dropdown = dropdown;
	},
	setProjectProfile : function(profile){
		this.profile = profile;
	},
	//TODO : complete refreshProjectProfile
	refreshProjectProfile : function(){
		return true;
	},
	fillProjectProfile : function(project){
		var profile = this.profile;
		var summary = profile.down('scrum-projectsummary');
		var descriptionPanel = profile.down('panel');

		this.project = project;
		descriptionPanel.down('panel').update(project.getData());
		descriptionPanel.layout.setActiveItem(0);
		profile.down('tabpanel').layout.setActiveItem(0);
		
		this.fillProjectSummary(summary);
	},
	fillProjectSummary : function(summary){
		var project = this.project;
		var backlogSummaryGroup,sprintSummaryGroup;
		var backlogSummary = this.getBacklogSummaryModel();
		var sprintSummary = this.getSprintSummaryModel();

		backlogSummaryGroup = summary.down('#backlogSummary');
		sprintSummaryGroup = summary.down('#sprintSummary')

		backlogSummary.load(project.get('id'),{
			callback : function(record){
				backlogSummaryGroup.fill(record);
			}
		});

		if (project.get('active_sprint_id')){
			sprintSummary.load(project.get('active_sprint_id'),{
				callback : function(record){
					sprintSummaryGroup.fill(record);	
				}
			});	
		}
		else {
			sprintSummaryGroup.hide();
		}
	},
	//NOTE : replace to CommentPanel class
	drawComments : function(commentPanel, comments, options){
		var project = this.project;
		var commentsList = commentPanel.down('dataview');
		var fn;

		if (options && options.redraw){
			fn = 'reload';
		}
		else {
			commentsList.bindStore(comments);	
			fn = 'load';
		}

		comments[fn].apply(comments, [
			{
				url : '/project/get?comments=1',
				params : { id : project.get('id')},
				callback : function(records){
					comments.sort({ property : 'post_date', direction : 'DESC'});
					commentsList.refresh();		
				},
				scope : this
			}
		]);
	},
	startDrawComments : function(commentPanel){
		var project = this.project;
		var comments = this.getStore('Comments');
		var commentForm = commentPanel.down('form');
		var commentScopeId;

		if (comments.lastOptions && comments.lastOptions.params){
			commentScopeId = comments.lastOptions.params.id;
		}

		commentForm.down('hiddenfield[name=author_id]').setRawValue(Ext.state.Manager.getProvider().get('user-id'));
		commentForm.down('hiddenfield[name=project_id]').setRawValue(project.get('id'));
		if (!commentScopeId){
			this.drawComments(commentPanel, comments);
		}
		else {
			this.drawComments(commentPanel, comments, {redraw : true});
		}
	},
	showProjectForm : function(tool){
		var descriptionPanel = tool.up('panel');
		var project = this.project;
		var form = descriptionPanel.layout.setActiveItem(1);
		
		form.loadRecord(project);
		descriptionPanel.tools.edit.hide();
		descriptionPanel.tools.profile.show();
		form.down('hiddenfield[name=id]').setRawValue(project.get('id'));
	},
	hideProjectForm : function(tool){
		var descriptionPanel = tool.up('panel');
		descriptionPanel.tools.edit.show();
		descriptionPanel.tools.profile.hide();

		descriptionPanel.layout.setActiveItem(0);
	},
	submitProjectForm : function(button){
		var dropdown = this.dropdown;
		var profile = this.profile;
		var form = button.up('form').getForm();
		var projects = Ext.StoreManager.lookup('Projects');
		var descriptionPanel = profile.down('panel');
		var profileTool = descriptionPanel.tools.profile;

		if (form.isValid()){
			form.owner.setLoading({ msg : 'Please wait...'});
			form.submit({
				scope : this,
				success : function(form, action){
					var id = action.result.project.id;
					var updateTime = action.result.project.update_time;
					var project = projects.findRecord('id', id);
					var values = form.getValues();

					values['update_time'] = updateTime;
					project.set(values);
				
					descriptionPanel.down('panel').update(project.getData());
					dropdown.menu.down('menuitem[projectId=' + id + ']').setText(values.name);

					//form.reset(true);
					form.owner.setLoading(false);					
					profileTool.fireEvent('click', profileTool);
				}
			})
		}
	},
	submitCommentForm : function(button){
		var commentPanel = button.up('scrum-commentpanel');
		var form = button.up('form').getForm();
		var comments = this.getStore('Comments');
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
})