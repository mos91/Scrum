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

<?php $this->beginClip('script')?>
	<script src="/js/projects.js" type="text/javascript"></script>
<?php $this->endClip('script')?>

<div class="row-fluid">
<div class="span3">
	<div class="well sidebar-nav">
		<ul class="nav nav-list">
			<li class="nav-header">Live projects</li>
			<li><a href="#projects/all">All projects<span class="pull-right badge badge-info"><?php echo count($model);?></span></a></li>
			<li class="divider"></li>
			<li><a href="#projects/trash">Trash<span class="pull-right badge"><?php echo count($trashed_projects)?></span></a></li>
		</ul>
	</div>
</div>
<div class="span9">
	<!--  Live projects -->
	<div id="projects_section" class="well">
	<h4>Projects review</h4>
	<hr/>
	<div class="btn-group">
		<a href="#projects/trash" class="btn btn-small"><i class="icon-trash"></i> Trash</a>
		<a href="#projects/create" class="btn btn-small"><i class="icon-plus"></i> Add</a>
	</div>
	<div class="btn-group pull-right">
		<button class="btn btn-small pull-right" type="button"><i class="icon-repeat"></i> Refresh</button>
	</div>
	<hr/>
	<table id="projects_table" class="table table-condensed table-hover">
	  <thead>
	    <tr>
	      <th class="span1"><input type="checkbox"></th>
	      <th class="span1"></th>
	      <th class="span2">Name</th>
	      <th class="span2">Description</th>
	      <th class="span2"></th>
	    </tr>
	  </thead>
	  <tbody>
	  <?php
	  	
		foreach($model as $row){
			$description = $row->description;
			echo '<tr><td><input type="checkbox"></td><td><span class="row-id" value="'.$row->id.'"></span></td>';
			echo '<td><strong>'.$row->name.'</strong></td>'.
				 '<td><span>'.substr($description, 0, 144).'</span>';
			if (strlen($description) >= 144){
				echo '<span class="read-more-string"><a href="#">Read more</a></span>';
				echo '<span class="hide">'.substr($description,144, strlen($description)).'</span>';
				echo '<span class="hide-string"><a href="#">Hide</a></span>';
			}
				
			echo '</td><td></td>';
			echo '</tr>';
		}
	  ?>
	  </tbody>
	</table>
	</div>
	
	<!-- Trashed projects -->
	<div id="trashed_projects_section" class="well" style="display:none;">
	<h4>Trashed projects</h4>
	<hr/>
	<div class="btn-group">
		<button class="btn btn-small" type="button"><i class="icon-arrow-up"></i> Restore</button>
	</div>
	<div class="btn-group pull-right">
		<button class="btn btn-small" type="button"><i class="icon-repeat"></i> Refresh</button>
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
	  <?php
		foreach($trashed_projects as $row){
			$description = $row->description;
			echo '<tr row-id="'.$row->id.'" class="active-row trashed">';
			echo '<td><input type="checkbox"></td><td><strong>'.$row->name.'</strong></td>';
			echo '<td></td>';
			echo '</tr>';
		}
	  ?>
	  </tbody>
	</table>
	</div>
</div>


</div>