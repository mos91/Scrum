Ext.define('Scrum.view.project.Form', {
	extend : 'Ext.form.Panel',
	xtype : 'scrum-projectform',
	url : '/project/update',
	layout : { type : 'anchor'},
	padding : 10,
	items : [
		{ xtype : 'hiddenfield', name : 'id'},
		{ 	
			xtype :'textfield', 
			fieldLabel : 'Project name',
			labelAlign : 'top',
			allowBlank : false,
			minLength : 1,
			name : 'name'
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