Ext.define('Scrum.view.sprint.form.CreateForm', {
	extend : 'Ext.form.Panel',
	xtype : 'scrum-sprint-create-form',
	layout : { type : 'anchor'},
	padding : 10,
	url : '/sprint/create',
	require : [
		'Ext.ux.statusbar.StatusBar'
	],
	tbar : Ext.create('Ext.ux.statusbar.StatusBar', {
		hidden : true,
		cls : 'scrum-form-top-status-bar'
	}),
	onInvalidFields : function(){
		var statusBar = this.down('statusbar');

		statusBar.removeCls('ok').addCls('error').show();
		statusBar.setStatus( { iconCls : 'x-status-error', text : '<span class="status-string">Fill required fields or correct invalids</span>'});
		statusBar.show();
	},
	onSuccessfulCreation : function(userstory){
		var statusBar = this.down('statusbar');
		statusBar.removeCls('error').addCls('ok').show();
		statusBar.setStatus( 
		{ 
			iconCls : 'x-status-ok', 
			text : Ext.String.format('<span class="status-string">Sprint "{0}" have successfully created</span>', sprint.get('name')) 
		});
		statusBar.show();
	},
	initComponent : function(){
		Ext.apply(this, {
			items : [
				{ xtype : 'hiddenfield', name : 'project_id'},
				{ 
					xtype : 'textfield',
					name : 'name',
					width : 250,
					allowBlank : false,
					fieldLabel : 'Name', 
					labelAlign : 'top'
				},
				{ 
					xtype : 'htmleditor',
					fieldLabel : 'Description',
				 	height : 450,
				 	width : 550,
				 	labelAlign : 'top',
				 	name : 'description'
			 	},
			 	{
			 		xtype : 'checkbox',
			 		action : 'continue_create',
			 		fieldLabel : 'Continue create'
			 	}
			]
		});
		this.callParent();
	},
	bbar : {
		cls : 'scrum-form-bottom-bar'
	},
	buttonAlign : 'left',
	buttons : [
		{ text : 'Save', action : 'submit'}
	]
});