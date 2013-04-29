AcceptedUserStoriesTableView = Tableview.extend({
	initialize : function(options){
		AcceptedUserStoriesTableView.__super__.initialize.apply(this);

		var $header = this.$header = $('<h4>Accepted User Stories</h4></hr>' + 
		'<div class="btn-group">' + 
			'<a href="#userstories/changeGroup?' + $.param({ fromGroup:'accepted', toGroup:'new', action:'deny', id:'all'}) + '" class="btn btn-small"><i class="icon-remove"></i> Deny</a>' + 
			'<a href="#userstories/changeGroup?' + $.param({ fromGroup:'accepted', toGroup:'assigned', action:'access', id:'all'}) + '" class="btn btn-small"><i class="icon-tag"></i> Assign to Active Sprint</a>' + 
			'<a href="#userstories/pick/sprint" class="btn btn-small"><i class="icon-hand-up"></i> Assign to Sprint</a>' + 
		'</div>' + 
		'<div class="btn-group pull-right">' + 
			'<a href="#userstories/refresh" class="btn btn-small pull-right" ><i class="icon-repeat"></i> Refresh</a>' + 
		'</div><hr/>');
		var $table =  $('<div><table id="accepted_userstories_table" class="table table-condensed table-hover"><thead></thead><tbody></tbody></table></div>');
		this.inline = new InlineDropdown({ 
			title : 'Actions',
			embedTo : 'td:last', 
			triggerOn : 'table', 
			delegateTo : 'tr.active-row',
			items : [
					{ id :'accepted_edit', title : 'Edit', icon:'icon-pencil', href : '#userstories/accepted/edit/'}, 
					{ id :'accepted_assign_to_active_sprint', title : 'Assign to active Sprint', icon:'icon-tag', href : '#userstories/changeGroup?' + $.param({ fromGroup : 'accepted', toGroup : 'assigned', action:'assign', id:''})},
					{ id :'accepted_assign_to_sprint', title:'Assign to Sprint', icon:'icon-hand-up', href:'#userstories/pick/sprint'},
					{ id :'accepted_deny', title : 'Deny', icon:'icon-remove' , href : '#userstories/changeGroup?' + $.param({ fromGroup: 'accepted', toGroup:'new', action:'deny', id:''}) }, 
					{ id :'accepted_view', title : 'View', icon:'icon-search', href : '/userstories/get?id='}
					]
		});
		this.tblId = _.uniqueId('tbl');
		$('thead', $table).append(
		  '<th class="span1"><input class="check-all" type="checkbox"></th>'  +
	      '<th class="span2">Name</th>' + 
	      '<th class="span2">Description</th>' +
	      '<th class="span1">Estimate</th>' + 
	      '<th class="span1">Priority</th>' +
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
			{"mData" : "description", "sClass" : 'description-col', "mRender" : function(description, type, list){
				descriptionHtml = '<span>' + description.substr(0,144) + '</span>';
				if (description.length >= 144){
					descriptionHtml += '<span class="read-more-string"><a href="#">Read more</a></span>';
					descriptionHtml += '<span class="hide">' + description.substr(144, description.length) + '</span>';
					descriptionHtml += '<span class="hide-string"><a href="#">Hide</a></span>';
				}
				return descriptionHtml;
			}},
			{"mData" : 'estimate'},
			{"mData" : 'priority'},
			{"sDefaultContent" : '', 'sClass' : 'actions-col'}
		]});
		
		this.$container = $table;
	}
});