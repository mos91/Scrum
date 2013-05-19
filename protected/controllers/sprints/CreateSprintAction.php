<?php
class CreateSprintAction extends CAction {
	private function checkIsProjectIdExist(){
		$request = Yii::app()->request->restParams;

		if (!isset($request['project_id'])){
			throw new InvalidStateException(500, $this->controller, 'project Id doesnt exist');
		}
	}

	private function checkFormIsValid($form){
		if (!$form->validate()){
			if (Yii::app()->request->isAjaxRequest){
				throw new InvalidRestParamsException(500, $this->controller, "request params are invalid");	
			}
		}
	}
	
	public function run(){
		if (Yii::app()->request->isPostRequest){
			$this->onSubmit();
		}
	}
	
	private function onSubmit(){
		$this->checkIsProjectIdExist();
		$form = new SprintForm;
		$form->setAttributes(Yii::app()->request->restParams, false);
		$this->checkFormIsValid($form);
		$sprint = new Sprint;
		$update_time = new DateTime();
		$sprint->setAttributes($form->attributes,false);
		$sprint->project_id = Yii::app()->request->restParams['project_id'];
		$sprint->update_time = $update_time->getTimestamp();
		$sprint->save();
		
		echo CJSON::encode(array('success' => true, 
			'sprint' => array('id' => $sprint->getPrimaryKey(),
			'update_time' => $sprint->update_time, 
			'status' => $sprint->status)));

		Yii::app()->end();
	}
}