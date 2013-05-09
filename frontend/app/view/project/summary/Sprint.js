Ext.define('Scrum.view.project.summary.Sprint', {
	extend : 'Ext.form.FieldSet', 
	require : [
		'Scrum.view.project.ProgressBar'
	],
	xtype : 'scrum-sprintsummary',
	margin : 5,
	title : 'In Current Sprint',
	labelWidth : 75,
	collapsible : true,
	header : false,
	fill : function(record){
		var total = record.get('total');

		this.down('panel').update(record.getData());
		this.down('#todo').updateProgress(record.get('todo') / total);
		this.down('#totest').updateProgress(record.get('totest') / total);
		this.down('#done').updateProgress(record.get('done') / total);
		this.down('#completed').updateProgress(record.get('completed') / total);	
	},
	items : [
		{
			tpl : '<div>Total items in sprint - {total}</div>' + 
			'<div>Items for todo - {todo},' + 
			' for test - {totest}, done by user - {done},' + 
			' completed - {completed}</div>',
			border : false,
			height : 16
		},
		Ext.create('Scrum.view.project.ProgressBar', {
			itemId : 'todo',
			text : 'Todo'
		}),
		Ext.create('Scrum.view.project.ProgressBar', {
			itemId : 'totest',
			text : 'To test'
		}),
		Ext.create('Scrum.view.project.ProgressBar', {
			itemId : 'done',
			text : 'Done'
		}),
		Ext.create('Scrum.view.project.ProgressBar', {
			itemId : 'completed',
			text : 'Completed'
		})
	]
});