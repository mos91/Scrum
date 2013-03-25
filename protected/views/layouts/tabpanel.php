<div class="navbar navbar-inverse navbar-fixed-top">
<div class="navbar-inner">
<div class="container">
<?php
	if (!Yii::app()->user->isGuest){
		$activeProjectId = Yii::app()->user->getState('product-id');
		$userId = Yii::app()->user->getState('user-id');
		
		$user = UserRecord::model()->with('projects')->findByPk($userId);
		foreach($user->projects as $key => $project){
			if ($project->getAttribute('id') == $activeProjectId){
				$activeProject = $project;
				break;
			}
		}
	} 
?>
<?php if(Yii::app()->user->isGuest):?>
<a class="brand" href="/site/index">Scrum</a>
<?php else:?>
<ul class="nav"><li class="dropdown"><a class="brand dropdown-toggle" data-toggle="dropdown" href="#">
<?php echo $activeProject->name?><b class="caret"></b></a>
<ul class="dropdown-menu">
	<?php 
	echo '<li><a data-id="'.$activeProject->getAttribute('id').'" href="/project/change"><i class="icon-ok"></i> '.$activeProject->name.'</a></li>';
	if (!empty($user->projects)) echo '<li class="divider"></li>';
	foreach($user->projects as $id => $project){
		$projectId = $project->getAttribute('id'); 
		if ($projectId <> $activeProjectId) 
			echo '<li><a data-id="'.$project->getAttribute('id').'" href="/project/change"><i class="icon-book"></i> '.$project->name.'</a></li>';	
	}
	
	echo '<li class="divider"></li><li class="action-add"><a href="#"><i class="icon-plus"></i> Add New</a></li>';
	?>
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
