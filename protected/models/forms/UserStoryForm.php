<?php
class UserStoryForm extends CFormModel {
	public $name;
	public $description;
	public $estimate;
	public $priority;
	public $status;
	
	public function rules(){
		return array(
			array('name','required'),
			array('status','default', 'value' => UserStoryStatusCodes::OPEN),
			array('estimate', 'numerical', 'min' => 0, 'max' => 99),
			array('priority','numerical')
		);
	}
}