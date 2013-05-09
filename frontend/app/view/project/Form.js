Ext.define('Scrum.view.project.Form', {
	extend : 'Ext.panel.Panel',
	layout : {type : 'vbox'},
	xtype : 'scrum-projectform',
	items : [{
		xtype : 'form',
		url : '/project/update',
		padding : 10,
		items : [
			{ xtype : 'hiddenfield', name : 'id'},
			{ 
				xtype : 'fieldcontainer',
				layout : 'vbox',
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
					 	width : 800,
					 	labelAlign : 'top',
					 	name : 'description'
				 	}
				]
			}
		],
		bbar : {
			cls : 'scrum-projectform-bottom-bar'
		},
		buttonAlign : 'left',
		buttons : [
			{ text : 'Save', action : 'submit'}
		]
	}] 
});