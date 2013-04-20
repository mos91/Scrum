Application = Backbone.Object.extend({
	initialize : function(attributes, options){
		var name = attributes.name;
		Application.__super__.initialize.apply(this);
		this.appId =  _.uniqueId('app');

		this.name = (attributes.name && _.isString(name))? name : appId;
		this.names = {};
		this.indexes = {};
		this.names['behaviours'] = [];
		this.indexes['behavours'] = {};

		//this.binded = {};
		this.alreadyStarted = false;
	},
	start : function(){
		if (!this.alreadyStarted){
			this.trigger('onStart', this);
			this.alreadyStarted = true;
			Backbone.history.start();
		}
	},
	_registerBehaviour : function(name){
		var behaviourNames = this.names['behaviours'];
		var behaviourIndexes = this.indexes['behaviours'];

		if (!behaviourNames){
			behaviourNames = [];
			behaviourIndexes = {};
		}
		behaviourNames.push(name);
		behaviourIndexes[name] = behaviourNames.length - 1;
	},
	attachBehaviour : function(name, behaviour, options){
		var options = (options && _.isObject(options))? options : {};
		if (!name || !_.isString(name))
			return;
		if (!behaviour || !(behaviour instanceof Behaviour))
			return;
		if (!this.behaviours[name]){
			this.behaviours[name] = behaviour;

			if (_.isUndefined(options.bindOnAttach) || !_.isEmpty(options.bindOnAttach)){
				linksToBind = (options.linksToBind  && _.isArray(options.linkToBind))? options.linksToBind: [];
				behaviour.bind(linksToBind);
			}
				
		}
		return this;
	},
	attachBehaviours : function(behaviours, options){
		if (!behaviours || !_.isObject(behaviours))
			return;
		
		_.each(behaviours, function(behaviour, name){
			this.attachBehaviour(name, behaviour, options[name]);
		}, this);
		
		return this;
	},
	detachBehaviour : function(name, options){
		if (!name || !_.isString(name))
			return;
		if (this.behaviour[name]){
			this.behaviour[name] = null;

			if (_.isUndefined(options.unbindOnDetach) || !_.isEmpty(options.unbindOnDetach)){
				linksToUnbind = (options.linksToUnbind  && _.isArray(options.linksToUnbind))? options.linksToUnbind: [];
			}
		}
		return this;
	},
	detachBehaviours : function(names, options){
		if (!names || !_.isArray(names))
			return;
		_.each(names, function(name){
			this.detachBehaviour(name, options[name]);
		}, this)
		return this;
	}
}, {
	instance : null,
	getInstance : function(){
		if (!this.instance){
			this.instance = new Application();
		}
		return this.instance;
	}
});