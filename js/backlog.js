BacklogItem = Backbone.Model.extend({
	initialize : function(attributes, options){
		this.id = attributes.id;
		this.product_id = attributes.product_id;
		this.company_id = attributes.company_id;
		
		this.name = attributes.name;
		this.description = attributes.description;
		this.estimate = attributes.estimate;
		this.priority = attributes.priority;
		this.risk = attributes.risk;
		this.value = attributes.value;
		this.status = attributes.status;
		this.type = attributes.type;
		this.created_by = attributes.created_by;
		this.team = attributes.team;
	}
})

Backlog = Backbone.Collection.extend({
	model : BacklogItem
});

BacklogList = Backbone.View.extend({
	events : {
		
	},
	initialize : function(attributes, options){
		this.id = attributes.id;
		this.templateId = attributes.templateId;
		this.$el = $('#' + this.id);
	},
	render : function(){
		this.$el.html(_.template($('#' + this.templateId).html(), 
				{ backlog : this.collection.models , self : this }));
	},
	//тип backlog item'а (bug,feature,suggestion,other) => соответсвующий css-класс
	types : {
		0x01 : 'bug',
		0x02 : 'suggestion',
		0x03 : 'feature',
		0x04 : 'other'
	},
	/*статус backlog item'а(
	New, Ready for estimation, Ready For Sprint, 
	Assigned to sprint, To do, In Progress, 
	To test, Done, Sprint Complete) => соответствующее обозначение */
	statuses : function(statusCode){
		return this._statuses.invoke(statusCode);
	},
	_statuses : {
		list : {
			0x01 : { title : 'New'},
			0x02 : { title : 'Ready for estimation'},
			0x03 : { title : 'Ready for sprint'},
			0x04 : { title : 'Assigned to sprint'},
			0x05 : { title : 'To do'},
			0x06 : { title : 'In Progress'},
			0x07 : { title : 'To test'},
			0x08 : { title : 'Done'},
			0x09 : { title : 'Sprint Complete'}
		},
		classes : { 0x00 : 'label-important', 0x04 : 'label-warning', 0x08 : 'label-success'},
		classResolver : function(statusCode){
			return this.classes[statusCode & 0x0C]; 
		},
		invoke : function(statusCode){
			var str;
			var classResolver;
			
			if (!_.isNumber(statusCode))
				return;
			var o = (_.isObject(o = this.list[statusCode]))? o : {};
			
			(!_.has(o,'title'))? (o['title'] = '') : 0; 
			if (!_.has(o, 'class')){
				if (_.isFunction(this.classResolver)){
					o['class'] = this.classResolver(statusCode);
				}
				else {
					o['class'] = '';
				}
			}
			
			return o;
		}
	}
});

PRODUCT_ID = 'Scrum Project';
COMPANY_ID = 'Scrum & co';

backlog = new Backlog(
		[ 
		    new BacklogItem({ id : 1,
		    				  product_id : PRODUCT_ID,
		    				  company_id : COMPANY_ID, 
		    				  name: 'Backlog item 1', 
		    				  description : 'Donec sed odio dui. Cras justo odio,dapibus ac facilisis in, egestas eget quam...',
		    				  team: ['John Doe', 'Jack Shepard', 'Antony Hartmann'],
		    				  estimate : 10,
		    				  priority : 10,
		    				  risk : 10,
		    				  value : 10, 
		    				  status : 0x08,//Done
		    				  type : 0x01,//Bug
		    				  created_by : 'John Doe'
		    				  }),
		    new BacklogItem({ id : 2,
							  product_id : PRODUCT_ID,
							  company_id : COMPANY_ID, 
							  name: 'Backlog item 2', 
							  description : 'Donec sed odio dui. Cras justo odio,dapibus ac facilisis in, egestas eget quam...',
							  team: ['Gregory Ivanesko', 'Basil Kulish'],
							  estimate : 10,
							  priority : 10,
							  risk : 10,
							  value : 10, 
							  status : 0x08,//Done
							  type : 0x02,//Suggestion
							  created_by : 'John Doe'
		    }),
		    new BacklogItem({ id : 3,
							  product_id : PRODUCT_ID,
							  company_id : COMPANY_ID, 
							  name: 'Backlog item 3', 
							  description : 'Donec sed odio dui. Cras justo odio,dapibus ac facilisis in, egestas eget quam...',
							  team: ['James Mute'],
							  estimate : 10,
							  priority : 10,
							  risk : 10,
							  value : 10, 
							  status : 0x08,//Done
							  type : 0x03,//Feature
							  created_by : 'John Doe' 
		    }),
		    new BacklogItem({ id : 4,
							  product_id : PRODUCT_ID,
							  company_id : COMPANY_ID, 
							  name: 'Backlog item 4', 
							  description : 'Donec sed odio dui. Cras justo odio,dapibus ac facilisis in, egestas eget quam...',
							  team: [],
							  estimate : 10,
							  priority : 10,
							  risk : 10,
							  value : 10, 
							  status : 0x08,//Done
							  type : 0x04,//Other
							  created_by : 'John Doe'
		    	
		    })
		]);

$(document).ready(function(){
	backlogList = new BacklogList({ 
		id : "backlog",
		templateId : 'backlog-template',
		collection : backlog
	})
	backlogList.render();
})
