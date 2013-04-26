$(document).ready(function(){
	var viewBehaviour = new BacklogBehaviour();
	var models = {	
				'counters.userstories.new' : new Counter({},{  name : 'counters.userstories.new', url : '/userstories/get?new=1&count=1'}),
				'counters.userstories.accepted' : new Counter({},{ name: 'counters.userstories.accepted', url :'/userstories/get?accepted=1&count=1' }),
				'counters.userstories.assigned' : new Counter({}, { name: 'counters.userstories.assigned', url:'/userstories/get?assigned=1&count=1'}),
				'counters.userstories.todo' : new Counter({}, { name: 'counters.userstories.todo', url:'/userstories/get?todo=1&count=1'}),
				'counters.userstories.totest' : new Counter({}, { name: 'counters.userstories.totest', url:'/userstories/get?totest=1&count=1'}),
				'counters.userstories.done' : new Counter({}, { name:'counters.userstories.done', url:'/userstories/get?done=1&count=1'}),
				'counters.userstories.complete' : new Counter({}, { name:'counters.userstories.complete', url:'/userstories/get?complete=1&count=1'}),
				'counters.userstories.trashed' : new Counter({}, { name:'counters.userstories.trashed', url:'/userstories/get?trashed=1&count=1'}),

				'userstories.new' : new Collection([], { url : '/userstories/get?new=1&data=1'}),
				'userstories.accepted' : new Collection([], { url : '/userstories/get?accepted=1&data=1'}),
				'userstories.assigned' : new Collection([], { url : '/userstories/get?assigned=1&data=1'}),
				'userstories.todo' : new Collection([], { url :'/userstories/get?todo=1&data=1'}),
				'userstories.totest' : new Collection([], { url:'/userstories/get?totest=1&data=1'}),
				'userstories.done' : new Collection([], { url:'/userstories/get?done=1&data=1'}),
				'userstories.complete' : new Collection([], {url:'/userstories/get?complete=1&data=1'}),
				'userstorites.trashed' : new Collection([], {url:'/userstories/get?trashed=1&data=1'})
			};

	var views = {
		'userstories.groups' : new UserstoriesGroups(),
		'userstories.new' : new Tableview(),
		'userstories.accepted' : new Tableview(),
		'userstories.assigned' : new Tableview(),
		'userstories.todo' : new Tableview(),
		'userstories.totest' : new Tableview(),
		'userstories.done' : new Tableview(),
		'userstories.complete' : new Tableview(),
		'userstories.trashed' : new Tableview()
	};  

	viewBehaviour.bindModelsAndViews({models:models, views:views});

	router = new BacklogRouter({ models : models, views : views});

	$.when(
		models['counters.userstories.new'].fetch(), 
		models['counters.userstories.accepted'].fetch(),
		models['counters.userstories.assigned'].fetch(),
		models['counters.userstories.todo'].fetch(),
		models['counters.userstories.totest'].fetch(),
		models['counters.userstories.done'].fetch(),
		models['counters.userstories.complete'].fetch(),
		models['counters.userstories.trashed'].fetch(),
		models['userstories.new'].fetch({ reset : true})	
	)
	.done(function(){
		router.navigate('#/userstories/startup/new');
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
})