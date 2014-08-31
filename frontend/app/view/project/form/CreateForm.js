Ext.define('Scrum.view.project.form.CreateForm', {
	extend : 'Ext.form.Panel',
	xtype : 'scrum-project-create-form',
	url : '/project/create',
	layout : { type : 'anchor'},
	padding : 10,
	items : [
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