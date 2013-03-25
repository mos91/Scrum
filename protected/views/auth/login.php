<?php $form = $this->beginWidget('CActiveForm', 
		array('htmlOptions' => array('class' => 'form-horizontal'), 
		'method' => 'POST', 
		'action' => '/auth/login'));?>
  <fieldset>
    <div id="legend">
      <legend class="">Login</legend>
    </div>
    <?php echo $form->errorSummary($model,null,null,array('class' => 'alert alert-error')); ?>
    
    <div class="control-group <?php echo isset($model->errors['email'])? 'error':''?>">
      <!-- Username -->
      <?php echo $form->labelEx($model, 'email', array('class' => 'control-label', 'for' => 'email'))?>
     
      <div class="controls">
      	<?php echo $form->emailField($model, 'email', array('class' => 'input-xlarge', 'id' => 'email'))?>
      </div>
    </div>
   
    <div class="control-group <?php echo isset($model->errors['password'])? 'error':''?>">
      <!-- Password-->
      <?php echo $form->labelEx($model, 'password', array('class' => 'control-label', 'for' => 'password'))?>
      
      <div class="controls">
      <?php echo $form->passwordField($model, 'password', array('class' => 'input-xlarge', 'id' => 'password'))?>
      </div>
    </div>
    <div class="control-group">   
      <div class="controls">
      <label class="checkbox">
      	<?php echo $form->checkbox($model, 'rememberMe', array('id' => 'rememberMe'))?>
      	<?php echo $form->labelEx($model, 'rememberMe');?>
      </label>
      
      </div>
    </div>
     
    <div class="control-group">
      <!-- Button -->
      <div class="controls">
        <button class="btn btn-success">Login</button>
      </div>
    </div>
  </fieldset>
<?php $this->endWidget();?>