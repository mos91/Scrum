Application = Backbone.Object.extend({
	initialize : function(attributes, options){
		Application.__super__.initialize();
		this.binded = {};
		this.alreadyStarted = false;
	},
	start : function(){
		if (!this.alreadyStarted){
			this.trigger('onStart', this);
			//
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
			if (options.bindOnAttach === true){
				this.binded[name] = true;
				behaviour.bind();
			}
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
			if (this.binded[name]){
				this.behavours[name].unbind();
				delete this.binded[name];
			}
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
	},
	_bind : function(names){
		if (!names || !_.isArray(names)){
			_.each(this.behaviours, function(behaviour,name){
				if (!this.binded[name] && behaviour){
					this.binded[name] = true;
					behaviour.bind();
				}
			}, this)
		}
		else {
			_.each(names, function(name){
				if (!this.binded[name] && this.behaviours[name]){
					this.binded[name] = true;
					this.behaviours[name].behaviour.bind();
				}
			},this);
		}
		
		return this;
	},
	_unbind : function(names){
		
		if (!names || !_.isArray(names)){
			_.each(this.behaviours, function(behaviour,name){
				if (this.binded[name] && behaviour){
					this.binded[name] = false;
					behaviour.unbind();
				}
			}, this);
		}
		else {
			_.each(names, function(name){
				if (this.binded[name] && this.behaviours[name]){
					this.binded[name] = false;
					behaviour.unbind();
				}
			},this);
		}
		 
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