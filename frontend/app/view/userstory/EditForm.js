Ext.define('Scrum.view.userstory.EditForm', {
	extend : 'Ext.form.Panel',
	xtype : 'scrum-userstory-edit-form',
	layout : { type : 'anchor'},
	padding : 10,
	url : '/userstories/update',
	require : [
		'Ext.ux.statusbar.StatusBar'
	],
	items : [
		{ xtype : 'hiddenfield', name : 'project_id'},	
		{
			xtype : 'container',
			layout : { type : 'hbox', defaultMargins : '0 10 0 0'},
			items : [
				{
					xtype : 'numberfield',
					name: 'estimate',
					labelAlign : 'top',
					fieldLabel: 'Estimate',
					allowBlank : false,
					maxValue: 99,
					minValue: 0
				},
				{
					xtype : 'combo',
					name : 'priority',
					fieldLabel : 'Priority',
					labelAlign : 'top',
					allowBlank : false,
					displayField : 'name',
					valueField : 'value',
					store : Ext.create('Ext.data.Store', {
						fields : ['value', 'name'],
						data : [
							{ name : 'Low', value : 0},
							{ name : 'Medium', value : 1},
							{ name : 'High', value : 2} 
						]
					})
				}		
			]
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