//import
/*$(document).ready(function(){
	$('script[src*="main.js"]').before();
});*/
Main = MVCComponent.extend({
	attach : function(app){
		if (!app || !(app instanceof MVCApplication))
			return;
		
		app.setViews({'errorPopup' : new Alert()});
	},
	detach : function(app){
		
	},
});


$(document).ready(function(){
	if ($.cookies.get('login')){
		app = MVCApplication.getInstance();
		app.setComponent('main', new Main());
	}
})