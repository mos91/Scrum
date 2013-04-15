Ext.define('Scrum.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires:[
        'Ext.tab.Panel'
    ],

    layout: {
        type: 'fit'
    },
    id : 'app_viewport',
    items: [{
        xtype: 'tabpanel',
        id : 'app_tabpanel',
        cls : 'app-tabpanel',
        floating:false,
        items : [
            {  
                id : 'active_project_tab',
                title : 'Active Project',
                tabConfig : {
                    arrowAlign: 'bottom', 
                    menu : {
                        cls : 'app-menu', 
                        shadowOffset : -2,
                        items : [
                            { text : 'Show profile'},
                            { text : 'View all'},
                            { xtype : 'menuseparator'},
                            { text : 'Project 1'},
                            { text : 'Project 2'}
                        ]
                    }
               }
            },
            { 
                id : 'backlog_tab',
                title : 'Backlog'
            },
            {
                id : 'sprints_tab',
                title : 'Sprints'
            },
            {
                id : 'team_tab',
                title : 'Team'
            }
        ]
    }]
});