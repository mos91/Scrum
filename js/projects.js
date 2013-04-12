ProjectsPage = MVCComponent.extend({
	attach : function(app){
		var behaviour;
		
		if (!app || !(app instanceof MVCApplication))
			return;
		
		app.setRouters({
			'projectsRouter' : new ProjectsRouter()
		});
		
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
						 {href:function(triggerOn){ return '#projects/edit/' + $('.row-id',triggerOn).attr('value');}, 
							title:'Edit', icon:'icon-pencil'}, 
				         {href:function(triggerOn){ return '#projects/delete/' + $('.row-id',triggerOn).attr('value');}, 
							title:'Delete', icon:'icon-trash'}]
			}),
			'inlineActionForTrashedProjects' : new InlineDropdown({
				dropdownTitle : 'Actions',
				embedTo : 'td:last',
				delegateTo : 'tr.active-row',
				triggerOn: '#trashed_projects_table',
				items : [
				         	{href:'#project/restore', title:'Restore', icon:'icon-arrow-up'}
				        ]
			})
		});
		
		routers = app.getRouters();
		views = app.getViews();
		behaviour = new Behaviour();
		behaviour.attachLinks({
			'create_popup_on_project_edit' : { sender:routers['projectsRouter'], listener:views['projectEditPopup'], 
				event:'editProject', handler : function(id){
					this.url = '/project/update?id=' + id;
					this.render();
				}},
			'create_popup_on_project_create' : { sender:routers['projectsRouter'], listener:views['projectCreatePopup'], 
				event:'createProject', handler : function(){
					this.render();
				}},
			'create_project_on_submit' : { sender : views['projectCreatePopup'], event:'submit:popup', handler : function(data){
				var project = data.project;
				var description = project.description, descriptionHtml;

				descriptionHtml = '<span>' + description.substr(0,144) + '</span>';
				if (description.length >= 144){
					descriptionHtml += '<span class="read-more-string"><a href="#">Read more</a></span>';
					descriptionHtml += '<span class="hide">' + description.substr(144, description.length) + '</span>';
					descriptionHtml += '<span class="hide-string"><a href="#">Hide</a></span>';
				}
				$('#projects_table').dataTable().fnAddData({ 
				   id: '<span class="row-id" value="' + project.id + '"></span>', 
				   checkbox : '<input type="checkbox">', 
				   name : '<strong>' + project.name+ '</strong>', 
				   description : descriptionHtml, 
				   actions : ''
				});
			}},
			'update_project_on_submit' : {sender:views['projectEditPopup'], event:'submit:popup', handler : function(data){
				var project = data.project;
				var descriptionHtml;
				var description = project.description;
				var rowToUpdate = $('.row-id[value="' + project.id + '"]').parents('tr.active-row');

				descriptionHtml = '<span>' + description.substr(0,144) + '</span>';
				if (description.length >= 144){
					descriptionHtml += '<span class="read-more-string"><a href="#">Read more</a></span>';
					descriptionHtml += '<span class="hide">' + description.substr(144, description.length) + '</span>';
					descriptionHtml += '<span class="hide-string"><a href="#">Hide</a></span>';
				}
				$('#projects_table').dataTable().fnUpdate({
				   id: '<span class="row-id" value="' + project.id + '"></span>', 
				   checkbox : '<input type="checkbox">', 
				   name : '<strong>' + project.name+ '</strong>', 
				   description : descriptionHtml, 
				   actions : ''
				}, rowToUpdate[0]);
			}},
			'show_trashed_projects' : { sender:routers['projectsRouter'], event:'getTrashProjects', handler: function(){
				$('#trashed_projects_section').show();
				$('#projects_section').hide();
			}},
			'show_all_projects' : { sender:routers['projectsRouter'], event:'getAllProjects', handler : function(){
				$('#trashed_projects_section').hide();
				$('#projects_section').show();
			}}
		});
		
		app.attachBehaviour('projectsBehaviour', behaviour);
		app._bind();
		app.on('onStart', function(){
			this.views['inlineActionForActiveProjects'].bind();
			this.views['inlineActionForTrashedProjects'].bind();
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
			'sDom' : '<"row-fluid"<"span6"l><"span4 pull-right"f>r>t<"row-fluid"<"span6"i><"span4 pull-right"p>>',
			"sPaginationType": "bootstrap",
			"asStripeClasses" : ["active-row"],
			"aoColumns" : [
				{"mData" : 'checkbox'},
				{"mData" : 'id'},
				{"mData" : "name"},
				{"mData" : "description", "sClass" : 'description-col'},
				{"mData" : 'actions'}
			]
		});
		
		$('#trashed_projects_table').dataTable({
			'sDom' : '<"row-fluid"<"span6"l><"span4 pull-right"f>r>t<"row-fluid"<"span6"i><"span4 pull-right"p>>',
			"sPaginationType": "bootstrap"
		});
	},
	detach : function(app){
		
	}
});

$(document).ready(function(){
	app = MVCApplication.getInstance();
	projects = new ProjectsPage();
	app.setComponent('projects',projects);
});