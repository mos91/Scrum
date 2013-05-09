 commentRenderingTemplate = new Ext.XTemplate(
 '<tpl for="."><div class="scrum-comment" id="{id}">' + 
//TODO : change src from gravar ... to custom identicon src
  '<div class="scrum-comment-meta">' + 
  	'<span><img class="avatar" width="25" height="25" src="http://www.gravatar.com/avatar/3dea782e580e0d4b8c733e4ec2d3a9c7?s=25&amp;r=PG&amp;d=identicon"/></span>' + 
  	'<div class="scrum-comment-author"><b>{author}</b></div>' + 
  	'<div class="scrum-comment-top-right">' + 
  		'<span class="scrum-comment-post-time" title="{[this.formatPostDate(values.post_date)]}">{[this.formatPostDate(values.post_date)]}</span>' +
  	'</div>' + 
  '</div>' +
  '<div class="scrum-comment-content">{content}</div>' + 
  '</div>' + 
'</tpl>', 
{
	formatPostDate : function(date){
		return Scrum.util.template.getPostDate(date);
	}
});

 Ext.define('Scrum.view.project.CommentPanel', {
	extend : 'Ext.panel.Panel',
	xtype : 'scrum-commentpanel',
	cls : 'scrum-commentpanel',
	require : [ 'Scrum.store.project.Comments'],
	layout : { type : 'border'},
	items : [
		Ext.create('Ext.view.View', {
			width : 900,
			region : 'center',
			cls : 'scrum-comments-list',
			overflowY : 'scroll',
			emptyText : '<span>There are no comments for this project yet</span>',
			itemSelector : '.scrum-comment-content',
			tpl : commentRenderingTemplate
		}),
		Ext.create('Ext.form.Panel', {
			region : 'north',
			title : 'Leave a comment',
			url : '/project/comment',
			cls : 'scrum-comment-form',
			labelAlign : 'top',
			buttonAlign : 'left',
			buttons : [
				{ text : 'Send' , action : 'submit'}
			],
			items : [
				{
					xtype : 'hiddenfield', name : 'author_id'
				},
				{
					xtype : 'hiddenfield', name : 'project_id'
				},
				{ 
					xtype : 'textarea', name : 'content',
					allowBlank : false,
					minLength : 1,
					width : 700,
					height : 100
				}
			]
		})
	]
})