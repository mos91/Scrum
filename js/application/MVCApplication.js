/*
 * MVC Mixin needed for multi inheritance feauture
 * do not call its methods directly
 * */
MVCMixin = {
	setModel : function(name, model){
		if (!name || !_.isString(name))
			return;
		if (!model || !(model instanceof Backbone.Model || model instanceof Backbone.Collection))
			return;
		this.models[name] = model;
		return this;
	},
	setModels : function(models){
		if (!models || !_.isObject(models))
			return;
		_.each(models, function(model, name){
			this.setModel(name, model);
		}, this);
		return this;
	},
	setView : function(name, view){
		if (!name || !_.isString(name))
			return;
		if (!view || !(view instanceof Backbone.View))
			return;
		this.views[name] = view;
		return this;
	},
	setViews : function(views){
		if (!views || !_.isObject(views))
			return;
		_.each(views, function(view, name){
			this.setView(name, view);
		}, this);
		return this;
	},
	setRouter : function(name, router){
		if (!router || !_.isString(name))
			return;
		if (!router || !(router instanceof Backbone.Router))
			return;
		this.routers[name] = router;
		return this;
	},
	setRouters : function(routers){
		if (!routers || !_.isObject(routers))
			return;
		_.each(routers, function(router, name){
			this.setRouter(name, router);
		}, this);
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
	}
}
/*
 * MVC Application is singleton object, which describes mvc component and reactions on user actions
 * */
MVCApplication = Application.extend(
	_.extend(MVCMixin, {
		initialize: function(attributes, options){
			var models = (attributes && _.isObject(attributes))? attributes.models : {};
			var views = (attributes && _.isObject(attributes))? attributes.views : {}; 
			var routers = (attributes && _.isObject(attributes))? attributes.routers : {};
			var behaviours = (attributes && _.isObject(attributes))? attributes.behaviours : {};
			MVCApplication.__super__.initialize();
			this.models = (models && _.isObject(models))? models:{};
			this.views = (views && _.isObject(views))? views:{};
			this.routers = (routers && _.isObject(routers))? routers:{};
			this.behaviours = (behaviours && _.isObject(behaviours))? behaviours:{};
			
			this.components = {};
		},
		setComponent : function(name, component){
			var c;
			if (!name || !(_.isString(name)))
				return;
			if (!component || !(component instanceof MVCComponent))
				return;
			if (!this.components[name]){
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
		}
	}), {
		getInstance : function(){
			if (!this.instance){
				this.instance = new MVCApplication();
			}
			return this.instance;
		}
	}
);
//MVC Component can attach to MVCApplication to fully customize logic
MVCComponent = Backbone.Object.extend({
	set : function(app) {},
	unset : function(app) {}
});