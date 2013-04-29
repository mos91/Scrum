$(document).ready(function(){
	var viewBehaviour = new BacklogBehaviour();
	var models = {	
				'counters.userstories.new' : new Counter({},{  name : 'counters.userstories.new', url : '/userstories/get?group=open&count=1'}),
				'counters.userstories.accepted' : new Counter({},{ name: 'counters.userstories.accepted', url :'/userstories/get?group=accepted&count=1' }),
				'counters.userstories.completed' : new Counter({},{ name:'counters.userstories.completed', url : '/userstories/get?group=completed&count=1'}),
				'counters.userstories.trashed' : new Counter({}, { name:'counters.userstories.trashed', url:'/userstories/get?group=trashed&count=1'}),

				'userstories.new' : new Collection([], { url : '/userstories/get?group=open&data=1'}),
				'userstories.accepted' : new Collection([], { url : '/userstories/get?group=accepted&data=1'}),
				'userstories.completed' : new Collection([], { url : '/userstories/get?group=completed&data=1'}),
				'userstorites.trashed' : new Collection([], {url:'/userstories/get?group=trashed&data=1'})
			};

	var views = {
		'userstories.groups' : new GroupsPanel(),
		'userstories.new' : new NewUserStoriesTableView(),
		'userstories.accepted' : new AcceptedUserStoriesTableView(),
		'userstories.completed' : new CompletedUserStoriesTableView(),
		'userstories.trashed' : new Tableview()
	};  

	router = new BacklogRouter({ models : models, views : views});
	/*viewBehaviour.bindModelsAndViews(models, views);
	viewBehaviour.bindRoutersAndViews({ 'userstories' : router }, views);*/
	
	models['counters.userstories.new'].fetch();
	models['counters.userstories.accepted'].fetch();
	models['counters.userstories.completed'].fetch();
	models['counters.userstories.trashed'].fetch();
	
	$.when(
		models['userstories.new'].fetch({ reset : true})	
	)
	.done(function(){
		router.navigate('#/backlog/startup/new');
	});

	$(document).on('click', '.read-more-string', function(){
		$(this).next('.hide').show();
		$(this).hide();
		$(this).siblings('.hide-string').show();
	});

	$(document).on('click', '.hide-string',function(){
		$(this).hide();
		$(this).prev('.hide').hide();
		$(this).siblings('.read-more-string').show();
	});

	/*var currentPopover;
	$(document).on('mouseenter', '.sprint-list .group-item', function(){
		$('.sprint-inline-actions').remove();
		$('span.badge', this).after('<span class="sprint-inline-actions"><a title="Assign User stories" href="#userstories/assign"><i class="icon-plus-sign"></i></a></span>')
	});

	$(document).on('mouseleave', '.sprint-list', function(){
		$('.sprint-inline-actions').remove();
	});*/

	/*$('.sprint-list .group-item').popover({ 
		});*/
})