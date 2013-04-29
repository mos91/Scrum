<?php
$this->pageTitle=Yii::app()->name .' | Projects';
$this->clips['containerCssClass'] = 'container';
?>

<?php $this->beginClip('styles')?>
	<link rel="stylesheet" type="text/css" href="/css/tableview.css"> 
	<link rel="stylesheet" type="text/css" href="/assets/jquery.dataTables.extensions/bootstrapped-dataTable.css">
<?php $this->endClip('styles')?>

<?php $this->beginClip('libs')?>
	<script src="/assets/jquery.dataTables.1.9.4.js" type="text/javascript"></script>
	<script src="/assets/jquery.dataTables.extensions/bootstrapped-dataTable.js" type="text/javascript"></script>
<?php $this->endClip('libs')?>

<?php $this->beginClip('widgets')?>
	<script src="/js/views/InlineDropdown.js" type="text/javascript"></script>
<?php $this->endClip('widgets')?>

<?php $this->beginClip('routers')?>
	<script src="/js/routers/ProjectsRouter.js" type="text/javascript"></script>
<?php $this->endClip('routers')?>

<?php $this->beginClip('behaviours');?>
	<script src="/js/behaviours/projects/behaviour.js" type="text/javascript"></script>
<?php $this->endClip('behaviours');?>

<?php $this->beginClip('views');?>
	<script src="/js/views/GroupsPanel.js" type="text/javascript"></script>
	<script src="/js/views/Tableview.js" type="text/javascript"></script>
	<script src="/js/views/projects/favorite/tableview.js" type="text/javascript"></script>
	<script src="/js/views/projects/live/tableview.js" type="text/javascript"></script>
	<script src="/js/views/projects/trashed/tableview.js" type="text/javascript"></script>
<?php $this->endClip('views');?>

<?php $this->beginClip('models')?>
	<script src="/js/models/Model.js" type="text/javascript"></script>
	<script src="/js/models/Collection.js" type="text/javascript"></script>
	<script src="/js/models/Counter.js" type="text/javascript"></script>
<?php $this->endClip('models');?>

<?php $this->beginClip('script');?>
	<script src="/js/projects.js" type="text/javascript"></script>
<?php $this->endClip('script')?>

<div class="row-fluid">
<div class="span3">
	<div class="well sidebar-nav affix group-panel">
		<ul class="nav nav-list">
			<li class="nav-header">Live projects</li>
			<li id="projects.favorite" class="group-item"><a href="#project/change/favorite">Favorites<span id="counters.projects.favorite" class="pull-right badge badge-info"></span></a></li>
			<li id="projects.live" class="group-item"><a href="#project/change/live">Active projects<span id="counters.projects.live" class="pull-right badge badge-info"></span></a></li>
			<li class="divider"></li>
			<li id="projects.trashed" class="group-item"><a href="#project/change/trashed">Trash<span id="counters.projects.trashed" class="pull-right badge"></span></a></li>
		</ul>
	</div>
</div>

<div class="span9">
	<div class="tableview-section well">
	</div>
</div>


</div>