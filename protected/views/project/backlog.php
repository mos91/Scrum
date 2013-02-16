<?php
$this->pageTitle=Yii::app()->name .' | Backlog';
$this->clips['containerCssClass'] = 'container-fluid';
?>

<?php $this->beginClip('styles')?>
	<link rel="stylesheet/less" type="text/css" href="/css/backlog.less">
	<!--<link rel="stylesheet" href="/css/backlog.css">  -->  
<?php $this->endClip('styles')?>

<?php $this->beginClip('script')?>
	<script type="text/javascript" src="/js/backlog.js"></script>
<?php $this->endClip('script')?>

<?php $this->beginClip('templates')?>
	<script id="backlog-template" type="text/template">
	<ul class="nav nav-list">
	<li class="nav-header">Backlog</li>
	<% _.each(backlog, function(item, index, list){%> 
		<li>
			<a href="#">
				<div class="<%= self.types[item.type]%>"></div>
				<span><%= item.name%></span>
				<% var oStatus = self.statuses(item.status);%>
				<span class="label <%= oStatus.class %> pull-right"><%= oStatus.title%></span>
				<div class="assigned-people">
					<% _.each(item.team, function(user,index, list){%>
						<div class="avatar_16"></div>
					<%}, self);%>
				</div>
				<div class="item-bottom-part">
					<!--75 cимволов + троеточие --> 
					<div class="short-item-description">
						<%= item.description %>
					</div>
					<div class="item-news">0 news</div>
					<div class="item-comments">0 comment</div>
				</div>
			</a>			
		</li>
 <%}, self);%>	
	</script>  
<?php $this->endClip('templates')?>
	<div class="row-fluid">
		<div id="backlog" class="span7">
		</div>
		<div class="span5">	
			<div class="tabbable"> <!-- Only required for left/right tabs -->
			  <ul class="nav nav-tabs item-sections">
			     <li class="active">
			    	<a href="#item-details-tab" data-toggle="tab">Details</a>
			  	</li>
			  	<li><a href="#item-estimates-tab" data-toggle="tab">Estimates</a></li>
			  </ul>
			  <div class="tab-content item-tab-content">
			    <div class="tab-pane active item-info-tab" id="item-details-tab">
			    	<div class="row">
					<fieldset>
					<legend class="item-legend">Item Details</legend>
					<div class="span6">		    
					    <label>Name</label>
					    <input name="name" type="text" placeholde="type something..."></input>
					    <label>Description</label>
					    <textarea name="description" rows="10" maxlength="144"></textarea>  
					</div>
					<div class="span5">
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
					    <select class="span7" name="created_by" placeholder="Select something...">
					    	<option value="1">Jonh Doe</option>
					    	<option value="2">Jack Shepard</option>
					    	<option value="3">Antony Hartmann</option>
					    	<option value="4">Gregory Ivanesko</option>
					    	<option value="5">Basil Kulish</option>
					    	<option value="6">James Mute</option>
					    </select>	
					 </div>
					 </fieldset>  
			    	</div>
			    </div>
			    <div class="tab-pane item-info-tab" id="item-estimates-tab">
			    	<div class="row">
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
			    </div>
			  </div>
			</div>
		</div>
			</form>
		</div>