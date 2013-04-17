Ext.define('Scrum.controller.TopPanel', {
    extend: 'Ext.app.Controller',

    requires : [
        'Scrum.view.feedviewer.feed.Viewer',
        'Scrum.view.feedviewer.feed.List'
    ],
    stores : ['FavoriteProjects'],
    models : ['Project'],

    refs : [
    	{ 
    		ref : 'favoriteProjectList',
    		selector : '#projects_tab menu'
    	}
    ],
    init : function(){
    	this.control({
    		'#projects_tab' : {
    			click : this.onProjectsTabClick
    		},
            '#view_all_projects_button' : {
                click : this.onViewAllProjectsClick
            }
    	})
    }, 
    onProjectsTabClick : function(self, e){
        var fplist = this.getFavoriteProjectList();
    	var fpstore = this.getFavoriteProjectsStore();
        if (!fpstore.count()){
            fplist.setLoading({ text : 'Fetching...'});
            fpstore.load(function(){
                fpstore.each(function(project){
                    fplist.add({ text : project.get('name')});
                    fplist.setLoading(false);
                });    
            });     
        }
    },
    onViewAllProjectsClick : function(self, e){
        var projectsTabContent = Ext.getCmp('projects_tab_content');
        var feedlist, feedviewer;

        if (!projectsTabContent.items.length){
            feedlist = { 
                width: 225,
                region : 'west',
                xtype: 'app-feedlist'
            };
            feedviewer = {
                region : 'center',
                xtype: 'app-feedviewer'
            };
            projectsTabContent.add(feedlist);
            projectsTabContent.add(feedviewer);
        }   
    }
});