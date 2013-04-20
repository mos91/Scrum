//MVC Component can attach to MVCApplication to fully customize logic
MVCComponent = Backbone.Object.extend({
	_.extend(MVCMixin, {
		initialize : function(attributes, options){
			var app = attributes.app;
			var name = attributes.name;
			var cmpId = this.cmpId = _.uniqueId('cmp');

			this.name = (name && _.isString(name))? name : cmpId;
			this.app = (app && app instanceof MVCApplication) ? attributes.app : null;
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
		attach : function(app) {},
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
		}
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
	})
});