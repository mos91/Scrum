<?php
class UpdateProjectAction extends CAction {
	private function checkIsIdExist(){
		$rest = Yii::app()->request->restParams;

		if (!isset($rest['id'])){
			throw new InvalidRestParamsException(500, $this->controller, "project id doesnt exist");
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
		$form = new ProjectForm;
		$form->setAttributes(Yii::app()->request->restParams,false);
		$this->checkFormIsValid($form);
		
		$update_time = new DateTime();
		$project = Project::model()->findByPk(Yii::app()->request->restParams['id']);
		$project->setAttributes($form->attributes, false);
		$project->update_time = $update_time->getTimestamp();
		$project->save();
		
		$result = array('success' => true, 
			'project' => array('id' => $project->id,'update_time' => $project->update_time));
		echo CJSON::encode($result);
		Yii::app()->end();
	}
}