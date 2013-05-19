Ext.define('Scrum.view.sprint.summary.SprintSummary', {
	extend : 'Ext.panel.Panel', 
	require : [
		'Scrum.view.ProgressBar'
	],
	xtype : 'scrum-sprint-summary',
	bodyCls : 'scrum-sprint-summary',
	margin : 5,
	items : [
		{
			xtype : 'fieldset',
			title : 'In Current Sprint',
			labelWidth : 75,
			collapsible : true,
			header : false,
			items : [
				{
					tpl : '<div>Total items in sprint - {total}</div>' + 
					'<div>Items for todo - {todo},' + 
					' for test - {totest}, done by user - {done},' + 
					' completed - {completed}</div>',
					border : false,
					margin : '5 5 5 10',
					height : 48
				},
				Ext.create('Scrum.view.ProgressBar', {
					itemId : 'todo',
					text : 'Todo'
				}),
				Ext.create('Scrum.view.ProgressBar', {
					itemId : 'totest',
					text : 'To test'
				}),
				Ext.create('Scrum.view.ProgressBar', {
					itemId : 'done',
					text : 'Done'
				}),
				Ext.create('Scrum.view.ProgressBar', {
					itemId : 'completed',
					text : 'Completed'
				})
			]
		}
	],
	fill : function(record){
		var total = record.get('total');
		var fieldset = this.down('fieldset');

		fieldset.down('panel').update(record.getData());
		fieldset.down('#todo').updateProgress(record.get('todo') / total);
		fieldset.down('#totest').updateProgress(record.get('totest') / total);
		fieldset.down('#done').updateProgress(record.get('done') / total);
		fieldset.down('#completed').updateProgress(record.get('completed') / total);	
	}
});