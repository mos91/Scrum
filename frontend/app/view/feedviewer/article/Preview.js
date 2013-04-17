Ext.define('Scrum.view.feedviewer.article.Preview', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.app-articlepreview',

    cls: 'app-preview',
    autoScroll: true,
    border: false,
    initComponent: function() {
        Ext.apply(this, {
            tpl: new Ext.XTemplate(
                '<div class="post-data">',
                    '<h3 class="post-title">{name}</h3>',
                '</div>',
                '<div class="post-body">{description:this.getBody}</div>', {

                getBody: function(value, all) {
                    return Ext.util.Format.stripScripts(value);
                }
            })
        });

        this.callParent(arguments);
    }
});
