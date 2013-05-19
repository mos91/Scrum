/*
 * File: app/view/sprint/SprintManager.js
 *
 * This file was generated by Sencha Architect version 2.2.2.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.2.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Scrum.view.sprint.SprintManager', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.scrum-sprint-manager',

    requires: [
        'Scrum.view.sprint.Grid',
        'Scrum.view.sprint.RightPart'
    ],
    layout: {
        align: 'stretch',
        type: 'hbox'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'scrum-sprint-grid',
                    flex: 1
                },
                {
                    xtype: 'scrum-sprint-right-part',
                    flex: 1
                }
            ]
        });

        me.callParent(arguments);
    }

});