/*
	Behaviour.js
	
	"Link":
	senderA                listenerA
	***         event1      ***    fire
	* *-------------------->* *------------>(handlerX)
	***                     ***

	"Tuple":
	senderA                listenerA
	***         event1     ***     fire
	* *------------------->* *------------->(handlerX)
	* *------------------->* *
	* *         event2     ***
	***

	"Dispatcher"
	senderA                listenerA
	***         event1     ***     fire on event1
	* *------------------->* *------------->(handlerX)
	* *------------------->* *------------->(handlerY)
	* *         event2     ***	   fire on event2
	***

	"Closure"
				     senderA(listenerA)
				     ***
				fire * *--------|
	 (handlerX)<-----* *        | event1
				     * *<-------|
				     ***

	"ClosingReceiver"
					senderA(listenerA)
					***---------------------|
			fire    * *---------|           |
	(handlerX)<-----* *         | event1    | event2
					* *<--------|           |
					* *---------------------|
					***
	"ClosingDispatcher" 
				fire	senderA(listenerA)
	(handlerY)<-----***---------------------|
			fire    * *---------|           |
	(handlerX)<-----* *         | event1    | event2
					* *<--------|           |
					* *---------------------|
					***

	"Receiver"
	senderA				listenerA
	***                *******         fire
	* *      event1    *     * ---------------->(handlerX)
	* *--------------->*     *
	* *                *******
	***				    ^
    senderB             | event2
	***                 |
	* *                 |
	* *-----------------|
	* *
	***


	"DispatchingReceiver"
	senderA				listenerA
	***                *******         fire
	* *      event1    *     * ---------------->(handlerX)
	* *--------------->*     *         fire
	* *                *******----------------->(handlerY)
	***				    ^
    senderB             | event2
	***                 |
	* *                 |
	* *-----------------|
	* *
	***	
*/
Behaviour = Backbone.Object.extend({
	initialize: function(attrs, options){
		Behaviour.__super__.initialize.apply(this, arguments);
		this.bid = _.uniqueId('b');
		this._binds = {};
		this.listeners = {};
	},
	/*
		@name attachListener
		@param name - <String>,
		@param listener - <<Backbone.Object>>,
		@param senders - <<Object>> or [] of <<Backbone.Object>s>
		@param events - <String> or [] of <String>
		@param fns - <Object> like { handler : <Function>, context : <Object>}
		@param options <Object> like { bindOnAttach : false, once : false}
		-bindOnAttach - whether to bind listener with all it links immediately after attach
		-once - whether to bind handler, which has executed one time
	*/
	attachListener : function(name, listener, senders, events, fns, options){
		var _names = [];
		var aligned;
		var _options = (!_.isUndefined(options))? options : { once : false, bindOnAttach : true};

		if (_.isUndefined(name) || !_.isString(name))
			return; 

		if (!_.isObject(fns) && !_.isArray(fns))
			fns = { handler : _.noop()};

		if (_.isUndefined(this.listeners[name])) 
			this.listeners[name] = {};

		if (!_.isObject(listener)){
			 listener = Backbone.Events;
		}

		if (_.isObject(senders) && !_.isArray(senders)){
			senders = [senders];
		}

		if (_.isString(events)){
			events = [events];
		}

		if (_.isObject(fns) && !_.isArray(fns)){
			fns = [fns];
		}

		aligned = _.align(senders, events, fns);
		_.each(aligned[1], function(event, index, list){
			if (_.isUndefined(event))
				list[index] = 'all';
		});
		_.each(aligned[2], function(fn, index, list){	
			if (_.isUndefined(fn)){
				list[index] = { context : null, handler : _.noop()} ;
			}
			else if (_.isFunction(fn)){
				list[index] = { context : null, handler : fn }
			}
		});

		_.each(aligned[0], function(sender, index, list){
			var _name = _.uniqueId();
			var once = _options.once;
			_names.push(name + '.' + _name);
			this.listeners[name][_name] = { name : _name, listener : listener, event : aligned[1][index],
				sender : aligned[0][index], context : aligned[2][index].context, once : once,
				handler : aligned[2][index].handler};
		}, this);

		if (_.isUndefined(_options.bindOnAttach) || (_options.bindOnAttach === true)){
			this.bindLinks(_names);
		}
		
		return this;
	},
	/*
		@name attachListeners
		@param listeners - {} of <Object> with key meaning listener names, and 
		values of type <Object> like 
		{
			listener: <<Backbone.Object>>, 
			senders : <<Backbone.Object>> or [] of <<Backbone.Object>>,
			events : <String> or [] of <String>,
			fns : <Object> like { handler : <Function>, context : <Object>},
			options : <Object> like { bindOnAttach : false, once : false}
		}
	*/
	attachListeners : function(listeners, options){
		var listenerOptions;
		var args;
		if (_.isUndefined(listeners) || !_.isObject(listeners)){
			return;
		}
		_.each(listeners, function(listener, name, list){
			args = _.args(listener, ['listener', 'senders', 'events','fns', 'options']);
			args.unshift(name);
			this.attachListener.apply(this, args);
		}, this);
		
		return this;
	},
	detachLink : function(name, options){
		var path,listenerName, linkName;
		var listener;
		var links;
		var fullName,fullNames;

		if (_.isUndefined(name) || !_.isString(name))
			 return;
		path = name.split('.');	
		listenerName = path[0];
		linkName = path[1];

		if (!(listener = this.listeners[listenerName]))
			return;

		if (linkName === '*'){
			links = _.keys(listener);
			fullNames = _.map(links, function(name, key, list){
				fullName = listenerName + '.' + name;
				return fullName;
			}, this);

			this.unbindLinks(fullNames);
		}
		else {	
			this._unbindLink(name);
		}
	},
	detachLinks : function(linkNames, options){
		if (_.isUndefined(linkNames) || !_.isArray(linkNames))
			return;

		_.each(linkNames, function(name, index, list){
			this.detachLink(name);
		}, this);
	},
	detachListener: function(name, options){
		var links;
		var fullname;
		if (_.isUndefined(name) || !_.isString(name))
			 return;

		this.detachLink(name + '.*');
		
		return this;
	},
	detachListeners : function(listenerNames, options){
		if (_.isUndefined(listenerNames) || !_.isArray(listenerNames))
			return;
		
		_.each(listenerNames, function(name, index, list){
			this.detachListener(name);
		}, this);
		return this;
	},
	bindLinks : function(names, options){
		var name;

		if (_.isArray(names)){
			_.each(names, function(name, index, list){
				this._bindLink(name);
			}, this);
		}
		else if (_.isString(names)){
			name = names;
			this._bindLink(name);
		}
		
		return this;
	},
	unbindLinks : function(names, options){
		var name;
		if (_.isArray(names)){
			_.each(names, function(name, index, list){
				this._unbindLink(name);		
			}, this);
		}
		else if (_.isString(names)){
			name = names;
			this._unbindLink(name);
		}

		return this;
	},
	_bindLink : function(name){
		var listener,listenerName, linkName, link;
		var parts;
		var fn;

		if (!name || !_.isString(name))
			return;
		if (this._binds[name] === true)
			return;

		parts = name.split('.');
		linkName = parts[parts.length - 1];
		parts.pop();
		listenerName = parts.join('.');
		
		if (!(listener = this.listeners[listenerName]))
			return;
		
		if (!(link = listener[linkName]))
			return;

		if (link.sender){
			if (link.once === true)
				fn = 'listenToOnce';
			else
				fn = 'listenTo';

			if (link.context){
				link.listener[fn](link.sender, link.event, function(){
					link.handler.apply(link.context, arguments);
				});
			}
			else {
				link.listener[fn](link.sender, link.event, link.handler)
			}
		}
		else {
			if (link.once === true)
				fn = 'once';
			else
				fn = 'on';
			link.listener[fn](link.event, link.handler, link.context);
		}
		this._binds[name] = true;
	},
	_unbindLink : function(name){
		var listener,listenerName,linkName, link;
		var context;

		if (!name || !_.isString(name))
			return;
		if (this._binds[name] !== true)
			return;
		parts = name.split('.');
		linkName = parts[parts.length - 1];
		parts.pop();
		listenerName = parts.join('.');

		if (!(listener = this.listeners[listenerName]))
			return;
		if (!(link = listener[linkName]))
			return;
		
		if (link.sender){
			if (link.context){
				link.listener.stopListening(link.sender, link.event, context);
			}
			else
				link.listener.stopListening(link.sender, link.event);
		}
		else {
			link.listener.off(link.event, link.handler, link.context);
		}
		delete this._binds[name];
		listener[linkName] = null;
 	}
});