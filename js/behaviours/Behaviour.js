Behaviour = Backbone.Object.extend({
	initialize: function(attrs, options){
		Behaviour.__super__.initialize();
		this.bid = _.uniqueId('b');
		this.links = {};
	},
	attachLink: function(name, listener, sender, event, context, handler){
		 if (!name || !_.isString(name))
			 return;
		 if (!listener){
			 listener = Backbone.Events;
		 }
		 
		 this.links[name] = { name : name, listener: listener, event: event,
				 sender: sender, context: context, handler:handler};
		 
		 return this;
	},
	attachLinks : function(links){
		if (!links || !_.isObject(links)){
			return;
		}
		_.each(links, function(link, name, list){
			this.attachLink(name, link.listener, link.sender, 
					link.event, link.context, link.handler);
		}, this);
		
		return this;
	},
	attachReceiver : function(name, listener, event, context, handler){
		if (!name || !_.isString(name))
			 return;
		 if (!listener){
			 listener = Backbone.Events;
		 }
		 
		 this.links[name] = { name : name, listener: listener,  
				 event:event, context: context, handler:handler};
		 return this;
	},
	attachReceivers : function(receivers){
		if (!receivers || !_.isObject(receivers)){
			return;
		}
		_.each(receivers, function(receiver, name, list){
			this.attachReceivier(name, receiver.listener,  
					receiver.event, receiver.context, receiver.handler);
		}, this);
		return this;
	},
	detachLink: function(name){
		if (!name || !_.isString(name))
			 return;
		if (!this.links[name])
			return;
		this._unbindLink(name);
		this.links[name] = null;
		return this;
	},
	detachLinks : function(linkNames){
		if (!linkNames || !_.isArray(linkNames))
			return;
		
		_.each(linkNames, function(list, name, index){
			this.detachLink(name);
		}, this)
		return this;
	},
	detachReceiver : function(name){
		return this.detachLink(name);
	},
	detachReceivers : function(receiverNames){
		return this.detachLinks(receiverNames);
	},
	bind : function(name){
		if (name){
			this._bindLink(name);
		}
		else {
			_.each(this.links, function(link, name, list){
				this._bindLink(name);
			}, this);
		}
		
		return this;
	},
	unbind : function(name){
		if (name){
			this._unbindLink(name);
		}
		else {
			_.each(this.links, function(link, name, list){
				this._unbindLink(name);
			}, this);
		}
		return this;
	},
	_bindLink : function(name){
		if (!name || !_.isString(name))
			return;
		if (!(link = this.links[name]))
			return;
		if (link.binded === true)
			return;
		
		if (link.sender){
			if (link.context){
				link.listener.listenTo(link.sender, link.event, function(){
					link.handler.apply(link.context, arguments);
				});
			}
			else {
				link.listener.listenTo(link.sender, link.event, link.handler)
			}
		}
		else {
			link.listener.on(link.event, link.handler, link.context);
		}
		link.binded = true;
	},
	_unbindLink : function(name){
		if (!name || !_.isString(name))
			return;
		if (!(link = this.links[name]))
			return;
		if (!link.binded)
			return;
		
		if (link.sender){
			link.listener.stopListening(link.sender, link.event);
		}
		else {
			link.listener.off(link.event, link.handler, link.context);
		}
		delete link['binded'];
	}
});