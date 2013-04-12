<?php
class ChangeActiveProjectAction extends CAction {
	private function checkIsIdExist(){
		if (!isset(Yii::app()->request->restParams['id'])){
			throw new InvalidRestParamsException(500, $this->controller, "Id doesnt exist");
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
	
		$userId = Yii::app()->user->getState('user-id');
		$projectId = Yii::app()->request->restParams['id'];
			
		UserRecord::model()->updateByPk($userId, array('active_project_id' => $projectId));
		Yii::app()->user->setState('project-id', $projectId);
		
		$project = Project::model()->findByPk($projectId);
		
		echo CJSON::encode($project->getAttributes());
	}
	
	private function onGet(){
		$userId = Yii::app()->user->getState('user-id');
		$projectId = $_GET['id'];
			
		UserRecord::model()->updateByPk($userId, array('active_project_id' => $projectId));
		Yii::app()->user->setState('project-id', $projectId);
		
		$this->controller->forward('project/get');
	}
}