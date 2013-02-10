<?php
$this->pageTitle=Yii::app()->name .' | Backlog';
$this->clips['containerCssClass'] = 'container-fluid';
?>

<?php $this->beginClip('styles')?>
	<link rel="stylesheet" href="/css/backlog.css">
<?php $this->endClip('styles')?>
	<div class="row-fluid">
		<div class="span7">
			<ul id="backlog" class="nav nav-list">
			<li class="nav-header">Backlog</li>
			<li class="active">
				<a href="#">
					<div class="bug"></div>
					<span>Backlog item 1</span>
					<span class="label label-success pull-right">Done</span>
					<div class="assigned-people">
						<div class="avatar_16"></div>
						<div class="avatar_16"></div>
						<div class="avatar_16"></div>
						<div class="avatar_16"></div>
					</div>
					<div class="item-bottom-part">
						<!-- 75 cимволов + троеточие -->
						<div class="short-item-description">
							Donec sed odio dui. Cras justo odio,
							dapibus ac facilisis in, egestas eget quam...
						</div>
						<div class="item-news">0 news</div>
						<div class="item-comments">1 comment</div>
					</div>
				</a>			
			</li>
			<li>
				<a href="#">
					<div class="brainstorm"></div>
					<span>Backlog item 2</span>
					<span class="label label-important pull-right">Ready for estimation</span>
					<div class="assigned-people">
						<div class="avatar_16"></div>
						<div class="avatar_16"></div>
					</div>
					<div class="item-bottom-part">
						<div class="short-item-description muted">Short description...</div>
						<div class="item-news muted">1 news</div>
						<div class="item-comments muted">0 comments</div>
					</div>
				</a>
			</li>
			<li>
				<a href="#">
					<div class="feature"></div>
					<span>Backlog item 3</span>
					<span class="label label-success pull-right">Done</span>
					<div class="assigned-people">
					</div>
					<div class="item-bottom-part">
						<div class="short-item-description muted">Short description...</div>
						<div class="item-news muted">1 news</div>
						<div class="item-comments muted">0 comments</div>
					</div>
				</a>
			</li>
			<li>
				<a href="#">
					<div class="other"></div>
					<span>Backlog item 4</span>
					<span class="label label-important pull-right">To Do</span>
					<div class="assigned-people">
						<div class="avatar_16"></div>
					</div>
					<div class="item-bottom-part">
						<div class="short-item-description muted">Short description...</div>
						<div class="item-news muted">2 news</div>
						<div class="item-comments muted">2 comments</span></div>
					</div>
				</a>
			</li>
			</ul>
		</div>
		<div class="span5">	
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