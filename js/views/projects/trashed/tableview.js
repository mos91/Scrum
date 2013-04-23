TrashedProjectsTableView = Tableview.extend({
	initialize : function(options){
		TrashedProjectsTableView.__super__.initialize.apply(this);
		this.on('onAfterShow', this.onAfterShow, this);
		this.on('onBeforeShow', this.onBeforeShow, this);
		this.on('onAfterHide', this.onAfterHide, this);
		this.on('onBeforeHide', this.onBeforeHide, this);
		var $header = this.$header = $(
			'<h4>Trashed Projects Review</h4></hr>' + 
			'<div class="btn-group">' + 
			'<a href="#project/restore" class="btn btn-small"><i class="icon-arrow-up"></i> Restore</a></div>' + 
			'<div class="btn-group pull-right">' + 
			'<a href="#project/refresh" class="btn btn-small pull-right" ><i class="icon-repeat"></i> Refresh</a></div><hr/>');
		var $table = this.$table = $('<table id="trashed_projects_table" class="table table-condensed table-hover"><thead></thead><tbody></tbody></table>');
		
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
		this.$table.dataTable({
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
	},
	onAfterShow : function(){
		var checkAll = $('input.check-all');

		TrashedProjectsTableView.__super__.onAfterShow.apply(this);
		$(this.el).prepend(this.$header);
		checkAll.on('change', this.checkAll);
		$('input.check-row').on('change', this.checkRow);

		checkAll[0].checked = false;
	},
	onAfterHide : function(){
		$('input.check-all').off('change');
		$('input.check-row').off('change');	
	},
	checkAll : function(){
		var checked = $('input.check-row:checked');
		var notChecked = $('input.check-row:not(:checked)');

		if (!notChecked.length){
			checked.click();
		}
		else {
			$(this)[0].checked = true;
			notChecked.click();
		}
	},
	checkRow : function(){
		var $el = $(this)
		$el.closest('tr').attr('checked', $el.get(0).checked);
	}
});