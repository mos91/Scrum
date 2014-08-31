Ext.define('Scrum.state.UserStateProvider', {
	extend : 'Ext.state.Provider',
	sha1_hash_length : 40,
	stateCookieToken : 'state-cookie',
	constructor : function(config){
		config = config || {};
		var me = this;

		Ext.apply(me, config);
		me.initState();
		me.mixins.observable.constructor.call(me);
	},
	//private 
	initState : function(){
		var me = this;
		var json;
		
		me.stateCookie = Ext.util.Cookies.get(me.stateCookieToken);
		me.rawCookieValue = Ext.util.Cookies.get(me.stateCookie);
		me.rawState = me.rawCookieValue.substr(me.sha1_hash_length, me.rawCookieValue.length);
		
		json = JSON.parse(me.rawState);
		me.state = { id : json[0], name : json[1], expires : json[2], values : json[3]};
	},
	get : function(name){
		if (name === 'id')
			return this.state['id'];
		else if (name === 'name')
			return this.state['name'];
		else
			return this.state.values[name];
	},
	set : function(){
		return false;
	},
	clear : function(){
		return false;
	},
	encodeValue : function(){
		return false;
	},
	decodeValue : function(){
		return false;
	}
});