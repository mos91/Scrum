<?php
$form = $this->beginWidget('CActiveForm',
	array('htmlOptions' => array('class' => 'form-horizontal'),
		'method' => 'POST',
		'action' => '/project/create'));
?>
<fieldset>    
    <?php echo $form->errorSummary($model,null,null,array('class' => 'alert alert-error')); ?>
    
    <div class="control-group <?php echo isset($model->errors['name'])? 'error':''?>">
      <!-- Username -->
      <?php echo $form->labelEx($model, 'name', array('class' => 'control-label', 'for' => 'name'))?>
     
      <div class="controls">
      	<?php echo $form->textField($model, 'name', array('class' => 'input-xlarge', 'id' => 'name'))?>
      </div>
    </div>
   
    <div class="control-group <?php echo isset($model->errors['description'])? 'error':''?>">
      <!-- Password-->
      <?php echo $form->labelEx($model, 'description', array('class' => 'control-label', 'for' => 'description'))?>
      
      <div class="controls">
      <?php echo $form->textArea($model, 'description', array('class' => 'input-xlarge', 'rows' => '3','id' => 'description'))?>
      </div>
    </div>
    <div class="control-group">   
      <div class="controls">
      <label class="checkbox">
      	<?php echo $form->checkbox($model, 'makeActive', array('id' => 'makeActive'))?>
      	<?php echo $form->labelEx($model, 'makeActive');?>
      </label>
      </div>
    </div>
    
</fieldset>
<?php $this->endWidget();?>