MVCMixin = {
	_registerModels : function(names){
		var name;
		var modelNames = this.names['models'];
		var modelIndexes = this.indexes['models'];

		if (_.isArray(names)){
			_.each(names, function(name){
				modelNames.push(name);
				modelIndexes[name] = modelNames.length - 1;		
			}, this);
		}
		else if (_.isString(names)){
			name = names;
			modelNames.push(name);
			modelIndexes[name] = modelNames.length - 1;
		}
	},
	_registerViews : function(names){
		var name;
		var viewNames = this.names['views'];
		var viewIndexes = this.indexes['views'];

		if (_.isArray(names)){
			_.each(names, function(name){
				viewNames.push(name);
				viewsIndexes[name] = viewNames.length - 1;		
			}, this);
		}
		else if (_.isString(names)){
			name = names;
			viewNames.push(name);
			viewIndex[name] = viewNames.length - 1;
		}
	},
	_registerRouters : function(names){
		var name;
		var routerNames = this.names['routers'];
		var routerIndexes = this.indexes['routers'];

		if (_.isArray(names)){
			_.each(names, function(name){
				routerNames.push(name);
				routerIndexes[name] = routerNames.length - 1;		
			}, this);
		}
		else if (_.isString(names)){
			name = names;
			routerNames.push(name);
			roterIndexes[name] = routerNames.length - 1;
		}
	}
}

/*
 * MVC Application is singleton object, which describes mvc  and reactions on user actions
 * */
MVCApplication = Application.extend(
	_.extend(MVCMixin, {
	initialize: function(attributes, options){
		var models = (attributes && _.isObject(attributes))? attributes.models : {};
		var views = (attributes && _.isObject(attributes))? attributes.views : {}; 
		var routers = (attributes && _.isObject(attributes))? attributes.routers : {};
		var behaviours = (attributes && _.isObject(attributes))? attributes.behaviours : {};

		MVCApplication.__super__.initialize.apply(this);

		this.setModels(models);
		this.seViews(views);
		this.setRouters(routers);
		this.attachBehaviours(behaviours);
		
		this.names['models'] = [];
		this.indexes['models'] = {};
		this.names['views'] = [];
		this.indexes['views'] = {};
		this.names['routers'] = [];
		this.indexes['routers'] = {};
		this.components = {};
	},
	setModel : function(name, model, options){
		if (!name || !_.isString(name))
			return;
		if (!model || !(model instanceof Backbone.Model || model instanceof Backbone.Collection))
			return;
		this.models[name] = model;

		if (_.isUndefined(options.register) || !_.isEmpty(options.register))
			this._registerModels(name);

		return this;
	},
	setModels : function(models, options){
		var names;
		if (!models || !_.isObject(models))
			return;
		names = _.keys(models);
		_.each(models, function(model, name){
			this.setModel(name, model, { register : false});
		}, this);
		
		if (_.isUndefined(options.register) || !_.isEmpty(options.register))
			this._registerModels(names);

		return this;
	},
	setView : function(name, view, options){
		if (!name || !_.isString(name))
			return;
		if (!view || !(view instanceof Backbone.View))
			return;
		this.views[name] = view;
		
		if (_.isUndefined(options.register) || options.register === true)
			this._registerViews(name);

		return this;
	},
	setViews : function(views, options){
		var names;
		if (!views || !_.isObject(views))
			return;
		names = _.keys(views);
		_.each(views, function(view, name){
			this.setView(name, view, {register:false});
		}, this);

		if (_.isUndefined(options.register) || !_.isEmpty(options.register))
			this._registerViews(names);		

		return this;
	},
	setRouter : function(name, router, options){
		if (!name || !_.isString(name))
			return;
		if (!router || !(router instanceof Backbone.Router))
			return;
		this.routers[name] = router;

		if (_.isUndefined(options.register) || !_.isEmpty(options.register))
			this._registerRouters(name);	

		return this;
	},
	setRouters : function(routers, options){
		var names;
		if (!routers || !_.isObject(routers))
			return;
		names = _.keys(routers);
		_.each(routers, function(router, name){
			this.setRouter(name, router, { register : false});
		}, this);

		if (_.isUndefined(options.register) || !_.isEmpty(options.register))
			this._registerRouters(names);

		return this;
	},
	getModels : function(name){
		if (!name || !_.isString(name) || !this.models[name])
			return this.models;
		return this.models[name];
	},
	getViews : function(name){
		if (!name || !_.isString(name) || !this.views[name])
			return this.views;
		return this.views[name];
	},
	getRouters : function(name){
		if (!name || !_.isString(name) || !this.routers[name])
			return this.routers;
		return this.routers[name];
	},
	getComponent : function(name){
		var c;
		if (!name || !(_.isString(name)))
			return this.components;

		if (c = this.components[name])
			return c;
	},
	setComponent : function(name, component){
		var c;
		if (!name || !(_.isString(name)))
			return;
		if (!component || !(component instanceof MVCComponent))
			return;
		if (!(this.components[name])){
			c = this.components[name] = component;
			c.attach(this);
		}
	},
	unsetComponent : function(name){
		if (!name || !(_.isString(name)))
			return;
		if (component = this.components[name]){
			component.detach(this);
			this.components[name] = null;
		}
	},
	getInstance : function(){
		if (!this.instance){
			this.instance = new MVCApplication();
		}
		return this.instance;
	}
}));

