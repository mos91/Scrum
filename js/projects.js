ProjectsPage = MVCComponent.extend({
	//handlers
	onDropProject : function(id){
		var app = this.app;
		var tableview = app.views['tableview'];
		var trashedProjects = app.models['trashedProjects'];
		var liveProjects = app.models['liveProjects'];
		var projectToDrop = liveProjects.get(id);

		var liveCounter = app.models['liveCounter'];
		var trashedCounter = app.models['trashedCounter'];

		liveProjects.remove(projectToDrop);
		liveCounter.set(liveProjects.length);
		tableview.delete(projectToDrop);

		$.ajax({ url:'/project/drop', method:"POST", dataType:'json', data:{id:id}}).success(function(response){
			var row = response.data[0];
			trashedProjects.add(row);	
			trashedCounter.set(trashedProjects.length);
		}).fail(function(){
			Backbone.Events.trigger('error');
		});
	},
	onDropProjects : function(){
		var app = this.app;
		var tableview = app.views['tableview'];
		var checkedRows;

		checkedRows = tableview.where({ checked : true});
		ids = tableview.keys(checkedRows);

		$.ajax({ context : this, url:'/project/drop', method:"POST", dataType:'json', data:{ids:ids}}).success(function(response){
			var rows = response.data;
			this.models['trashedProjects'].add(rows);	
		}).fail(function(){
			Backbone.Events.trigger('error');
		});
	},
	onRestoreProject : function(id){
		var app = this.app;
		var tableview = app.views['tableview'];
		var trashedProjects = app.models['trashedProjects'];
		var liveProjects = app.models['liveProjects'];
		var row = trashedProjects.get(id);

		var liveCounter = app.models['liveCounter'];
		var trashedCounter = app.models['trashedCounter'];

		trashedProjects.remove(row);
		trashedCounter.set(trashedProjects.length);
		tableview.delete(row);

		$.ajax({ url:'/project/restore', method:"POST", dataType:'json', data:{id:id}}).success(function(response){
			var row = response.data[0];
			liveProjects.add(row);	
			liveCounter.set(trashedProjects.length);
		}).fail(function(){
			Backbone.Events.trigger('error');
		});
	},
	onRestoreProjects : function(){
		var app = this.app;
		var tableview = app.views['tableview'];
		var checkedRows;

		checkedRows = tableview.where({ checked : true});
		ids = tableview.keys(checkedRows);
		$.ajax({ context : this, url:'/project/restore', method:"POST", dataType:'json', data:{ids:ids}}).success(function(data){
			this.models['liveProjects'].add(data.projects);	
		}).fail(function(){
			Backbone.Events.trigger('error');
		});
	},
	onCounter : function(counterName, collection){
		var app = this.app;
		var counter = app.models[counterName];

		app.models[counterName].set(collection.length);
		$('#' + counterName).html(counter.get())
	},
	onFetch : function(collection){
		var app = this.app;
		app.views['tableview'].reset(collection);
	},
	onRefresh : function(collectionName,urlParam){
		var app = this.app;
		var collection = app.models[collectionName];

		collection.fetch('/project/get?' + urlParam, {reset : true});
	},
	//reactions
	countersReactions : function(){
		var app = this.app;
		var listeners = {};
		var liveProjects = this.app.models['liveProjects'];
		var trashedProjects = this.app.models['trashedProjects'];
		var favoriteProjects = this.app.models['favoritesProjects'];

		var onLiveCounterHandler = _.functor(_.partial('liveCounter',this.onCounter));
		var onTrashedCounterHandler = _.functor(_.partial('trashedCounter', this.onCounter));
		var onFavoriteCounterHandler = _.functor(_.partial('favoriteCounter', this.onCounter));

		listeners['redrawOnLiveCounter'] = {
			listener : app,
			sender : [liveProjects, liveProjects, liveProjects],
			events : ['add', 'remove', 'reset'],
			handlers : [onLiveCounterHandler, onLiveCounterHandler, onLiveCounterHandler] 
		};
		listeners['redrawOnTrashedCounter'] = {
			listener : this.app,
			sender : [trashedProjects, trashedProjects, trashedProjects],
			events : ['add', 'remove', 'reset'],
			handlers : [onTrashedCounterHandler, onTrashedCounterHandler, onTrashedCounterHandler] 	
		};
		listeners['redrawOnFavoriteCounter'] = {
			listener : this.app,
			sender : [favoriteProjects, favoriteProjects, favoriteProjects],
			events : ['add', 'remove', 'reset'],
			handlers : [onFavoriteCounterHandler, onFavoriteCounterHandler, onFavoriteCounterHandler]
		};

		return listeners;
	},
	dropReactions : function(){
		var app = this.app;
		var listeners = {};

		listeners['dropProject'] = { 
			listener: app, 
			senders: app.routers['projectsRouter'], 
			events:'dropProject', 
			fns : _.functor(this.onDropProject)
		};
		listeners['dropProjects'] = {
			listener : app,
			sender : app.routers['projectsRouter'],
			event : 'dropProjects',
			handler : _.functor(this.onDropProjects)
		};

		return listeners;
	},
	restoreReactions : function(){
		var listeners = {};
		listeners['restoreProject'] = {
			listener : this.app,
			senders : this.routers['projectsRouter'],
			events : 'restoreProject',
			handler : _.functor(this.onRestoreProject)
		};
		listeners['restoreProjects'] = {
			listener : this.app,
			senders : this.routers['projectsRouter'],
			events : 'restoreProjects',
			handler : _.functor(this.onRestoreProjects)
		}

		return listeners;
	},
	enterReactions : function(){
		var app = this.app;
		var listeners = {};
		listeners['fetchLive'] = {
			listener : app,
			senders : app.models['liveProjects'],
			events : 'reset',
			handler : _.functor(this.onFetch)
		};
		listeners['fetchTrashed'] = {
			listener: this.app
		};
		listeners['fetchFavorites'] = {
			listener: this.app
		};
	},
	refreshReactions:  function(){
		var app = this.app;
		var listeners = {};

		listeners['refreshLive'] = {
			listener : app,
			senders : app.routers['projectsRouter'],
			events : 'getLiveProjects',
			handler : _.functor(_.partial(this.onRefresh, 'liveProjects', 'live=1'))
		};
		listeners['refreshTrashed'] = {
			listener : app, 
			senders : app.routers['projectsRouter'],
			events : 'getTrashedProjects',
			handler : _.functor(_.partial(this.onRefresh, 'trashedProjects', 'trashed=1'));
		};
		listeners['refreshFavorite'] = {
			listener: app,
			senders : app.routers['projectsRouter'],
			events : 'getFavoriteProjects',
			handler : _.functor(_.partial(this.onRefresh, 'favoriteProjects', 'favorite=1'));
		};

		return listeners;
	},
	attach : function(app){
		var behaviour;
		if (!app || !(app instanceof MVCApplication))
			return;
		
		/*
			Set empty projects and trashed project collections
		*/
		app.setModels({
			'liveCounter' : new Counter(),
			'favoriteCounter' : new Counter(),
			'trashedCounter' : new Counter(),
			'liveProjects' : new Collection(),
			'favoriteProjects' : new Collection(),
			'trashedProjects' : new Collection()
		});
		/*
			Set router aka controller for listening any actions that take place on page
		*/
		app.setRouters({
			'projectsRouter' : new ProjectsRouter()
		});
	
		app.setViews({
			'tableview' : new TableView(),
			'popup' : new PopupForm(),
			'inline' : new InlineDropdown()
		});
		/*
			Set up for behaviour for this page
		*/
		models = app.getModels();
		routers = app.getRouters();
		views = app.getViews();

		behaviour = new Behaviour();
		behaviour.attachListeners(_.extend({}, 
			this.refreshReaction()
			this.counterReactions(), 
			this.dropReactions(), 
			this.restoreReactions(), 
		));
		behaviour.attachListeners({
	
			//when we intent to add project
			'create_popup_on_project_create' : { sender:routers['projectsRouter'], listener:views['projectCreatePopup'], 
				event:'createProject', handler : function(){
					this.render();
				}},
			'create_project_on_submit' : { sender : views['projectCreatePopup'], event:'submit:popup', handler : function(response){
				var row = response.data[0];
				var liveProjects = this.models['live_projects'];
				var	tableview = this.views['tableview'];
				var liveCounter = this.model['live_projects_counter'];

				liveProjects.add(row);
				liveCounter.set(liveProject.length);
				tableview.add(liveProjects.findWhere(row));

				/*$('#projects_table').dataTable().fnAddData(model.toJSON());*/
			}},
			//when we intent to drop project
			
			
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
			var tableview = this.views['tableview'];
			var liveProjects = this.models['live_projects'];

			var trashedCounter = this.models['trashed_projects_counter'];
			var liveCounter = this.models['live_projects_counter'];
			var favoriteCounter =  this.models['favorite_projects_counter'];

			//fetch 
			tableview.fetch('/projects/get/?live_projects=1');
			liveProjects.fetch('/project/get?live=1');
			liveCounter.fetch('/project/get?live=1&count=1');
			favoriteCounter.fetch('/project/get?favorite=1&count=1');
			trashedCounter.fetch('/project/get?trashed=1&count=1');

			//render
			tableview.render(liveProjects);
			$('#live_projects_count').html(liveCounter.get());
			$('#favorite_projects_count').html(favoriteCounter.get());
			$('#trashed_projects_count').html(trashedCounter.get());

			this.views['inline'].bind();
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
		
		/*$('#projects_table').dataTable({
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
		});*/
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