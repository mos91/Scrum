Ext.define('Scrum.controller.feedviewer.Articles', {
	extend : 'Ext.app.Controller', 
	stores : ['Projects'],
	models : ['Project'],
	views : ['feedviewer.article.Grid', 'feedviewer.article.Preview'],

	refs : [
		{ ref : 'feedlist', selector : 'app-feedlist treepanel'},
		{ ref : 'articlePreview', selector : 'app-articlepreview'}
	],
	init : function(){
		this.control({
			'app-articlegrid' : {
				selectionchange : this.previewArticle
			},
			'app-articlegrid > tableview' : {
				//itemdblclick: this.loadArticle,
                refresh: this.onRefresh
			},
			'app-articlegrid button[action="add"]' : {
				click : this.addArticle
			}
		});
	},
	previewArticle : function(grid, articles){
		var article = articles[0],
            articlePreview = this.getArticlePreview();

        if (article) {
            //articlePreview.article = article;
    		articlePreview.update(article.data);
        }
	},
	addArticle : function(){

	},
	onRefresh : function(view){
		var feedlist = this.getFeedlist();
		var selectedProjectGroup = feedlist.getSelectionModel().getSelection();
		var store,first;

		if (selectedProjectGroup.length){
			selectedProjectGroup = selectedProjectGroup[0];
			store = selectedProjectGroup.raw.store;
		}
		else {
			store = this.getProjectsStore();
		}

		first = store.getAt(0);
		if (first) {
            view.getSelectionModel().select(first);
        }
	}
})