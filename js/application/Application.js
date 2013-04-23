Application = Backbone.Object.extend({
	initialize : function(attributes, options){
		Application.__super__.initialize.apply(this, arguments);
		attributes = attributes || {};
		var appId = this.appId =  _.uniqueId('app');
		
		this.name = (attributes.name && _.isString(attributes.name))? attributes.name : appId;
		/*names of objects which are currently registered in application*/
		this.names = {};
		this.hash = {};
		this.names['behaviours'] = [];
		this.hash['behaviours'] = {};

		this.behaviours = {};
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
	keepBehaviour : function(name){
		this.names['behaviours'].push(name);
		this.hash['behaviours'][name] = true;
	},
	forgotBehavior : function(name){
		var names = this.names['behaviours'];
		var index = _.indexOf(names,name);
		names = names.splice(index, index + 1);

		delete this.hash['behaviours'][name];
	},
	attachBehaviour : function(name, behaviour, options){
		var options = (options && _.isObject(options))? options : {};
		if (!name || !_.isString(name))
			return;
		if (!behaviour || !(behaviour instanceof Behaviour))
			return;

		if (!this.behaviours[name]){
			this.behaviours[name] = behaviour;				
			this.keepBehaviour();
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
		if (this.behaviours[name]){
			this.behaviours[name] = null;
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