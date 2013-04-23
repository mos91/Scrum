Tableview = Backbone.View.extend({
	el : '.tableview-section',
	initialize : function(){
	},
	show : function(){
		this.trigger('onBeforeShow');
		$(this.el).empty();

		$(this.el).append(this.$table);
		this.trigger('onAfterShow');
	},
	hide : function(){
		this.trigger('onBeforeHide');
		$(this.el).empty();
		this.trigger('onAfterHide');
	},
	//when models add to collection, listen to it on 'change' events
	onAdd : function(model, collection, options){
		this.listenTo(model, 'change', this.update);
	},
	//add row element associated with passed model
	add : function(model){
		if (model instanceof Backbone.Model)
			model = model.toJSON();

		this.$table.fnAddData(model);
	},
	//update row element associated with passed model
	update : function(model){
		var nTr = $('tr[record-id="' + model.id + '"]', $table);

		if (model instanceof Backbone.Model)
			model = model.toJSON();

		$table.fnUpdateRow(model, nTr);
	},
	//delete associated row with passed model
	remove : function(model){
		var nTr = $('tr[record-id="' + model.id + '"]', $table);
		$table.fnDeleteRow(nTr);
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
			attrsString += '[' + key +'="' + value + '"]';
		});

		return $('tr' + attrsString);
	},
	//return primary keys for each passed row
	keys : function(trs){
		return $(trs).map(function(index, tr){ return tr.attr('record-id')});
	},
	onAfterShow : function(){
		this.inline.bind();
		this.listenTo(this.inline, 'onAfterShow', function(triggerOn, embedTo){
			var links = $('li > a', embedTo);
			var id = $(triggerOn).data('id');
			links.map(function(index, link){ 
				link.href = link.href + id;
			});
		});
	},
	onAfterHide : function(){
		this.inline.unbind();
		this.stopListening(this.inline, 'onAfterShow');
	}
})

