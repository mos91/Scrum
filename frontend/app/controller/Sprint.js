Ext.define('Scrum.controller.Sprint', {
	extend : 'Ext.app.Controller', 
	views : ['userstory.Backlog'],
	stores : ['Userstories'],
	models : ['UserStory'],
	init : function(){
		this.control({
			'scrum-backlog' : {
				viewSprint : { fn : this.drawSprintOverview, scope : this },
				render : { fn : this.setComponents ,  scope : this}
			},
			'scrum-userstory-sprint-overview' : {
				itemclick : { fn : this.showUserstoryProfile, scope : this},
				onCompleteEditStatus : { fn : this.changeUserStoryStatus, scope : this}
			}, 
			'scrum-userstory-sprint-overview gridview' : {
				attachToSprint : { fn : this.attachToSprint, scope : this}
				//detachFromSprint : { fn : this.detachFromSprint, scope : this}
			},
			'scrum-userstory-sprint-overview tool[action=create]' : {
				click : { fn : this.showUserstoryCreateForm , scope : this}
			},
			'scrum-userstory-sprint-overview tool[action=createSprint]' : {
				click : { fn : this.showSprintCreateForm, scope : this}
			},
			'scrum-userstory-sprint-overview tool[action=refresh]'	: {
				click : { fn : this.onRefreshGridClick, scope : this }
			}
		});
	},
	setComponents : function(backlog){
		this.backlog = backlog;
		this.grid = backlog.down('scrum-userstory-sprint-overview');
	},
	attachToSprint : function(model, sprint){
		model.save({
			url : '/userstories/changeSprint', 
			params : { id: model.get('id'), sprint_id : sprint.id },
			scope : this,
			callback : function(record, op){
				return true;
			}
		})
	}
});