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
		else if (isset($_GET['fromBacklog'])){
			$jsonResult = array();
			if (isset($_GET['project_id']))
				$projectId = $_GET['project_id'];
			
			if (isset($_GET['start']) && isset($_GET['limit'])){
				$total = UserStory::model()->byProject($projectId)->fromBacklog()->count();
				$userstories = UserStory::model()->byProject($projectId)->fromBacklog()->page($_GET['start'], $_GET['limit'])->findAll();	
				$page = true;
			}
			
			foreach($userstories as $id => $record){
				$jsonResult[$id] = $record->getAttributes();
			}
		}
		else if ($_GET['sprint_id']){
			$jsonResult = array();
			$sprintId = $_GET['sprint_id'];
			
			$total = UserStory::model()->bySprint($sprintId)->with('sprint')->count();
			$userstories = UserStory::model()->bySprint($sprintId)->with('sprint')->findAll();
			$page = true;

			foreach($userstories as $id => $record){
				$jsonResult[$id] = $record->getAttributes();

				$jsonResult[$id]['sprint'] = $record->getRelated('sprint')->getAttributes(array('name', 'description'));
			}	
		}

		$payload = array('success' => true);
		if (isset($single) && !empty($single)){
			$payload['userstory'] = $jsonResult;
			echo CJSON::encode($payload);
		}
		else {
			$payload['userstories'] = $jsonResult;
			if (isset($page) && !empty($page))
				$payload['total'] = $total;

			echo CJSON::encode($payload);
		}
	}
}