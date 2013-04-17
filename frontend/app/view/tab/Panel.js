Ext.define('Scrum.view.tab.Panel', {
        extend : 'Ext.tab.Panel',
        xtype: 'app-tabpanel',
        cls : 'app-tabpanel',
        floating:false,

        items : [
            {  
                title : 'Projects',
                id : 'projects_tab_content',
                layout : 'border',
                tabConfig : {
                    id : 'projects_tab',
                    arrowAlign: 'bottom', 
                    menu : {
                        cls : 'app-menu', 
                        shadowOffset : -2,
                        items : [
                            { id : 'view_all_projects_button', text : 'View all'},
                            { xtype : 'menuseparator'}
                        ]
                    }
               }
            },
            { 
                title : 'Backlog',
                tabConfig : {
                    id : 'backlog_tab'
                }
            },
            {
                tabConfig : { id : 'sprints_tab' },
                title : 'Sprints'
            },
            {
                tabConfig : { id : 'team_tab' },
                title : 'Team'
            }
        ]   
})