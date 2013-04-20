<?php
$this->pageTitle=Yii::app()->name .' | Projects';
$this->clips['containerCssClass'] = 'container';
?>

<?php $this->beginClip('styles')?>
	<link rel="stylesheet" type="text/css" href="/css/projects.css"> 
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
	<script src="/js/routers/ProjectsRouter.js" type="text/javascript"></script>
<?php $this->endClip('routers')?>

<?php $this->beginClip('models')?>
	<script src="/js/models/Model.js" type="text/javascript"></script>
	<script src="/js/models/Collection.js" type="text/javascript"></script>
	<script src="/js/models/Counter.js" type="text/javascript"></script>
<?php $this->endClip('models');?>

<?php $this->beginClip('script');?>
	<script src="/js/application/">
	<script src="/js/projects.js" type="text/javascript"></script>
<?php $this->endClip('script')?>

<div class="row-fluid">
<div class="span3">
	<div class="well sidebar-nav">
		<ul class="nav nav-list">
			<li class="nav-header">Live projects</li>
			<li><a href="#projects/all">All projects<span id="projects_count" class="pull-right badge badge-info"></span></a></li>
			<li class="divider"></li>
			<li><a href="#projects/trash">Trash<span id="trashed_projects_count" class="pull-right badge"></span></a></li>
		</ul>
	</div>
</div>
<div class="span9">
	<!--  Live projects -->
	<div id="projects_section" class="well">
	<h4>Projects review</h4>
	<hr/>
	<div class="btn-group">
		<a href="#projects/drop" class="btn btn-small"><i class="icon-trash"></i> Trash</a>
		<a href="#projects/create" class="btn btn-small"><i class="icon-plus"></i> Add</a>
	</div>
	<div class="btn-group pull-right">
		<a href="#projects/refresh" class="btn btn-small pull-right" ><i class="icon-repeat"></i> Refresh</a>
	</div>
	<hr/>
	<table id="projects_table" class="table table-condensed table-hover">
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
	
	<!-- Trashed projects -->
	<div id="trashed_projects_section" class="well" style="display:none;">
	<h4>Trashed projects</h4>
	<hr/>
	<div class="btn-group">
		<a href="#projects/restore" class="btn btn-small"><i class="icon-arrow-up"></i> Restore</a>
	</div>
	<div class="btn-group pull-right">
		<a href="#projects/refresh_trash" class="btn btn-small"><i class="icon-repeat"></i> Refresh</a>
	</div>
	<hr/>
	<table id="trashed_projects_table" class="table table-condensed table-hover">
	  <thead>
	    <tr>
	      <th class="span1"><input type="checkbox"></th>
	      <th class="span2">Name</th>
	      <th class="span2"></th>
	    </tr>
	  </thead>
	  <tbody>
	  </tbody>
	</table>
	</div>
</div>


</div>