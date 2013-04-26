TrashedProjectsTableView = Tableview.extend({
	initialize : function(options){
		TrashedProjectsTableView.__super__.initialize.apply(this);
		
		var $header = this.$header = $(
			'<h4>Trashed Projects Review</h4></hr>' + 
			'<div class="btn-group">' + 
			'<a href="#project/changeGroup?' + $.param({ fromGroup : 'trashed', toGroup:'live', action:'restore', 'id' : 'all'}) + '" class="btn btn-small"><i class="icon-arrow-up"></i> Restore</a></div>' + 
			'<div class="btn-group pull-right">' + 
			'<a href="#project/refresh" class="btn btn-small pull-right" ><i class="icon-repeat"></i> Refresh</a></div><hr/>');
		var $table = $('<div><table id="trashed_projects_table" class="table table-condensed table-hover"><thead></thead><tbody></tbody></table></div>');

		this.inline = new InlineDropdown({ 
			title : 'Actions',
			embedTo : 'td:last', 
			triggerOn : 'table', 
			delegateTo : 'tr.active-row',
			items : [
						{ id:'trashed_restore', title : 'Restore', icon:'icon-arrow-up' , href : '#/project/changeGroup?' + $.param({ fromGroup: 'trashed', toGroup:'live', action:'restore', id:''}) }, 
					]
		});
		this.tblId = _.uniqueId('tbl');
		$('thead', $table).append(
		  '<th class="span1"><input class="check-all" type="checkbox"></th>'  +
	      '<th class="span2">Name</th>' + 
	      '<th class="span2"></th>');
		this.$table = $('table',$table).dataTable({
		'sDom' : '<"row-fluid"<"span6"l><"span4 pull-right"f>r>t<"row-fluid"<"span6"i><"span5 pull-right"p>>',
		"sPaginationType": "bootstrap",
		"fnRowCallback" : function(nRow, aData){
			$(nRow).addClass("active-row");
			$(nRow).data('id', aData.id);
			$(nRow).attr('record-id', aData.id);
		},
		"aoColumns" : [
			{"sDefaultContent" : '<input class="check-row" type="checkbox">'},
			{"mData" : "name", "mRender" : function(name){ return '<strong>' + name + '</strong>';}},
			{"sDefaultContent" : '', 'sClass' : 'actions-col'}
		]});

		this.$container = $table;
	}
});