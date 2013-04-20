ProjectsPage = MVCComponent.extend({
	attach : function(app){
		var behaviour;
		if (!app || !(app instanceof MVCApplication))
			return;
		
		/*
			Set empty projects and trashed project collections
		*/
		app.setModels({
			'projects' : new Collection(),
			'trashed_projects' : new Collection()
		});
		/*
			Set router aka controller for listening any actions that take place on page
		*/
		app.setRouters({
			'projectsRouter' : new ProjectsRouter()
		});
		/*
			Set up for popup forms - create, update
			Plugin for inline row actions - both for projects table grid and
			trashed projects table grid
		*/
		app.setViews({
			'projectEditPopup' : new PopupForm({  
				url : '/project/update',
				id: 'project_edit_popup',
				title : 'Project Edit'
			}), 
			'projectCreatePopup' : new PopupForm({
				url : '/project/create',
				id  :  'project_create_popup',
				title : 'Project Create'
			}),
			'inlineActionForActiveProjects' : new InlineDropdown({ 
				dropdownTitle : 'Actions',
				embedTo : 'td:last',
				delegateTo : 'tr.active-row',
				triggerOn:'#projects_table', 
				items : [
						 {href:function(triggerOn){ return '#projects/edit/' + $(triggerOn).data('id');}, 
							title:'Edit', icon:'icon-pencil'}, 
				         {href:function(triggerOn){ return '#projects/drop/' + $(triggerOn).data('id');}, 
							title:'Delete', icon:'icon-trash'}]
			}),
			'inlineActionForTrashedProjects' : new InlineDropdown({
				dropdownTitle : 'Actions',
				embedTo : 'td:last',
				delegateTo : 'tr.active-row',
				triggerOn: '#trashed_projects_table',
				items : [
				         	{ href:function(triggerOn){ return '#projects/restore/' + $(triggerOn).data('id');},
				         	 title:'Restore', icon:'icon-arrow-up'}
				        ]
			})
		});
		/*
			Set up for behaviour for this page
		*/
		models = app.getModels();
		routers = app.getRouters();
		views = app.getViews();
		behaviour = new Behaviour();
		behaviour.attachLinks({
			//when we enter table view
			//1. update project collection counter
			//2. update table grid for projects
			'render_projects_table_on_fetch' : { sender : models['projects'], event : 'reset', handler:function(collection){
				$('#projects_count').html(collection.length);
				$('#projects_table').dataTable().fnClearTable();
				$('#projects_table').dataTable().fnAddData(collection.toJSON())
			}},
			//1. update project collection counter
			//2. update table grid for projects
			'render_trashed_projects_on_fetch' : { sender : models['trashed_projects'], event:'reset', handler:function(collection){
				$('#trashed_projects_count').html(collection.length);
				$('#trashed_projects_table').dataTable().fnClearTable();
				$('#trashed_projects_table').dataTable().fnAddData(collection.toJSON());
			}},
			//1.update
			'render_trashed_projects_counter_on_fetch' : { sender : models['trashed_projects'], event : 'sync:count', handler:function(collection){
				$('#trashed_projects_count').html(collection.count.get('value'));
			}},
			//when we intent to refresh all projects section
			'render_projects_table_on_refresh' : { sender: routers['projectsRouter'], event:'refreshAllProjects', handler : function(){
				models['projects'].fetch({url:'/project/get?live=1', giveme:{data:true} });
			}},
			//when we intent to refresh all trashed section
			'render_trashed_projects_on_refresh' : { sender: routers['projectsRouter'], event:'refreshTrashedProjects', handler : function(){
				models['trashed_projects'].fetch({ url:'/project/get?trashed=1', giveme : {data:true}});
			}},
			//when we intent to add project
			'create_popup_on_project_create' : { sender:routers['projectsRouter'], listener:views['projectCreatePopup'], 
				event:'createProject', handler : function(){
					this.render();
				}},
			'create_project_on_submit' : { sender : views['projectCreatePopup'], event:'submit:popup', handler : function(response){
				models['projects'].add(response.data[0]);
			}},
			'add_row_on_add_project' : { sender : models['projects'], event: 'add' , handler : function(model, collection){
				$('#projects_count').html(collection.length);
				$('#projects_table').dataTable().fnAddData(model.toJSON());
			}},
			//when we intent to drop project
			'drop_project' : { sender:routers['projectsRouter'], event:'dropProject', handler: function(id){
				var model = models['projects'].get(id);

				models['projects'].remove(model);
				$.ajax({ url:'/project/drop', method:"POST", dataType:'json', data:{id:id}}).success(function(data){
					models['trashed_projects'].add(data.project);	
				}).fail(function(){
					Backbone.Events.trigger('error');
				});
			}},
			'delete_row_on_drop_project' : {sender:models['projects'], event:'remove', handler: function(model,collection){
				var rowToDelete = $('tr.active-row[record-id="' + model.id + '"]')[0];

				$('#projects_count').html(collection.length);
				$('#projects_table').dataTable().fnDeleteRow(rowToDelete);
			}},
			'add_row_to_trashed_projects_on_drop_project' : { sender:models['trashed_projects'], event:'add', handler:function(model, collection){
				$('#trashed_projects_count').html(collection.length);
				$('#trashed_projects_table').dataTable().fnAddData(model.toJSON());
			}},
			//when we intent to drop many projects
			'drop_projects' : { sender : routers['projectsRouter'], event:'dropProjects', handler : function(){
				var nTrs = $('input[type="checkbox"]:checked').parents('tr.active-row');
				var modelsToDrop = [], model;
				var id,ids = [];

				for (var i = 0;i < nTrs.length;i++){
					id = $(nTrs[i]).data('id');
					ids.push(id);

					model = models['projects'].get(id);
					modelsToDrop.push(model);
				}

				models['projects'].remove(modelsToDrop);
				$.ajax({ url:'/project/drop', method:"POST", dataType:'json', data:{ids:ids}}).success(function(data){
					models['trashed_projects'].add(data.projects);	
				}).fail(function(){
					Backbone.Events.trigger('error');
				});
			}},
			//when we intent to restore project
			'restore_project' : { sender: routers['projectsRouter'], event:'restoreProject', handler : function(id){
				var model = models['trashed_projects'].get(id);
				models['trashed_projects'].remove(model);
				$.ajax({ url:'/project/restore', dataType:'json', method:"POST", data:{id:id}}).success(function(data){
					models['projects'].add(data.project);	
				}).fail(function(){
					Backbone.Events.trigger('error');
				});
			}},
			'delete_row_on_restore_project' : { sender : models['trashed_projects'], event:'remove', handler:function(model, collection){
				var rowToDelete = $('tr.active-row[record-id="' + model.id + '"]')[0];

				$('#trashed_projects_count').html(collection.length);
				$('#trashed_projects_table').dataTable().fnDeleteRow(rowToDelete);
			}},
			//when we intent to restore many projects
			'restore_projects' : { sender : routers['projectsRouter'], event:'restoreProjects', handler : function(){
				var nTrs = $('input[type="checkbox"]:checked').parents('tr.active-row');
				var modelsToRestore = [], model;
				var id,ids = [];

				for (var i = 0;i < nTrs.length;i++){
					id = $(nTrs[i]).data('id');
					ids.push(id);

					model = models['trashed_projects'].get(id);
					modelsToRestore.push(model);
				}

				models['trashed_projects'].remove(modelsToRestore);
				$.ajax({ url:'/project/restore', method:"POST", dataType:'json', data:{ids:ids}}).success(function(data){
					models['projects'].add(data.projects);	
				}).fail(function(){
					Backbone.Events.trigger('error');
				});
			}},
			//when we intent to edit project
			'create_popup_on_project_edit' : { sender:routers['projectsRouter'], listener:views['projectEditPopup'], 
				event:'editProject', handler : function(id){
					this.url = '/project/update?id=' + id;
					this.render();
			}},
			'update_project_on_submit' : {sender:views['projectEditPopup'], event:'submit:popup', handler : function(data){
				var project = data.project;
				var descriptionHtml;
				var description = project.description;
				var rowToUpdate = $('tr.active-row[record-id="' + project.id + '"]')[0];

				$('#projects_table').dataTable().fnUpdate(project, rowToUpdate);
			}},
			//when we switch among 'all' section and 'trash' section
			'show_trashed_projects' : { sender:routers['projectsRouter'], event:'getTrashProjects', handler: function(){
				$('#trashed_projects_section').show();
				$('#projects_section').hide();

				models['trashed_projects'].fetch({ url:'/project/get?trashed=1'});
			}},
			'show_all_projects' : { sender:routers['projectsRouter'], event:'getAllProjects', handler : function(){
				$('#trashed_projects_section').hide();
				$('#projects_section').show();

				models['projects'].fetch({ url:'/project/get?live=1'});
			}}
		});
		
		behaviour.bind();
		app.attachBehaviour('projectsBehaviour', behaviour);

		app.on('onStart', function(){
			//bind handlers on rows for projects table
			this.views['inlineActionForActiveProjects'].bind();
			//bind handlers on rows for trashed projects table
			this.views['inlineActionForTrashedProjects'].bind();
			//fetch project collection from server on load
			this.models['projects'].fetch({url:'/project/get?live=1', giveme: { data:true }});
			//fetch only count of trashed project collection from server on load
			this.models['trashed_projects'].fetch({ url:'/project/get?trashed=1', giveme : { count:true}});
		}, app);
		
		$(document).on('click', '.read-more-string', function(){
			$(this).next('.hide').show();
			$(this).hide();
			$(this).siblings('.hide-string').show();
		});

		$(document).on('click', '.hide-string',function(){
			$(this).hide();
			$(this).prev('.hide').hide();
			$(this).siblings('.read-more-string').show();
		});
		
		$('#projects_table').dataTable({
			'sDom' : '<"row-fluid"<"span6"l><"span4 pull-right"f>r>t<"row-fluid"<"span6"i><"span5 pull-right"p>>',
			"sPaginationType": "bootstrap",
			"asStripeClasses" : ["active-row"],
			"fnRowCallback" : function(nRow, aData){
				$(nRow).data('id', aData.id);
				$(nRow).attr('record-id', aData.id);
			},
			"aoColumns" : [
				{"sDefaultContent" : '<input type="checkbox">'},
				{"mData" : "name", "mRender" : function(name){ return '<strong>' + name + '</strong>';}},
				{"mData" : "description", "sClass" : 'description-col', "mRender" : function(description, type, list){
					descriptionHtml = '<span>' + description.substr(0,144) + '</span>';
					if (description.length >= 144){
						descriptionHtml += '<span class="read-more-string"><a href="#">Read more</a></span>';
						descriptionHtml += '<span class="hide">' + description.substr(144, description.length) + '</span>';
						descriptionHtml += '<span class="hide-string"><a href="#">Hide</a></span>';
					}
					return descriptionHtml;
				}},
				{"sDefaultContent" : '', 'sClass' : 'actions-col'}
			]
		});
		
		$('#trashed_projects_table').dataTable({
			'sDom' : '<"row-fluid"<"span6"l><"span4 pull-right"f>r>t<"row-fluid"<"span6"i><"span5 pull-right"p>>',
			"sPaginationType": "bootstrap",
			"asStripeClasses" : ["active-row"],
			"fnRowCallback" : function(nRow, aData){
				$(nRow).data('id', aData.id);
				$(nRow).attr('record-id', aData.id);
			},
			"aoColumns" : [
				{"sDefaultContent" : '<input type="checkbox">'},
				{"mData" : "name", "mRender" : function(name){ return '<strong>' + name + '</strong>';}},
				{"sDefaultContent" : '',  'sClass' : 'actions-col'}
			]
		});
	},
	detach : function(app){
		return false;
	}
});

$(document).ready(function(){
	app = MVCApplication.getInstance();
	//page = new ProjectsPage();	
	projectsComponent = new ProjectsComponent();
	trashedProjects = new TrashedProjectsComponent();
	app.setComponent('projects',projects);
});