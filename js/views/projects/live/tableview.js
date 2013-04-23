LiveProjectsTableView = Tableview.extend({

	initialize : function(options){
		LiveProjectsTableView.__super__.initialize.apply(this);
		this.on('onAfterShow', this.onAfterShow, this);
		this.on('onBeforeShow', this.onBeforeShow, this);
		this.on('onAfterHide', this.onAfterHide, this);
		this.on('onBeforeHide', this.onBeforeHide, this);
		var $header = this.$header = $('<h4>Projects Review</h4></hr>' + 
			'<div class="btn-group">' + 
			'<a href="#project/changeGroup?' + $.param({fromGroup: 'live', toGroup : 'trashed', action:'drop', id:'all'}) + '" class="btn btn-small"><i class="icon-trash"></i> Trash</a>' + 
			'<a href="#project/changeGroup?' + $.param({fromGroup : 'live', toGroup : 'favorite', action:'grant', id:'all'}) + '" class="btn btn-small"><i class="icon-star"></i> Grant</a>' + 
			'<a href="#project/create" class="btn btn-small"><i class="icon-plus"></i> Add</a></div>' + 
			'<div class="btn-group pull-right">' + 
			'<a href="#project/refresh" class="btn btn-small" ><i class="icon-repeat"></i> Refresh</a></div><hr/>');

		var $table = this.$table = $('<table id="live_projects_table" class="table table-condensed table-hover"><thead></thead><tbody></tbody></table>');		
		this.tblId = _.uniqueId('tbl');
		this.inline = new InlineDropdown({ 
			title : 'Actions',
			embedTo : 'td:last', 
			triggerOn : 'table', 
			delegateTo : 'tr.active-row',
			items : [
					{ id :'live_edit', title : 'Edit', icon:'icon-pencil', href : '#/project/live/edit/'}, 
					{ id:'live_drop', title : 'Drop', icon:'icon-trash' , href : '#/project/changeGroup?' + $.param({fromGroup:'live', toGroup:'trashed', action:'drop', id:''}) }, 
					{ id:'live_grant', title : 'Grant', icon : 'icon-star', href: '#/project/changeGroup?' + $.param({fromGroup:'live', toGroup:'favorite', action:'grant', id:''}) },
					{ id:'live_view', title : 'View', icon:'icon-search', href : '/project/get/?id='}
					]
		});

		$('thead', $table).append(
		  '<th class="span1"><input class="check-all" type="checkbox"></th>'  +
	      '<th class="span2">Name</th>' + 
	      '<th class="span2">Description</th>' + 
	      '<th class="span2"></th>');
		this.$table.dataTable({'sDom' : '<"row-fluid"<"span6"l><"span4 pull-right"f>r>t<"row-fluid"<"span6"i><"span5 pull-right"p>>',
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
			{"sDefaultContent" : '', 'sClass' : 'actions-col'}
		]});
	},
	onAfterShow : function(){
		var checkAll = $('input.check-all');

		LiveProjectsTableView.__super__.onAfterShow.apply(this);
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