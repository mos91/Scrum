<div class="span3">
    <h2>Sign Up</h2>
    <?php $form = $this->beginWidget('CActiveForm', 
		array('htmlOptions' => array('class' => 'form-horizontal'), 
		'method' => 'POST', 
		'action' => '/auth/registration'));?>
	<?php 
		echo $form->labelEx($model,'firstname');
		echo $form->textField($model, 'firstname', array('class' => 'span3'));
		echo $form->labelEx($model,'lastname');
		echo $form->textField($model, 'lastname', array('class' => 'span3'));
		echo $form->labelEx($model,'email');
		echo $form->emailField($model, 'email', array('class' => 'span3'));
		echo $form->labelEx($model,'password');
		echo $form->passwordField($model, 'password', array('class' => 'span3'));
		echo $form->labelEx($model, 'passwordConfirm');
		echo $form->passwordField($model, 'passwordConfirm', array('class' => 'span3'));
	?>
    <label><input type="checkbox" name="terms"> I agree with the <a href="/site/terms">Terms and Conditions</a>.</label>
    
    <input type="submit" value="Sign up" class="btn btn-primary pull-right">
    <div class="clearfix"></div>
   <?php $this->endWidget();?>
</div>
