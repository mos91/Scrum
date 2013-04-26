Popup = Backbone.View.extend({
	initialize : function(options){
		var defaults = {url : '', id : 'popup_form', title : 'Popup Form'};
		options = options || defaults;
		options = _.defaults(options, defaults);

		this.url = options.url;
		this.id = options.id;
		this.title = options.title? options.title:''; 
	},
	//ajax-handlers
	getContent : function(){ 
		return $.ajax({
			url : this.url,
			method : "GET",
			dataType : 'html'
		});	
	},
	getHtml : function(content){
		return '<div id="' + this.id + '" class="modal hide fade"><div class="modal-header">' +
			'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
		    '<h3>' + this.title + '</h3></div>' + 
		    '<div class="modal-body">' + 
		    	content + 
		    '</div>' + 
			'<div class="modal-footer">' + 
				this.getActionsHtml() + 
			'</div>';
	},
	getActionsHtml : function(){
		return '<button id="ok" class="btn">Ok</button>';
	},
	render : function(){
		var self = this;
		this.trigger('onBeforeShow');
		this.getContent().success(function(data){
			if (data) {
				self._render(data);
			}
		}).error(function(){self.trigger('error')});
		this.trigger('onAfterShow');
	},
	_render : function(data){
		$('body').append(this.getHtml(data));
		this.$el = $('#' + this.id);
		this.$el.modal().on('hidden', null, {self:this}, this.destroy);
		this.bindActions();
	},
	//events
	bindActions : function(){
		$('#ok').on('click', this.close);
	},
	undbindActions: function(){
		$('#ok').off('click');
	},
	destroy : function(e){
		var self = e.data.self;

		self.trigger('onBeforeHide');
		self.$el.remove();
		self.unbindActions();
		self.trigger('onAfterHide');
	},
	close : function(e){
		var self = e.data.self;
		self.$el.modal('hide');
	}
});


PopupForm = Popup.extend({
	submit : function(form){
		return $.ajax({
			url : this.url,
			type : "POST",
			dataType : 'json',
			data : $(form).serialize()
		});
	},
	getActionsHtml : function(){
		return '<button id="close" class="btn">Close</button>' + 
			   '<button id="submit" class="btn btn-primary">Submit</button>';
	},
	bindActions : function(){
		var self = this;
		$('#close').on('click', null, {self:this}, this.close);
		
		$('#submit').on('click', null, {self:this}, function(e){
			$('form').submit();
		});
		$('form', this.$el).submit(function(e){
			e.preventDefault();
			self.trigger('onBeforeSubmit');
			var request = self.submit(this).success(
			function(data){
				if (!data.error){
					//notify user about success submit
					self.$el.modal('hide');
					self.trigger('onAfterSubmit', data);
				}
				else {
					$('.modal-body').html(data.content);
				}
			}).error( function(){
				self.trigger('error');
			});
		});
	},
	unbindActions : function(){
		$('#close').off('click');
		$('#submit').off('click');
	}
});


