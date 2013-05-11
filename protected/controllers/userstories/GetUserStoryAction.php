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
			$id = $request->restParams['id'];
			$userstory = UserStory::model()->findByPk($id);
			$jsonResult = $userstory->getAttributes();
		}
		else if ($_GET['open']) {
			$jsonResult = array();
			if (isset($_GET['project_id']))
				$projectId = $_GET['project_id'];
			
			$userstories = UserStory::model()->byProject($projectId)->open()->findAll();
	
			foreach($userstories as $id => $record){
				$jsonResult[$id] = $record->getAttributes();
			}
		}
		/*else if ($_GET['accepted']){
			$jsonResult = array();
			$userstories = UserStory::model()->byProject($projectId)->accepted()->findAll();
	
			foreach($result as $id => $record){
				$jsonResult[$id] = $record->getAttributes();
			}
			echo CJSON::encode($jsonResult);
		}*/


		if (isset($single) && !empty($single)){
			echo CJSON::encode(array('success' => true, 'userstory' => $jsonResult));
		}
		else {
			echo CJSON::encode(array('success' => true, 'userstories' => $jsonResult));
		}
	}
}