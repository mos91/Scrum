<?php
class IssueForm extends CFormModel {
	public $name;
	public $description;
	public $estimate;
	public $priority;
	public $value;
	public $status;
	public $sprint_id;
	public $type;
	
	public function rules(){
		return array(
			array('name','required'),
			array('status','default', 'value' => IssueStatusCodes::OPEN),
			array('type', 'default', 'value' => IssueTypeCodes::TASK),
			array('estimate', 'default', 'value' => 0),
			array('priority', 'default', 'value' => 1),
			array('value', 'default', 'value' => 1),
			array('estimate,priority,value,sprint_id','numerical')
		);
	}
}