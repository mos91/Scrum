Alert = Backbone.View.extend({
	render : function(errorMessage){
		$('<div class="alert fade out">' + 
				'<button type="button" class="close" data-dismiss="alert">&times;</button>' + 
				'<strong>Warning!</strong> ' + errorMessage +   
				'</div>').appendTo('body').removeClass('out').addClass('in');
	}
})