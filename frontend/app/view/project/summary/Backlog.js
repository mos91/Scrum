Ext.define('Scrum.view.project.summary.Backlog', {
	extend : 'Ext.form.FieldSet',
	require : [
		'Scrum.view.project.ProgressBar'
	],
	xtype : 'scrum-backlogsummary',
	margin : 5,
	title : 'In Backlog',
	labelWidth : 75,
	collapsible : true,
	header : false,
	fill : function(record){
		var total = record.get('total');

		this.down('panel').update(record.getData());
		this.down('#open').updateProgress(record.get('open') / total);
		this.down('#closed').updateProgress(record.get('closed') / total);
		this.down('#accepted').updateProgress(record.get('accepted') / total);		
	},
	items : [
		{
			tpl : '<div class="summary-header">Total items in backlog - {total}</div>' + 
				  '<div class="summary-header">New items in backlog - {open}, ' + 
				  'accepted - {accepted} </div>' + 
				  '<div class="summary-header">closed - {closed}</div>',
			border : false,
			height : 48
		},
		Ext.create('Scrum.view.project.ProgressBar', {
			itemId : 'open',
			text : 'Open'
		}),
		Ext.create('Scrum.view.project.ProgressBar', {
			itemId : 'accepted',
			text : 'Accepted'
		}),
		Ext.create('Scrum.view.project.ProgressBar', {
			itemId : 'closed',
			text : 'Closed'
		})
	]
})