UserStories = Backbone.Collection.extend({
	name : 'userStories',
	onActiveProjectChange : function(){
		this.fetch({ url : '/userstories/get', data:{limit:10}}).error(function(){
			Backbone.Events.trigger('error', 'User stories have not fetched from server!');
		});
	},
	onAdd : function(data){
		if (data.userStory)
			this.add(data.userStory);
	}
})