LiveProjects = MVCComponent.extend({
	name : 'liveProjects',
	_composeName : function(name){
		return this.prefix + '.' + name;
	},
	_createModels : function(){
		var models = {};
		models[this.composeName('projects')] = new Collection();

		return models;
	},
	_createViews : function(){
		var views = {};

		views[this.composeName('inlineAction')] =  new InlineDropdown({ 
				dropdownTitle : 'Actions',
				embedTo : 'td:last',
				delegateTo : 'tr.active-row',
				triggerOn:'#projects_table', 
				items : [
						 {href:function(triggerOn){ return '#projects/edit/' + $(triggerOn).data('id');}, 
							title:'Edit', icon:'icon-pencil'}, 
				         {href:function(triggerOn){ return '#projects/drop/' + $(triggerOn).data('id');}, 
							title:'Delete', icon:'icon-trash'}]
			})

		return views;
	},
	_createRouters : function(){
		var routers = {};
		routers[this.composeName('router')] = new LiveProjectsRouter();
		return routers;
	},
	
	attach : function(app){
		var self = this;
		var models;
		if (!app || !(app instanceof MVCApplication))
			return;

		app.setModels(this._createModels());
		app.setViews(this._createViews());
		app.setRouters(this._createRouters());

		behaviour = this._createBehaviour();
		behaviour.bind();
		app.attachBehaviour(this.composeName('behaviour'), behaviour);

		app.on('onStart', function(){
			var liveProjects = this.getComponent('liveProjects');
			liveProjects.getViews('inlineAction').bind();
			liveProjects.getModels('projects').fetch({url:'/project/get?live=1', giveme: { data:true }});
		}, app);

	},
	detach : function(){
		return false
	}
});