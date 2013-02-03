<?php 
	$this->pageTitle=Yii::app()->name .' | Me';
?>
<?php $this->beginClip('styles');?>
<style type="text/css">
	.user-status {
		margin-top:13px;
	}
	
	textarea {
		max-width : 200px;
		max-height: 300px;
	}
</style>
<?php $this->endClip('styles');?>

<div class="row">
<form>
	<div class="span4">
		<img src="/images/avatar_male/avatar_128.png" class="img-polaroid"></img>
		<select name="status" class="user-status">
			<option value="online">Online</option>
			<option value="away">Away</option>
			<option value="offline">Offline</option>
		</select>
		<legend>About you:</legend>
		<textarea name="about" rows="10" maxlength="144"></textarea>
	</div>
	<div class="span4">
		  <fieldset>
		    <legend>Personal Settings</legend>
		    <label>First name:</label>
		    <input type="text" name="firstname" placeholder="Jonh" disabled>
		  	<label>Last name:</label>
		  	<input type="text" name="lastname" placeholder="Doe" disabled>
		  	<legend>Date, time and numbers</legend>
		  	<label>Date Format:</label>
		  	<select name="date_format">
		  		<option value="default">Default</option>
		  		<option value="dd_mm_yy">DD/MM/YY</option>
		  		<option value="yy_mm_dd">YY-MM-DD</option>
		  	</select>
		  	<label>Time Format:</label>
		  	<select name="time_format">
		  		<option value="default">Default</option>
		  		<option value="hh_mm_pm_am">hh:mm AM/PM</option>
		  		<option value="hh_mm">hh:mm</option>
		  	</select>
		  	<label>First day of week:</label>
		  	<select name="first_day_of_week">
		  		<option value="default">Default</option>
		  		<option value="monday">Monday</option>
		  		<option value="sunday">Sunday</option>
		  		<option value="satuday">Saturday</option>
		  	</select>
		  	<label>Number format:</label>
		  	<select name="number_format">
		  		<option value="default">Default</option>
		  		<option value="comma_separated">9,99</option>
		  		<option value="dot_separated">9.99</option>
		  	</select>
		  	<div></div>
		  </fieldset>
	</div>
	<div class="span4">
		<fieldset>
			<legend>Notify you when somebody:</legend>
			<label class="checkbox">
      			<input name="assigns_work" type="checkbox"> Assigns work to you
    		</label>
    		<label class="checkbox">
      			<input name="replies_to_comment_you_made" 
      			type="checkbox"> Replies to comment you made
    		</label>
    		<label class="checkbox">
      			<input name="add_comment_somewhere_involves_you" 
      			type="checkbox"> Add a comment somewhere that involves you
    		</label>
    		<label class="checkbox">
      			<input name="add_comment_somewhere_involves_team" 
      			type="checkbox"> Add a comment somewhere that involves your team
    		</label>
    		<label class="checkbox">
      			<input name="add_comment_anywhere_project" 
      			type="checkbox"> Add a comment anywhere in your project
    		</label>
		</fieldset>
	</div>
</form>
</div>

