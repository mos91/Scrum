<?php
$this->pageTitle=Yii::app()->name .' | Backlog';
$this->clips['containerCssClass'] = 'container';
?>

<?php $this->beginClip('styles')?>
	<link rel="stylesheet" type="text/css" href="/css/backlog.css"> 
	<link rel="stylesheet" type="text/css" href="/assets/jquery.dataTables.extensions/bootstrapped-dataTable.css">
<?php $this->endClip('styles')?>

<?php $this->beginClip('libs')?>
	<script src="/assets/jquery.dataTables.1.9.4.min.js" type="text/javascript"></script>
	<script src="/assets/jquery.dataTables.extensions/bootstrapped-dataTable.js" type="text/javascript"></script>
<?php $this->endClip('libs')?>

<?php $this->beginClip('widgets')?>
	<script src="/js/views/InlineDropdown.js" type="text/javascript"></script>
<?php $this->endClip('widgets')?>

<?php $this->beginClip('routers')?>
	<script src="/js/routers/BacklogRouter.js" type="text/javascript"></script>
<?php $this->endClip('routers')?>

<?php $this->beginClip('script')?>
	<script src="/js/backlog.js" type="text/javascript"></script>
<?php $this->endClip('script')?>

<div class="row-fluid">
<div class="span3">
	<div class="well sidebar-nav">
		<ul class="nav nav-list">
			<li class="nav-header">User stories</li>
			<li><a href="#userstories/new">New<span id="new_user_stories_count" class="pull-right badge badge-info"></span></a></li>
			<li><a href="#userstories/accepted">Accepted<span id="accepted_user_stories_count" class="pull-right badge"></span></a></li>
		</ul>
	</div>
</div>
<div class="span9">
	<!--  New userstories -->
	<div id="new_userstories_section" class="well">
	<h4>New User Stories</h4>
	<hr/>
	<div class="btn-group">
		<a href="#userstories/drop" class="btn btn-small"><i class="icon-trash"></i> Trash</a>
		<a href="#userstories/accept" class="btn btn-small"><i class="icon-ok"></i> Accept</a>
		<a href="#userstories/create" class="btn btn-small"><i class="icon-plus"></i> Add</a>
	</div>
	<div class="btn-group pull-right">
		<a href="#userstories/refresh_new" class="btn btn-small pull-right"><i class="icon-repeat"></i> Refresh</a>
	</div>
	<hr/>
	<table id="new_userstories_table" class="table table-condensed table-hover">
	  <thead>
	    <tr>
	      <th class="span1"><input type="checkbox"></th>
	      <th class="span2">Name</th>
	      <th class="span2">Description</th>
	      <th class="span2"></th>
	    </tr>
	  </thead>
	  <tbody>
	  </tbody>
	</table>
	</div>
	
	<!-- Accepted userstories -->
	<div id="accepted_userstories_section" class="well" style="display:none;">
	<h4>Accepted User Stories</h4>
	<hr/>
	<div class="btn-group">
		<a href="#userstories/deny" class="btn btn-small"><i class="icon-remove"></i> Deny</a>
	</div>
	<div class="btn-group pull-right">
		<a href="#projects/refresh_accepted" class="btn btn-small"><i class="icon-repeat"></i> Refresh</a>
	</div>
	<hr/>
	<table id="accepted_userstories_table" class="table table-condensed table-hover">
	  <thead>
	    <tr>
	      <th class="span1"><input type="checkbox"></th>
	      <th class="span2">Name</th>
	      <th class="span2">Description</th>
	      <th class="span2"></th>
	    </tr>
	  </thead>
	  <tbody>
	  </tbody>
	</table>
	</div>
</div>
</div>