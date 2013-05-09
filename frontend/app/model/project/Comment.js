Ext.define('Scrum.model.project.Comment', {
	extend : 'Ext.data.Model',
	fields : [
		{ name : 'id', type : 'int'},
		{ name : 'content', type : 'string'},
		{ name : 'author', type : 'string'},
		{ 
			name : 'post_date', 
			type : 'date',
			sortType : function(date){
				return date.getTime();
			},
			convert : function(value, record){
				return new Date(value * 1000);
			}
		}
	]
})