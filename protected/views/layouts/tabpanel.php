<div class="navbar navbar-inverse navbar-fixed-top">
<div class="navbar-inner">
<div class="container">
<?php if(Yii::app()->user->isGuest):?>
<a class="brand" href="/site/index">Scrum</a>
<?php else:?>
<ul id="active_project" class="nav"><li class="dropdown"><a id="projects_dropdown_toggle" class="brand dropdown-toggle" 
	data-toggle="dropdown" href="#">
<?php $activeProject = Project::model()->findByPk(Yii::app()->user->getState('project-id'));echo $activeProject->name;?>
<b class="caret"></b></a>
<ul id="project_list" class="dropdown-menu">
</ul></li></ul>
<?php endif;?>

<div class="nav-collapse collapse">
<?php if(Yii::app()->user->isGuest):?>
<ul class="nav">
<li><a href="/site/index"><i class="icon-white icon-home"></i> Main</a></li>
<li class="divider-vertical"></li>
</ul>
<ul class="nav pull-right">
<li><a href="/auth/registration"><i class="icon-white icon-plus-sign"></i> Sign-up</a></li>
<li class="divider-vertical"></li>
<li><a href="/auth/login"><i class="icon-white icon-play-circle"></i> Sign-in</a></li>
<li class="divider-vertical"></li>
</ul>
</div></div></div></div>
<?php else:?>
<ul class="nav">
<li><a href="/site/index"><i class="icon-white icon-home"></i> Main</a></li>
<li class="divider-vertical"></li>
<li><a href="/project/index">Backlog</a></li>
<li class="divider-vertical"></li>
</ul>
<ul class="nav pull-right">
<li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">
	<?php echo 'Welcome, '.Yii::app()->user->getState('firstname');?><b class="caret"></b></a>
	<ul class="dropdown-menu">
		<li><a href="#"><i class="icon-cog"></i> Preferences</a></li>
		<li><a href="#"><i class="icon-envelope"></i> Contacts</a></li>
		<li class="divider"></li>
		<li><a href="/auth/logout"><i class="icon-off"></i> Logout</a></li>
	</ul>
</li>
<li class="divider-vertical"></li>
</ul>
</div></div></div></div>
<?php endif;?>
