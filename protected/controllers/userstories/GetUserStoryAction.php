<?php
class GetUserStoryAction extends CAction {
	public function run(){

		if (Yii::app()->request->isAjaxRequest){
			$this->onAjax();
		}
		else {
			$this->onGet();
		}
	}

	public function onAjax(){
		$request = Yii::app()->request;
		$projectId = Yii::app()->user->getState('project-id');
		if (isset($_GET['id'])){
			$id = $request->restParams['id'];
			$result = UserStory::model()->findByPk($id);
			echo CJSON::encode($result);
		}
		else if ($_GET['new']) {
			$jsonResult = array();
			$userstories = UserStory::model()->byProject($projectId)->new()->findAll();
	
			foreach($userstories as $id => $record){
				$jsonResult[$id] = $record->getAttributes();
			}
			echo CJSON::encode($jsonResult);
		}
		else if ($_GET['accepted']){
			$jsonResult = array();
			$userstories = UserStory::model()->byProject($projectId)->accepted()->findAll();
	
			foreach($result as $id => $record){
				$jsonResult[$id] = $record->getAttributes();
			}
			echo CJSON::encode($jsonResult);
		}
	}

	public function onGet(){
		if (isset($_GET['all'])){
			$this->controller->render('table');
		}
	}
}