Ext.define('Scrum.view.feedviewer.article.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.app-articlegrid',

    cls: 'app-feed-grid',
    disabled: true,

    requires: ['Ext.ux.PreviewPlugin', 'Ext.toolbar.Toolbar'],
    
    border: false,
    viewConfig: {
        plugins: [{
            pluginId: 'preview',
            ptype: 'preview',
            bodyField: 'description',
            previewExpanded: true
        }]
    },
    columns: [{
        text: 'Name',
        dataIndex: 'name',
        flex: 1,
        renderer: this.formatName
    }],
    dockedItems:[{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            text: 'Add',
            action: 'add'
        }]
    }],

    /**
     * Title renderer
     * @private
     */
    formatName: function(value, p, record) {
        return Ext.String.format('<div class="topic"><b>{0}</b></div>', value);
    }
});