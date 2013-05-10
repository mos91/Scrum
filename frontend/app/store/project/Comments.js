Ext.define('Scrum.store.project.Comments', {
	require : [
		'Scrum.model.project.Comment'
	],
	extend : 'Ext.data.Store',
	model : 'Scrum.model.project.Comment',
	/*sortInfo: {
	    property: 'post_date',
	    direction: 'ASC'
    },*/
	proxy : {
		type : 'ajax',
		url : '/project/get?comments=1',
		reader : {
			type : 'json',
			root : 'comments',
			successProperty: 'success',
			totalProperty : 'totalCount'
		}
	}
});