<?php
$form = $this->beginWidget('CActiveForm',
	array('htmlOptions' => array('class' => 'form-horizontal'),
		'method' => 'POST',
		'action' => '/project/create'));
?>
<fieldset>
	<?php 
		if (isset($id)){
			echo CHtml::hiddenField('id', $id);
		} 
		?>
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
      <?php echo $form->textArea($model, 'description', array('class' => 'input-xlarge', 'rows' => '10','id' => 'description'))?>
      </div>
    </div>
</fieldset>
<?php $this->endWidget();?>