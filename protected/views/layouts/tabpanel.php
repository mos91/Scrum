<div class="navbar navbar-inverse navbar-fixed-top">
<div class="navbar-inner">
<div class="container">
<?php if(Yii::app()->user->isGuest):?>
<a class="brand" href="/site/index">Scrum</a>
<?php else:?>

<?php $projects = Project::model()->favorite(Yii::app()->user->getState('user-id'))->findAll();?>
<?php if (count($projects) > 0):?>
<ul id="active_project" class="nav"><li class="dropdown"><a id="projects_dropdown_toggle" class="brand dropdown-toggle" 
	data-toggle="dropdown" href="#">
<?php  
	if ($isActiveProject = Yii::app()->user->hasState('project-id')){
		$activeProjectId = Yii::app()->user->getState('project-id');
		$activeProject = Project::model()->findByPk($activeProjectId);		
		echo $activeProject->name;
	}
	else {
		echo 'Not selected';
	}
?>
<b class="caret"></b></a>
<ul id="project_list" class="dropdown-menu">
	<?php
		echo '<li><a href="/project/get"><i class="icon-search"></i> View Profile</a></li>';
		echo '<li><a href="/project/get?all=1"><i class="icon-th-list"></i> View all</a></li>';
		
			if ((isset($activeProjectId) && count($projects) > 1) || (!isset($activeProjectId) && count($projects) > 0)){
				echo '<li class="divider"></li>';
				foreach($projects as $project){
				if (!isset($activeProjectId) || ($project->id !== $activeProjectId)) 
					echo '<li><a href="/project/change/?id='.$project->id.'"><i class="icon-book"></i> '.$project->name.'</a></li>';
			}	
		}	
	?>
</ul></li></ul>
<?php else: ?>
<a class="brand" href="/project/create"><i class="icon-white icon-plus brand-icon"></i> Create project</a>
<?php endif;?>
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
<li <?php echo empty($isActiveProject)? ' class="disabled"' : ''?>><a <?php echo !empty($isActiveProject)? 'href="/userstories/get?all=1"': ''?>><i class="icon-white icon-folder-close"></i> Backlog</a></li>

<!--<?php if(empty($isActiveSprint)):?>
<li><a href="/sprints/create"><i class="icon-white icon-plus"></i> Plan Sprint</a></li>
<?php else:?>
<li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#">Sprints<b class="caret"></b></a>
<ul class="dropdown-menu">
	<li><a href="/sprints/get"><i class="icon-search"></i> View active</a></li>
	<li><a href="#sprints/stop"><i class="icon-remove"></i> Stop active</a></li>
	<li class="divider"></li>
	<li><a href="/sprints/get?all=1"><i class="icon-th-list"></i> View all</a></li>
	<li class="divider"></li>
	<li><a href="/sprints/create"><i class="icon-plus"></i> Plan new</a></li>
</ul></li>
<?php endif;?>-->

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
