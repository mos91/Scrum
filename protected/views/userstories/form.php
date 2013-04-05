<?php
$form = $this->beginWidget('CActiveForm', array('htmlOptions' => array('class' => 'form-horizontal'), 
		'method' => "POST", 
		'action' => 'userstories/create'));

?>
<fieldset>
	<?php echo $form->errorSummary($model, null, null, array('class' => 'alert alert-error'));?>
	<div class="control-group <?php echo isset($model->errors['name'])? 'error':''?>">
      <!-- name -->
      <?php echo $form->labelEx($model, 'name', array('class' => 'control-label', 'for' => 'name'))?>
     
      <div class="controls">
      	<?php echo $form->textField($model, 'name', array('class' => 'input-xlarge', 'id' => 'name'))?>
      </div>
    </div>
    
    <div class="control-group <?php echo isset($model->errors['description'])? 'error':''?>">
      <!-- Description-->
      <?php echo $form->labelEx($model, 'description', array('class' => 'control-label', 'for' => 'description'))?>
      
      <div class="controls">
      <?php echo $form->textArea($model, 'description', array('class' => 'input-xlarge', 'rows' => '3','id' => 'description'))?>
      </div>
    </div>
    
    <div class="control-group <?php echo isset($model->errors['estimate'])? 'error':''?>">
      <?php echo $form->labelEx($model, 'estimate', array('class' => 'control-label', 'for' => 'estimate'))?>
      
      <div class="controls controls-row">
      <?php
      	echo $form->dropdownList($model, 'estimate[weeks]', DateIntervalModel::generateWeeksList(), array('class' => 'span1', 
										'options' => array(0 => array('selected' => true)),'id' => 'estimateWeeks'));?>
										
      	<?php echo $form->dropdownList($model, 'estimate[days]', DateIntervalModel::generateDaysList(), array('class' => 'span1',
										'options' => array(0 => array('selected' => true)), 'id' => 'estimateDays'));?>
										
      	<?php echo $form->dropdownList($model, 'estimate[hours]', DateIntervalModel::generateHoursList(), array('class' => 'span1', 
										'options' => array(0 => array('selected' => true)), 'id' => 'estimateHours'));?>
     </div>
    </div>
    
    <div class="control-group <?php echo isset($model->errors['priority'])? 'error':''?>">
      <?php echo $form->labelEx($model, 'priority', array('class' => 'control-label', 'for' => 'priority'))?>
      <div class="controls">
      <?php echo $form->dropDownList($model, 'priority', array('low', 'normal', 'high'), array('class' => 'input-xlarge', 'id' => 'priority'))?>
      </div>
    </div>
    
    <div class="control-group <?php echo isset($model->errors['value'])? 'error':''?>">
      <!-- Priority-->
      <?php echo $form->labelEx($model, 'value', array('class' => 'control-label', 'for' => 'value'))?>
      <div class="controls">
      <?php echo $form->dropDownList($model, 'value', array('low', 'normal', 'high'), array('class' => 'input-xlarge', 'id' => 'value'))?>
      </div>
    </div>
</fieldset>
<?php $this->endWidget();?>