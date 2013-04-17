Ext.define('Scrum.controller.feedviewer.Feeds', {
	extend : 'Ext.app.Controller',
	stores: ['Projects'],
	refs : [
		{ ref : 'feedList' , selector : 'app-feedlist'},
		{ ref : 'articleGrid', selector : 'app-articlegrid'}
	],

	init : function(){
		this.control({
          'treepanel' : {
                itemclick: this.loadFeed
            }  
        });
	},
	loadFeed: function(self, projectGroup) {
        var grid = this.getArticleGrid(),store;
        store = projectGroup.raw.store;

        if (store){
        	store.load();
        	grid.enable();
        	grid.reconfigure(store);
        }	
    }
});