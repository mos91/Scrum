Ext.define('Scrum.store.sprint.BurndownStatistic', {
	extend : 'Ext.data.Store',
	requires : ['Scrum.model.UserStory'],
	fields : [
		{ name : 'name', type : 'string'},
		{ name : 'sprint_estimate', type : 'int'},
		{ 
			name : 'complete_time',
			type : 'int',
			sortType : function(date){
				return date.getTime();
			},
			convert : function(value, record){
				if (Ext.isNumeric(value))
					return new Date(value * 1000);
				else if (Ext.isDate(value))
					return value;
			}
		}
	],
	proxy : {
		type: 'ajax',
        url: '/sprints/burndown',
        reader: {
	        type: 'json',
	        root: 'hits'
		}
	}
});