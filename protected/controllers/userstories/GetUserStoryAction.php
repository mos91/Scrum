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
		else if ($_GET['all']) {
			$jsonResult = array();
			if (isset($_GET['project_id']))
				$projectId = $_GET['project_id'];
			
			$userstories = UserStory::model()->byProject($projectId)->with(array('sprint' => array('select' => 'id,name')))->findAll();
	
			foreach($userstories as $id => $record){
				$jsonResult[$id] = $record->getAttributes();
				$sprint = $record->getRelated('sprint');
				if (isset($sprint))
					$jsonResult[$id]['sprint'] = $sprint->getAttributes(array('id', 'name'));
				else 
					$jsonResult[$id]['sprint'] = null;
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