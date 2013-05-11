<?php
class CreateUserStoryAction extends CAction {
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
		$form = new UserStoryForm;
		$form->setAttributes(Yii::app()->request->restParams, false);
		$this->checkFormIsValid($form);
		$userstory = new UserStory;
		$update_time = new DateTime();
		$userstory->setAttributes($form->attributes,false);
		$userstory->project_id = Yii::app()->request->restParams['project_id'];
		$userstory->update_time = $update_time->getTimestamp();
		$userstory->save();
		
		echo CJSON::encode(array('success' => true, 
			'userstory' => array('id' => $userstory->getPrimaryKey(), 'update_time' => $userstory->update_time)));

		Yii::app()->end();
	}
}