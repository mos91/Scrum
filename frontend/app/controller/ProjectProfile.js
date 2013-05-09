Ext.define('Scrum.controller.ProjectProfile', {
	extend : 'Ext.app.Controller', 
	views : ['project.Profile'],
	stores : ['project.Comments'],
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
			'.scrum-projectform button[action=submit]' : {
				click : { fn : this.submitProjectForm, scope : this}
			},
			'scrum-commentpanel'  : {
				activate : { fn : this.startDrawComments, scope : this}
			},
			'scrum-commentpanel button[action=submit]' : {
				click : { fn : this.submitCommentForm, scope : this}
			},
			'scrum-projectsummary' : {
				activate : { fn : this.fillProjectSummary, scope : this}
			}
		});
	},
	setDropdown : function(dropdown){
		this.dropdown = dropdown;
	},
	setProjectProfile : function(profile){
		this.profile = profile;
	},
	fillProjectProfile : function(project){
		var profile = this.profile;
		var form = profile.down('scrum-projectform > form');
		this.project = project;
		profile.down('panel').update(project.getData());
		profile.down('tabpanel').layout.setActiveItem(profile.down('scrum-projectform'));

		form.loadRecord(project);
		form.down('hiddenfield[name=id]').setRawValue(project.get('id'));
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
	drawComments : function(commentPanel, comments){
		var project = this.project;
		var commentsList = commentPanel.down('dataview');

		commentsList.bindStore(comments);
		comments.load({
			params : { id : project.get('id')},
			callback : function(records){
				comments.sort({ property : 'post_date', direction : 'DESC'});
				commentsList.refresh();		
			},
			scope : this
		});
	},
	redrawComments : function(commentPanel, comments){
		var project = this.project;
		var commentsList = commentPanel.down('dataview');
		
		comments.reload({
			params : { id : project.get('id')},
			callback : function(records){
				comments.sort({ property : 'post_date', direction : 'DESC'});
				commentsList.refresh();
			},
			scope : this
		});
	},
	startDrawComments : function(commentPanel){
		var project = this.project;
		var comments = this.getStore('project.Comments');
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
			this.redrawComments(commentPanel, comments);
		}
	},
	submitProjectForm : function(button){
		var dropdown = this.dropdown;
		var profile = this.profile;
		var form = button.up('form').getForm();
		var favoriteProjects = Ext.StoreManager.lookup('FavoriteProjects');
		var projectCard = profile.down('panel');

		if (form.isValid()){
			projectCard.setLoading({ msg : 'Please wait...'});
			form.owner.setLoading({ msg : 'Please wait...'});
			form.submit({
				success : function(form, action){
					var id = action.result.project.id;
					var project = favoriteProjects.findRecord('id', id);
					var values = form.getValues();

					project.set(values);
					projectCard.update(values);

					dropdown.setText(values.name);
					dropdown.menu.down('menuitem[projectId=' + id + ']').setText(values.name);

					projectCard.setLoading(false);
					form.owner.setLoading(false);
				}
			})
		}
	},
	/*highLightAddedComment : function(record, index, node){
		var profile = this.profile;

		profile.down('scrum-commentpanel > dataview').highlightItem(node);
	},*/
	submitCommentForm : function(button){
		var commentPanel = button.up('scrum-commentpanel');
		var form = button.up('form').getForm();
		var comments = this.getStore('project.Comments');
		var stateProvider = Ext.state.Manager.getProvider();

		if (form.isValid()){
			form.owner.setLoading({msg : 'Please wait...'});
			form.submit({
				success : function(form, action){
					var commentsList = commentPanel.down('dataview');
					var id = action.result.comment.id;
					var post_date = action.result.comment.post_date;

					var comment = Ext.create('Scrum.model.project.Comment', {
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