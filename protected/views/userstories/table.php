<?php
$this->pageTitle=Yii::app()->name .' | Backlog';
$this->clips['containerCssClass'] = 'container';
?>

<?php $this->beginClip('styles')?>
	<link rel="stylesheet" type="text/css" href="/css/tableview.css">
	<link rel="stylesheet" type="text/css" href="/css/backlog.css"> 
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
	<script src="/js/routers/BacklogRouter.js" type="text/javascript"></script>
<?php $this->endClip('routers')?>

<?php $this->beginClip('behaviours');?>
	<script src="/js/behaviours/backlog/behaviour.js" type="text/javascript"></script>
<?php $this->endClip('behaviours');?>

<?php $this->beginClip('views');?>
	<script src="/js/views/GroupsPanel.js" type="text/javascript"></script>
	<script src="/js/views/Tableview.js" type="text/javascript"></script>
	<script src="/js/views/userstories/new/tableview.js" type="text/javascript"></script>
	<script src="/js/views/userstories/accepted/tableview.js" type="text/javascript"></script>
	<script src="/js/views/userstories/completed/tableview.js" type="text/javascript"></script>
<?php $this->endClip('views');?>

<?php $this->beginClip('models')?>
	<script src="/js/models/Model.js" type="text/javascript"></script>
	<script src="/js/models/Collection.js" type="text/javascript"></script>
	<script src="/js/models/Counter.js" type="text/javascript"></script>
<?php $this->endClip('models');?>

<?php $this->beginClip('script')?>
	<script src="/js/backlog.js" type="text/javascript"></script>
<?php $this->endClip('script')?>

<div class="row-fluid">
<div class="span3">
	<div class="well sidebar-nav affix group-panel">
		<ul class="nav nav-list">
			<li class="nav-header">Backlog</li>

			<li id="userstories.new" class="group-item"><a href="#backlog/change/new">New <span id="counters.userstories.new" class="pull-right badge badge-info">5</span></a></li>
			<li id="userstories.accepted" class="group-item"><a href="#backlog/change/accepted">Accepted <span id="counters.userstories.accepted" class="pull-right badge badge-info">3</span></a></li>
			<li id="userstories.completed" class="group-item"><a href="#backlog/change/completed">Completed <span id="counters.userstories.completed" class="pull-right badge badge-info">2</span></a></li>
			<li class="divider"></li>
			<li class="nav-header">Sprints</li>
			<li><div class="scroll-container">
				<ul class="nav nav-list sprint-list">
				<li id="userstories.sprint.1" class="group-item"><a href="#userstories/sprint/1"><i class="icon-asterisk"></i> Sprint 1<span class="pull-right badge badge-info" id="counters.userstories.sprint.1">3</span></a></li>
				<li id="userstories.sprint.2" class="group-item"><a href="#userstories/sprint/2"><i class="icon-ok"></i> Sprint 2
					<span class="pull-right badge badge-info" id="counters.userstories.sprint.2">3</span></a></li>
				<li id="userstories.sprint.3" class="group-item"><a href="#userstories/sprint/3"><i class="icon-ok"></i> Sprint 3<span class="pull-right badge badge-info" id="counters.userstories.sprint.3">3</span></a></li>
				<li id="userstories.sprint.3" class="group-item"><a href="#userstories/sprint/3"><i class="icon-ok"></i> Sprint 3<span class="pull-right badge badge-info" id="counters.userstories.sprint.3">3</span></a></li>
				<li id="userstories.sprint.3" class="group-item"><a href="#userstories/sprint/3"><i class="icon-ok"></i> Sprint 3<span class="pull-right badge badge-info" id="counters.userstories.sprint.3">3</span></a></li>
				<li id="userstories.sprint.3" class="group-item"><a href="#userstories/sprint/3"><i class="icon-ok"></i> Sprint 3<span class="pull-right badge badge-info" id="counters.userstories.sprint.3">3</span></a></li>
				<li id="userstories.sprint.3" class="group-item"><a href="#userstories/sprint/3"><i class="icon-ok"></i> Sprint 3<span class="pull-right badge badge-info" id="counters.userstories.sprint.3">3</span></a></li>
				<li id="userstories.sprint.3" class="group-item"><a href="#userstories/sprint/3"><i class="icon-ok"></i> Sprint 3<span class="pull-right badge badge-info" id="counters.userstories.sprint.3">3</span></a></li>
				<li id="userstories.sprint.3" class="group-item"><a href="#userstories/sprint/3"><i class="icon-ok"></i> Sprint 3<span class="pull-right badge badge-info" id="counters.userstories.sprint.3">3</span></a></li>
				<li id="userstories.sprint.3" class="group-item"><a href="#userstories/sprint/3"><i class="icon-ok"></i> Sprint 3<span class="pull-right badge badge-info" id="counters.userstories.sprint.3">3</span></a></li>
				<li id="userstories.sprint.3" class="group-item"><a href="#userstories/sprint/3"><i class="icon-ok"></i> Sprint 3<span class="pull-right badge badge-info" id="counters.userstories.sprint.3">3</span></a></li>
				</ul>
			</div></li>
			<li class="divider"></li>			
			<li class="group-item"><a href="#userstories/sprint/add"><i class="icon-plus"></i> Add new sprint</a></li>

			<li class="divider"></li>
			<li class="nav-header">Workflow</li>

			<li><div class="scroll-container">
			<ul class="nav nav-list workflow-list">
				<li id="userstories.assigned" class="group-item"><a href="#userstories/assigned">Assigned <span id="counters.userstories.inprogress" class="pull-right badge badge-info">1</span></a></li>
				<li id="userstories.todo" class="group-item"><a href="#userstories/todo">Todo <span id="counters.userstories.todo" class="pull-right badge badge-info">1</span></a></li>
				<li id="userstories.totest" class="group-item"><a href="#userstories/totest">To Test <span id="counters.userstories.totest" class="pull-right badge badge-info">1</span></a></li>
				<li id="userstories.done" class="group-item"><a href="#userstories/done">Done <span id="counters.userstories.done" class="pull-right badge badge-info">1</span></a></li>
				<li id="userstories.completed" class="group-item"><a href="#userstories/completed">Completed <span id="counters.userstories.completed" class="pull-right badge badge-info">1</span></a></li>
			</ul>
			</div></li>

			<li class="divider"></li>
			<li id="userstories.trashed" class="group-item"><a href="#userstories/trashed">Trash<span id="counters.userstories.trashed" class="pull-right badge"></span></a></li>
		</ul>
	</div>
</div>

<div class="span9">
	<div class="tableview-section well">
	</div>
</div>

</div>
</div>