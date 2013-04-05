<?php
class UserStoryForm extends CFormModel {
	public $name;
	public $description;
	private $estimate;
	public $priority;
	public $value;
	public $status;
	
	public function rules(){
		return array(
			array('name','required'),
			array('status','default', 'value' => UserStoryStatusCodes::OPEN),
			//ModelValidator - данный валидатор является сигнализатором процедуре валидации о том, 
			//что данный атрибут является моделью и будет валидировать себя сам. 
			array('estimate', 'ModelValidator'),
			array('priority', 'default', 'value' => 1),
			array('value', 'default', 'value' => 1),
			array('priority,value','numerical')
		);
	}
	
	public function setEstimate($value){
		if (is_array($value)){
			$this->estimate = new DateIntervalModel(); 
			$this->estimate->setAttributes($value);
			return $this->estimates;
		}
	}
	
	public function getEstimate(){
		Yii::trace('ok');
		if (!($this->estimate instanceof DateIntervalModel)){
			$this->estimate = new DateIntervalModel(); 
		}
		return $this->estimate;
	}
}