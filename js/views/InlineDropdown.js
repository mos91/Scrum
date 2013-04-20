InlineDropdown = Backbone.View.extend({
	initialize : function(options){
		var defaults = { embedTo : 'body', triggerOn : 'body', delegateTo : null, title : 'Dropdown', items : [] };
		options = (_.isUndefined(options))? _.defaults(options, defaults) : defaults;

		this.dropdownTitle  = options.title; 
		this.delegateTo = options.delegateTo;
		this.embedTo = options.embedTo;
		this.triggerOn = options.triggerOn;
		this.items = options.items;
	},
	embedTo : function(selector){
		if (selector && _.isString(selector))
		this.embedTo = selector;

		return this;
	},
	triggerOn : function(selector){
		if (selector && _.isString(selector))
			this.triggerOn = selector;

		return this;
	},
	delegateTo: function(selector){
		if (_.isString(selector))
			this.delegateTo = selector;

		return this;
	},
	setItems : function(items){
		if (_.isArray(items))
			this.items = items;

		return this;
	},
	setTitle : function(title){
		if (_.isString(title))
			this.dropdownTitle = title;
		return this;
	},
	bind : function(){
		var self = this;
		if (!this.triggerOn || !this.embedTo)
			return;
		
		if (!this.delegateTo){
			$(this.triggerOn).hover(function(){
				self.render(this);
			}, 
			function(){
				$(self.embedTo, this).empty();
			})
		}
		else {
			$(this.triggerOn).on('mouseenter', this.delegateTo, function(event){
				self.render(this);
			}).on('mouseleave', this.delegateTo, function(event){
				$(self.embedTo, this).empty();
			});
		}
	},
	unbind : function(){
		var self = this;

		if (!this.delegateTo){
			$(this.triggerOn).off('mouseenter,mouseleave');
		}
		else {
			$(this.triggerOn).off('mouseenter,mouseleave', this.delegateTo);	
		}
	},
	render : function($triggerOn){
		var html = '<div class="dropdown dropdown-actions pull-right">' + 
  		'<a class="dropdown-toggle" href="#" data-toggle="dropdown" data-target="#"' +  
  		' role="button">' + this.dropdownTitle + '<b class="caret"></b></a>' + 
  		'<ul class="dropdown-menu" role="menu" >' + 
  		this.renderItems($triggerOn) +
  		'</ul></div>'
  		$(this.embedTo, $triggerOn).html(html);
	},
	renderItems : function($triggerOn){
		var items = this.items, html = '', item, href;
		for(var i = 0;i < this.items.length;i++){
			item = this.items[i];
			
			if (_.isFunction(item.href))
				href = item.href.apply(this, [$triggerOn]);
			else
				href = item.href;
			
			html += '<li ' + ((item.id)? ('id="' + item.id + '"'):'') + ((item.id)? (' class="' + item.cssClass + '"'):'') + 
					'><a href="' + href + '">' +
					((item.icon)? ('<i class="' + item.icon+ '"></i> '):'') + item.title +  '</a></li>';
		}
		
		return html;
	}
})