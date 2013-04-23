ProjectsRouter = Backbone.Router.extend({
	initialize : function(options){
		options = options || {};
		this.models = (options.models)? options.models : [];
		this.views = (options.views)? options.views : [];
		Backbone.history.start();
		this.on('route', this.afterRoute, this);
	},
	routes : {
		'project/startup/:group' : 'startup',
		'project/change/:group' : 'switchToGroup',
		'project/changeGroup?fromGroup=:fromGroup&toGroup=:toGroup&action=:action&id=:id' : 'changeGroup',
		'project/refresh' : 'refresh',
		'project/:group/edit/:id' : 'edit',
		
		'project/create' : 'create'
	},
	startup : function(group){
		var newCollection = this.models['projects.' + group];
		var newTableview = this.views['projects.' + group];

		this.currentCollection = newCollection;
		this.currentTableview = newTableview;
		
		newTableview.show();
		//newTableview.listenTo(newCollection, 'add', newTableview.onAdd);
	},
	refresh : function(){
		this.currentCollection.fetch({ reset : true});
	},
	switchToGroup : function(group){
		var newTableview = this.views['projects.' + group];
		var newCollection = this.models['projects.' + group];
		var oldTableView = this.currentTableview;
		var oldCollection = this.currentCollection;

		if (oldTableView){
			oldTableView.hide();
			//oldTableView.stopListening(oldCollection, 'add');
		}
		this.currentCollection = newCollection;
		this.currentTableview = newTableview;

		newCollection.fetch({ reset : true }).done(function(){
			newTableview.show();
			//newTableview.listenTo(newCollection, 'add', newTableview.onAdd)	
		});
	},
	changeGroup : function(fromGroup,toGroup,action,id){
		var tableview;
		var fromGroup = this.models['projects.' + fromGroup];
		var toGroup = this.models['projects' + toGroup];
		var project,checkedRows,ids;

		if (_.isNumber(id)){
			model = fromGroup.get(id);

			fromGroup.remove(project);
			$.ajax({ url:'/project/' + action, method:"POST", dataType:'json', data:{id:id}}).success(function(resp){
				toGroup.add(row);	
			}).fail(function(){
				Backbone.Events.trigger('error');
			});
		}
		else if (id === 'all'){
			tableview = this.currentTableview;
			checkedRows = tableview.where({ checked : true});
			ids = tableview.keys(checkedRows);
			models = _.map(ids, function(id, index){ return fromGroup.get(id)});

			fromGroup.remove(models, {reset : true});
			$.ajax({ url:'/project/' + action, method:"POST", dataType:'json', data:{ids:ids}}).success(function(resp){
				toGroup.add(resp, {reset : true});	
			}).fail(function(){
				Backbone.Events.trigger('error');
			});
		}
	},
	create : function(){
		var liveProjects = this.models['projects.live'];
		var tableview = this.views['projects.tableview'];
		var popup = new PopupForm({ id : 'createPopup', title : 'Project Create', url : '/project/create'});

		popup.render();

		liveProjects.listenTo(popup, 'popup:submit', function(resp){ 
			liveProjects.add(resp);
			liveProjects.stopListening(popup, 'popup:submit');
		});
		this.listenTo(popup, 'popup:close', function(){
			liveProjects.stopListening(popup, 'popup:submit');
		});
	},
	edit : function(group, id){
		var tableview = this.views['projects.' + group];
		var projects = this.models['projects.' + group], project;
		var popup = new PopupForm({  id : 'editPopup', title : "Project Edit", url : '/project/edit/' + id});
		popup.url = '/project/update?id=' + id;
		popup.render();
		projects.listenTo(popup, 'popup:submit', function(resp){
			projects.set(resp, { merge : true});
			project = projects.get(resp.data[0].id);
			tableview.update(project);

			projects.stopListening(popup, 'popup:submit');
		});
		this.listenTo(popup, 'popup:close', function(){
			projects.stopListening(popup, 'popup:submit');
		});
	},	
	afterRoute : function(router, route, params){
		this.navigate('',{replace:true});
	}
})