//MVC Component can attach to MVCApplication to fully customize logic
MVCComponent = Backbone.Object.extend(
	_.extend(MVCMixin, {
		initialize : function(attributes, options){
			var attributes = (_.isUndefined(attributes))? :
			var app = attributes.app;
			var name = attributes.name;
			var cmpId = this.cmpId = _.uniqueId('cmp');

			this.name = (name && _.isString(name))? name : cmpId;
			this.setApp(app);

			this.names = {};
			this.indexes = {};
			this.names['models'] = [];
			this.indexes['models'] = {};
			this.names['views'] = [];
			this.indexes['views'] = {};
			this.names['routers'] = [];
			this.indexes['routers'] = {};
			this.names['behaviours'] = [];
			this.indexes['behaviours'] = {};
		},
		attach : function(app) { this.name},
		detach : function(app) {},
		setApp : function(app) { 
			if (!app || !(app instanceof MVCApplication))
				return;

			this.app = app;
		},
		_preprocessNames : function(names){
			if (_.isArray(names)){
				names = _.map(names, function(name){
					return this.name + '.' + name;
				}, this);
			}
			else if ( _.isString(names)){
				names = this.name + '.' + names;
			}

			return names;
		},
		_registerBehaviours : function(names){
			var name;
			var behaviourNames = this.names['behaviours'];
			var behaviourIndexes = this.indexes['behaviours'];

			if (_.isArray(names)){
				_.each(names, function(name){
					behaviourNames.push(name);
					behaviourIndexes[name] = behaviourNames.length - 1;		
				}, this);
			}
			else if (_.isString(names)){
				name = names;
				behaviourNames.push(name);
				behaviourIndexes[name] = behaviourNames.length - 1;
			}
		},
		setRouter : function(name, router, options){
			var app = this.app;
			if (!app)
				return;
			if (!name || !_.isString(name))
				return;
			if (!router || !(router instanceof Backbone.Router))
				return;

			app.setRouter(name, router, {register:false});
			if (_.isUndefined(options.register) || !_.isEmpty(options.register))
				this._registerRouters(name);
		},
		setRouters : function(routers, options){
			var names;

			if (!routers || !_.isObject(routers))
				return;

			names = _.keys(routers);
			app.setRouters(routers, { register: false});

			if (_.isUndefined(options.register) || !_.isEmpty(options.register))
				this._registerRouters(names);

			return this;
		},
		setModel : function(name, model, options){
			var app = this.app;
			if (!app)
				return;
			if (!name || !_.isString(name))
				return;
			if (!model || !(model instanceof Backbone.Model))
				return;

			app.setModel(name, model, {register:false});
			if (_.isUndefined(options.register) || !_.isEmpty(options.register))
				this._registerModels(name);
		},
		setModels : function(models, options){
			var names;

			if (!models || !_.isObject(models))
				return;

			names = _.keys(models);
			app.setModels(models, { register: false});

			if (_.isUndefined(options.register) || !_.isEmpty(options.register))
				this._registerModels(names);

			return this;
		},
		setView : function(name, view, options){
			var app = this.app;
			if (!app)
				return;
			if (!name || !_.isString(name))
				return;
			if (!view || !(view instanceof Backbone.View))
				return;

			app.setView(name, view, {register:false});
			if (_.isUndefined(options.register) || !_.isEmpty(options.register))
				this._registerViews(name);
		},
		setViews : function(views, options){
			var names;

			if (!views || !_.isObject(views))
				return;

			names = _.keys(views);
			app.setViews(views, { register: false});

			if (_.isUndefined(options.register) || !_.isEmpty(options.register))
				this._registerViews(names);

			return this;
		},
		setBehaviour : function(name, behaviour, options){
			var app = this.app;
			var _options;

			if (!app)
				return;
			if (!name || !_.isString(name))
				return;
			if (!behaviour || !(behaviour instanceof Backbone.Behaviour))
				return;

			_options = _.extend(options, { register : false});
			app.attachBehaviour(name, behaviour, _options);
			if (_.isUndefined(options.register) || !_.isEmpty(options.register))
				this._registerBehaviours(name);
			return this;
		},
		setBehaviours  : function(behaviours, options){
			var names;
			var _options;

			if (!behaviours || !_.isObject(behaviours))
				return;

			_options = _.extend(options, { register : false});
			names = _.keys(behaviours);
			app.attachBehaviours(behaviours, _options);

			if (_.isUndefined(options.register) || !_.isEmpty(options.register))
				this._registerBehaviours(names);

			return this;
		},
		getRouters : function(names){
			if (!this.app)
				return;

			names = this._preprocessNames(names);
			return this.app.getRouters(names);
		},
		getModels : function(names){
			if (!this.app)
				return;

			names = this._preprocessNames(names);
			return this.app.getModels(names);
		},
		getViews : function(names){
			if (!this.app)
				return;

			names = this._preprocessNames(names);
			return this.app.getViews(names);
		},
		getBehaviours : function(names){
			if (!this.app)
				return;
			
			names = this._preprocessNames(names);
			return this.app.getBehaviours()
		}
}));