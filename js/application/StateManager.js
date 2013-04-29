/*read-only*/
StateManager = Backbone.Object.extend({
	initialize : function(){
		this.state = { name : $.cookies.get('state-cookie')};
		this.state['values'] = $.cookies.getHashedState(this.state['name']);
	},
	getId : function(){
		var state = this.state || [];
		return state[0];
	},
	getName : function(){
		var state = this.state || [];
		return state[1];
	},	
	getDuration : function(){
		var state = this.state || [];
		return state[2];
	},
	getState : function(stateName){
		var state = this.state || {};
		var stateStorage = (!_.isUndefined(this.state.values))? this.state.values : {};
		if (_.isString(stateName)){
			return stateStorage[stateName];	
		}
		
		return stateStorage;
	},
	hasState : function(stateName){
		var state = this.state || {};
		var values;

		if (_.isUndefined(values = this.state.values) || _.isUndefined(values[stateName]))
			return false;
		
		return true;
	}
}, {
	instance : null,
	getInstance : function(){
		if (!this.instance){
			this.instance = new StateManager();
		}
		return this.instance;
	}
})