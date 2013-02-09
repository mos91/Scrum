<?php
$this->pageTitle=Yii::app()->name .' | Backlog';
$this->clips['containerCssClass'] = 'container-fluid';
?>

<?php $this->beginClip('styles')?>
<style type="text/css">
	.hero-unit {
		padding:20px 60px;
	}
	
	.breadcrumb {
		background:none !important; 
		padding:8px 0px;
		margin:0px 0px 5px;
	}
	
	#backlog {
		height:300px;
	}
	
	#tasks {
		height:265px;
	}
</style>
<?php $this->endClip('styles')?>
	<div class="row-fluid">
		<div class="span4">
			<div id="backlog" class="well sidebar-nav">
				<ul class="nav nav-list">
				<li class="nav-header">Backlog</li>
				<li class="active">
					<a href="#"><span>Backlog item 1</span><span class="label label-success pull-right">Success</span></a>			
				</li>
				<li>
					<a href="#"><span>Backlog item 2</span><span class="label label-important pull-right">Important</span></a>
				</li>
				<li>
					<a href="#"><span>Backlog item 3</span><span class="label label-success pull-right">Success</span></a>
				</li>
				</ul>
			</div>
			<div id="tasks" class="well well-large sidebar-nav">
				<ul class="nav nav-list">
					<li class="nav-header">Tasks</li>
					<li class="active">
						<a href="#"><span>Task 1</span><span class="label label-important pull-right">New</span></a>
					</li>
					<li>
						<a href="#"><span>Task 2</span><span class="label label-important pull-right">New</span></a>
					</li>
					<li>
						<a href="#"><span>Task 3</span><span class="label label-important pull-right">New</span></a>
					</li>			
				</li>
				</ul>
			</div>
		</div>
		<div class="span8">	
		<div class="hero-unit">		
			<div class="row"><ul class="breadcrumb">
			  <li class="active"><a href="#">Item 1</a></li>
			</ul></div>
			<form>
			<div class="row">
			<div class="span6">
				  <fieldset>
				    <legend>Item Details</legend>
				    <label>Name</label>
				    <input name="name" type="text" placeholde="type something..."></input>
				    <label>Description</label>
				    <textarea name="description" rows="10" maxlength="144"></textarea>
				    <label>Status</label>
				    <select name="status">
				    	<option value="new">New</option><option value="ready_for_estimation">Ready for estimation</option>
				    	<option value="ready_for_sprint">Ready for sprint</option>
				    	<option value="assigned_to_sprint">Assigned to sprint</option>
				    	<option value="todo">To do</option><option value="in_progress">In Progress</option>
				    	<option value="to_test">To test</option><option value="done">Done</option>
				    	<option value="sprint_complete">Sprint Complete</option>
				    </select>
				    <label>Type</label>
				    <select name="type">
				    	<option value="feature">Feature</option><option value="bug">Bug</option>
				    	<option value="suggestion">Suggestion</option><option value="other">Other</option>
				    </select>
				    <label>Created by</label>
				    <select class="span5" name="created_by" placeholder="Select something...">
				    	<option value="1">Jonh Doe</option>
				    	<option value="2">Jack Shepard</option>
				    	<option value="3">Antony Hartmann</option>
				    	<option value="4">Gregory Ivanesko</option>
				    	<option value="5">Basil Kulish</option>
				    	<option value="6">James Mute</option>
				    </select>	
				 </fieldset>
			 </div>
			 <div class="span6">
			 <fieldset>
			 	<legend>Estimates</legend>
			 	<label>Estimate efforts</label>
			    <input type="range" name="estimate_efforts" min="1" max="10">
			    <label>Risk</label>
			    <input type="range" name="risk" min="1" max="10">
			    <label>Priority</label>
			    <input type="range" name="priority" min="1" max="10">
			    <label>Value</label>
			    <input type="range" name="value" min="1" max="10">
			 </fieldset>
		     </div>
			 </div>
			</form>
		</div>
		</div>