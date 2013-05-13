<?php
class UpdateUserStoryAction extends CAction {
	private function checkIsIdExist(){
		$rest = Yii::app()->request->restParams;

		if (!isset($rest['id'])){
			throw new InvalidRestParamsException(500, $this->controller, "userstory id doesnt exist");
		}
	}
	
	private function checkFormIsValid($form){
		if (!$form->validate()){
			throw new InvalidRestParamsException(500, $this->controller, "request params are invalid");		
		}
	}
	
	public function run(){
		if (Yii::app()->request->isPostRequest){
			$this->onSubmit();
		}
	}
	
	private function onSubmit(){
		$this->checkIsIdExist();
		$form = new UserStoryForm;
		$form->setAttributes(Yii::app()->request->restParams,false);
		$this->checkFormIsValid($form);
		
		$update_time = new DateTime();
		$userstory = UserStory::model()->findByPk(Yii::app()->request->restParams['id']);
		$userstory->setAttributes($form->attributes, false);
		$userstory->update_time = $update_time->getTimestamp();
		$userstory->save();
		
		$result = array('success' => true, 
			'userstory' => array('id' => $userstory->id,'update_time' => $userstory->update_time));
		
		echo CJSON::encode($result);
		Yii::app()->end();
	}
}