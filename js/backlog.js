BacklogPage = MVCComponent.extend({
	attach : function(app){
		var behaviour;
		if (!app || !(app instanceof MVCApplication))
			return;

		app.setModels({
			'new_user_stories' : new Backbone.Collection(),
			'accepted_user_stories' : new Backbone.Collection()
		});

		app.setRouters({
			'BacklogRouter' : new BacklogRouter()
		});

		app.setViews({
			'userstoryEditPopup' : new PopupForm({  
				url : '/userstories/update',
				id: 'userstory_edit_popup',
				title : 'User Story Edit'
			}), 
			'userstoryCreatePopup' : new PopupForm({
				url : '/userstories/create',
				id  :  'project_create_popup',
				title : 'User story Create'
			}),
			'inlineActionForNewUserStories' : new InlineDropdown({
				dropdownTitle : 'Actions',
				embedTo : 'td:last',
				delegateTo : 'tr.active-row',
				triggerOn:'#new_userstories_table', 
				items : [
					{ href : function(triggenOn){ return '#userstories/accept' + $(triggerOn).data('id');}, 
							title : 'Accept', icon : 'icon-ok'},
					{ href:function(triggerOn){ return '#userstories/edit/' + $(triggerOn).data('id');}, 
							title:'Edit', icon:'icon-pencil'}, 
				    { href:function(triggerOn){ return '#userstories/drop/' + $(triggerOn).data('id');}, 
							title:'Delete', icon:'icon-trash'}
				]
			}),
			'inlineActionForAcceptedUserStories' : new InlineDropdown({
				dropdownTitle : 'Actions',
				embedTo : 'td:last',
				delegateTo : 'tr.active-row',
				triggerOn:'#accepted_userstories_table',
				items : [
					{ href : function(triggenOn){ return '#userstories/deny' + $(triggerOn).data('id');}, 
							title : 'Deny', icon : 'icon-remove'},
					{ href:function(triggerOn){ return '#userstories/edit/' + $(triggerOn).data('id');}, 
							title:'Edit', icon:'icon-pencil'}, 
				    { href:function(triggerOn){ return '#userstories/drop/' + $(triggerOn).data('id');}, 
							title:'Delete', icon:'icon-trash'}
				]
			})
		});
		
		models = app.getModels();
		routers = app.getRouters();
		views = app.getViews();
		behaviour = new Behaviour();
		behaviour.attachLinks({
			'render_new_userstories_on_fetch' : { sender : models['new_user_stories'], event:'reset', handler : function(collection){
				$('#new_user_stories_count').html(collection.length);
				$('#new_userstories_table').dataTable().fnClearTable();
				$('#new_userstories_table').dataTable().fnAddData(collection.toJSON());
			}},
			'render_accepted_userstories_on_fetch' : { sender : models['accepted_user_stories'], event:'reset', handler : function(collection){
				$('#accepted_user_stories_count').html(collection.length);
				$('#accepted_user_stories_table').dataTable().fnClearTable();
				$('#accepted_user_stories_table').dataTable().fnAddData(collection.toJSON());	
			}}
		});
		behaviour.bind();
		app.attachBehaviour('backlogBehaviour', behaviour);

		app.on('onStart', function(){
			this.views['inlineActionForNewUserStories'].bind();
			this.views['inlineActionForAcceptedUserStories'].bind();
			this.models['new_user_stories'].fetch({url:'/userstories/get?new=1', reset:true});
			this.models['accepted_user_stories'].fetch({ url:'/userstories/get?accepted=1', reset:true});
		}, app);
	},
	detach : function(app){

	}
})