Ext.define('Scrum.view.sprint.form.EditForm', {
	extend : 'Ext.form.Panel',
	xtype : 'scrum-sprint-edit-form',
	layout : { type : 'anchor'},
	padding : 10,
	url : '/sprints/update',
	require : [
		'Ext.ux.statusbar.StatusBar'
	],
	tbar : Ext.create('Ext.ux.statusbar.StatusBar', {
		hidden : true,
		cls : 'scrum-form-top-status-bar'
	}),
	onInvalidFields : function(){
		var statusBar = this.down('statusbar');

		statusBar.addCls('error').show();
		statusBar.setStatus( { iconCls : 'x-status-error', text : '<span class="status-string">Fill required fields or correct invalids</span>'});
		statusBar.show();
	},
	items : [
		{ xtype : 'hiddenfield', name : 'id'},
		{ 
			xtype : 'textfield',
			name : 'name',
			width : 200,
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
	 	}
	],
	bbar : {
		cls : 'scrum-form-bottom-bar'
	},
	buttonAlign : 'left',
	buttons : [
		{ text : 'Save', action : 'submit'}
	]
});