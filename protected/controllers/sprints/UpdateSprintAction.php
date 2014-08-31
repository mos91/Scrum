<?php
class UpdateSprintAction extends CAction {
	private function checkIsIdExist(){
		$rest = Yii::app()->request->restParams;

		if (!isset($rest['id'])){
			throw new InvalidRestParamsException(500, $this->controller, "sprint id doesnt exist");
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
		$form = new SprintForm;
		$form->setAttributes(Yii::app()->request->restParams,false);
		$this->checkFormIsValid($form);
		
		$update_time = new DateTime();
		$sprint = Sprint::model()->findByPk(Yii::app()->request->restParams['id']);
		$sprint->setAttributes($form->attributes, false);
		$sprint->update_time = $update_time->getTimestamp();
		$sprint->save();
		
		$result = array('success' => true, 
			'sprint' => array('id' => $sprint->id,'update_time' => $sprint->update_time));
		
		echo CJSON::encode($result);
		Yii::app()->end();
	}
}