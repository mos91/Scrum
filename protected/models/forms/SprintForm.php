<?php
class SprintForm extends CFormModel {
	public $name;
	public $description;
	public $status;
	
	public function rules(){
		return array(
			array('name','required'),
			array('status','default', 'value' => SprintStatusCodes::PLANNED)
		);
	}
}