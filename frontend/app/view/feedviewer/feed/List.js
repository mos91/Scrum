Ext.define('Scrum.view.feedviewer.feed.List', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.app-feedlist',
    requires : [
      'Scrum.store.Projects',
      'Scrum.model.ProjectGroup'
    ],
    title: 'Project Groups',
    collapsible: true,
    animCollapse: true,
    margins: '5 0 5 5',
    layout: 'fit',
    items  : [
      {
          xtype: 'treepanel',
          layout : 'fit',
          lines: false,

          store : Ext.create('Ext.data.TreeStore', { 
            model : 'Scrum.model.ProjectGroup',
            root : {
            children : [
              { 
                text : 'Favorites', 
                leaf: true, 
                store : Ext.create('Scrum.store.Projects', { 
                  proxy : {
                      type : 'ajax',
                      url : '/project/get?favorite=1',
                      reader : {
                        type : 'json',
                        root: 'projects',
                            successProperty: 'success'
                      }
                    }}) 
              }, 
              { 
                text : 'All', 
                leaf: true, 
                store : Ext.create('Scrum.store.Projects', {
                  proxy : {
                      type : 'ajax',
                      url : '/project/get?live=1',
                      reader : {
                        type : 'json',
                        root: 'projects',
                            successProperty: 'success'
                      }
                  }
                })
              }, 
              { 
                text : 'Trashed', 
                leaf : true, 
                store : Ext.create('Scrum.store.Projects', {
                  proxy : {
                      type : 'ajax',
                      url : '/project/get?trashed=1',
                      reader : {
                        type : 'json',
                        root: 'projects',
                            successProperty: 'success'
                      }
                  }
                })
              }
            ]
          }}),
        rootVisible : false
      }
    ]
});
