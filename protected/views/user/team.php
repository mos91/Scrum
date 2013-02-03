<?php 
	$this->pageTitle=Yii::app()->name .' | Team';
?>
<?php $this->beginClip('styles');?>
<style type="text/css" media="screen">
	.user-status {
		margin-top:13px;
	}
	
	textarea {
		max-width : 200px;
		max-height: 300px;
	}
</style>
<?php $this->endClip('styles');?>
<div class="row"><form>
<div class="span2">
<select name="current_project">
	<option value="project_1">project 1</option>
	<option value="project_2">project 2</option>
</select>
</div>
<div class="span3 pull-right">
	<?php $this->widget('BootstrapPills', array('activeTab' => $activeRepresentation,
				'tabs' => array( 
							'table' => array('title' => 'Table', 'url' => '?view=table'),
							'grid' => array('title' => 'Grid', 'url' => '?view=grid')
						) 
			))?>
</div>
</form></div>

<?php 
	$this->widget($this->representations($activeRepresentation), array(
		'columns' => array('#', 'Username', 'Role', 'Status'),
		'rows' => array(
				array('1', 'Jonh Doe', 'css,javascript developer', 'online'),
				array('2', 'Jack Shepard', 'c++ developer', 'online'),
				array('3', 'Antony Hartmann', 'ios,android developerr', 'online'),
				array('4', 'Gregory Ivanesko', 'team lead', 'away'),
				array('5', 'Basil Kulish', 'tester', 'offline'),
				array('6', 'James Mute', 'project manager', 'offline')
			)
		));?>