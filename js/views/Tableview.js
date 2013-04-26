/*abstract, do not instaniate it*/
Tableview = Backbone.View.extend({
	el : '.tableview-section',
	initialize : function(){
		this.on('onAfterShow', this.onAfterShow, this);
		this.on('onBeforeShow', this.onBeforeShow, this);
		this.on('onAfterHide', this.onAfterHide, this);
		this.on('onBeforeHide', this.onBeforeHide, this);
	},
	/*private*/
	/*public*/
	show : function(){
		this.trigger('onBeforeShow');
		$(this.el).empty();

		$(this.el).append(this.$container);
		this.trigger('onAfterShow');
	},
	hide : function(){
		this.trigger('onBeforeHide');
		$(this.el).empty();
		this.trigger('onAfterHide');
	},
	//add row element associated with passed model
	add : function(model){
		if (model instanceof Backbone.Model)
			model = model.toJSON();

		this.$table.fnAddData(model);
	},
	//update row element associated with passed model
	update : function(model){
		var nTr = $('tr[record-id="' + model.id + '"]', this.$table)[0];

		if (model instanceof Backbone.Model)
			model = model.toJSON();

		this.$table.fnUpdate(model, nTr);
	},
	//delete associated row with passed model
	remove : function(model){
		var nTr = $('tr[record-id="' + model.id + '"]', this.$table)[0];

		this.$table.fnDeleteRow(nTr);
	},
	//this will render entire collection
	render : function(collection){
		if (!(collection instanceof Collection))
			return;

		this.$table.fnClearTable();
		if (collection.length)
			this.$table.fnAddData(collection.toJSON());
	},
	//find row elements with specified attributes 
	where : function(attrs){
		var attrsString = '';
		_.each(attrs, function(value, key, list){
			if (key === 'checked')
				value = (value === true)? 'checked' : '';

			attrsString += '[' + key +'="' + value + '"]';
		});

		return $('tr' + attrsString);
	},
	//return primary keys for each passed row
	keys : function(trs){
		return _.map(trs, function(tr, index){
			return $(tr).data('id');
		});
	},
	/*events*/
	//when models add to collection, listen to it on 'change' events
	onAdd : function(model, collection, options){
		this.listenTo(model, 'change', this.update);
	},
	onAfterShow : function(){
		var checkAll = $('input.check-all');

		this.inline.bind();
		this.listenTo(this.inline, 'onAfterShow', function(triggerOn, embedTo){
			var links = $('li > a', embedTo);
			var id = $(triggerOn).data('id');
			links.map(function(index, link){ 
				link.href = link.href + id;
			});
		});

		$(this.el).prepend(this.$header);
		checkAll.on('change', this.checkAll);
		//bind handler on showed rows and others 
		$(this.$container).on('change', 'input.check-row', this.checkRow);

		checkAll[0].checked = false;
	},
	onAfterHide : function(){
		var checked = $('input.check-row:checked');
		var notChecked = $('input.check-row:not(:checked)');

		$('input.check-all').off('change');
		$(this.$container).off('change', 'input.check-row');

		this.inline.unbind();
		this.stopListening(this.inline, 'onAfterShow');
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
})

