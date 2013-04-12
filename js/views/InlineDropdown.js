InlineDropdown = Backbone.View.extend({
	initialize : function(attributes, options){
		this.dropdownTitle  = attributes.dropdownTitle; 
		this.delegateTo = attributes.delegateTo;
		this.embedTo = attributes.embedTo;
		this.triggerOn = attributes.triggerOn;
		this.items = attributes.items;
	},
	embedTo : function(selector){
		if (selector && _.isString(selector))
		this.embedTo = selector;
	},
	triggerOn : function(selector){
		if (selector && _.isString(selector))
		this.triggerOn = selector;
	},
	delegateTo: function(selector){
		if (selector && _.isString(selector))
			this.delegateTo = selector;
	},
	setItems : function(items){
		if (items && _.isArray(items))
		this.items = items;
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