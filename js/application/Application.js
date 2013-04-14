Application = Backbone.Object.extend({
	initialize : function(attributes, options){
		Application.__super__.initialize();
		this.binded = {};
		this.alreadyStarted = false;
	},
	start : function(){
		if (!this.alreadyStarted){
			this.trigger('onStart', this);
			this.alreadyStarted = true;
			Backbone.history.start();
		}
	},
	attachBehaviour : function(name, behaviour, options){
		var options = (options && _.isObject(options))? options : {};
		if (!name || !_.isString(name))
			return;
		if (!behaviour || !(behaviour instanceof Behaviour))
			return;
		if (!this.behaviours[name]){
			this.behaviours[name] = behaviour;
		}
		return this;
	},
	attachBehaviours : function(behaviours){
		if (!behaviours || !_.isObject(behaviours))
			return;
		
		_.each(behaviours, function(behaviour, name){
			this.attachBehaviour(name, behaviour);
		}, this);
		
		return this;
	},
	detachBehaviour : function(name){
		if (!name || !_.isString(name))
			return;
		if (this.behaviour[name]){
			this.behaviour[name] = null;
		}
		return this;
	},
	detachBehaviours : function(names){
		if (!names || !_.isArray(names))
			return;
		_.each(names, function(name){
			this.detachBehaviour(name);
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