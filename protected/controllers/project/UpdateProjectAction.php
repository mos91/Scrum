<?php
class UpdateProjectAction extends CAction {
	private function checkIsIdExist(){
		if (!isset($_REQUEST['id'])){
			throw new InvalidRestParamsException(500, $this->controller, "project id doesnt exist");
		}
	}
	
	private function checkIsFormExist(){
		if (!isset(Yii::app()->request->restParams["ProjectForm"])){
			throw new InvalidRestParamsException(500, $this->controller, "request params doesnt exist");
		}
	}
	
	private function checkFormIsValid($form){
		if (!$form->validate()){
			if (Yii::app()->request->isAjaxRequest){
				echo CJSON::encode(array('error' => true,
						'content' => $this->controller->renderPartial('form', array('model' => $form), true)));
				Yii::app()->end();
			}
		}
	}
	
	public function run(){
		if (Yii::app()->request->isPostRequest){
			$this->onSubmit();
		}
		else {
			$this->onGet();
		}
	}
	
	private function onSubmit(){
		$this->checkIsIdExist();
		$this->checkIsFormExist();
		$form = new ProjectForm;
		$form->setAttributes(Yii::app()->request->restParams["ProjectForm"],false);
		$this->checkFormIsValid($form);
		
		$project = Project::model()->findByPk(Yii::app()->request->restParams['id']);
		$project->setAttributes($form->attributes, false);
		$project->save();
		
		$result = array('project' => $project->getAttributes());
		echo CJSON::encode($result);
		Yii::app()->end();
	}
	
	private function onGet(){
		if (Yii::app()->request->isAjaxRequest){
			$this->checkIsIdExist();
			$project = Project::model()->findByPk($_GET['id']);
			$form = new ProjectForm;
			$form->setAttributes($project->getAttributes(), false);
			$this->controller->renderPartial('form', array('model' => $form, 'id' => $project->id));
		}
	}
}