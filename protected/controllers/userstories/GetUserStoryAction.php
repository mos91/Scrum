<?php
class GetUserStoryAction extends CAction {
	public function run(){
		if (Yii::app()->request->isAjaxRequest){
			$this->onAjax();
		}
	}

	public function onAjax(){
		$request = Yii::app()->request;
		$projectId = Yii::app()->user->getState('project-id');

		if (isset($_GET['id'])){
			$userstory = UserStory::model()->findByPk($_GET['id']);
			$jsonResult = $userstory->getAttributes();
			$single = true;
		}
		else if ($_GET['fromBacklog']){
			$jsonResult = array();
			if (isset($_GET['project_id']))
				$projectId = $_GET['project_id'];
			
			$userstories = UserStory::model()->byProject($projectId)->fromBacklog()->findAll();
	
			foreach($userstories as $id => $record){
				$jsonResult[$id] = $record->getAttributes();
			}
		}
		else if ($_GET['fromSprints']){
			$jsonResult = array();
			if (isset($_GET['project_id']))
				$projectId = $GET['project_id'];

			$userstories = UserStory::model()->byProject($projectId)->fromSprints()->findAll();
		}

		if (isset($single) && !empty($single)){
			echo CJSON::encode(array('success' => true, 'userstory' => $jsonResult));
		}
		else {
			echo CJSON::encode(array('success' => true, 'userstories' => $jsonResult));
		}
	}
}