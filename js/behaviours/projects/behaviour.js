ProjectsBehaviour = Behaviour.extend({
	bindModelsAndViews : function(models, views){
		var listeners = {};
		var counters = {};	
		var collections = {}, collection;

		_.each(models, function(model, name){ 
			if (name.split('.')[0] === 'projects')
				collections[name] = model;
		});

		_.each(models, function(model, name){
			if (name.split('.')[0] === 'counters')
				counters[name] = model;
		})

		_.each(collections, function(model, key, list){
			view = views[key];
			/*
				each tableview, associated with collection must redraw itself after collection have changed
			*/
			listeners[key + '.change.tableview'] = {
				listener : view,
				senders : _.fill(3, model),
				events : ['add', 'remove', 'reset'],
				fns : [view.add, view.remove, view.render]
			};
			/*
				each counter, associated with collection must change itself  and redraw 
				after collection have changed.
			*/
		}, this);

		_.each(counters, function(counter, key, list){
			var parts = key.split('.');
			var _key = parts[1] + '.' + parts[2];
			collection = collections[_key];

			listeners[_key + '.change.counter'] = {
				listener : counter,
				senders : _.fill(3, collection),
				events : ['add', 'remove', 'reset'],
				fns : [counter.add, counter.sub, counter.reset]
			}

			listeners['counters.' + _key + '.change.view'] = {
				listener : views['projects.groups'],
				senders : counter,
				events : 'change',
				fns : views['projects.groups'].onCounter
			}
		});

		this.attachListeners(listeners);
	}
})