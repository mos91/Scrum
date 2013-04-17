<?php
class GetProjectAction extends CAction {
	public function run(){
		$this->onAjax();
	}
	
	public function onAjax(){
		$request = Yii::app()->request;
		$userId = Yii::app()->user->getState('user-id');

		if (isset($_GET['live'])){
			$result = $this->fetchLive($userId);
		} 
		else if (isset($_GET['favorite'])){
			$result = $this->fetchFavorites($userId);
		}
		else if (isset($_GET['trashed'])){
			$result = $this->fetchTrashed($userId);
		}
		else if (isset($_GET['id'])){
			$result = $this->fetchSingle();
		}
		else {
			$result = $this->fetchActive();
		}

		echo CJSON::encode(array('success' => true, 'projects' => $result));
	}

	private function fetchLive($userId){
		$jsonResult = array();
		$result = Project::model()->byUser($userId)->live()->findAll();
		foreach($result as $id => $record){
			$jsonResult[$id] = $record->getAttributes();
		}
		return $jsonResult;
	}

	private function fetchFavorites($userId){
		$jsonResult = array();
		$result = Project::model()->favorite($userId)->findAll();
		foreach($result as $id => $record){
			$jsonResult[$id] = $record->getAttributes();
		}
		return $jsonResult;
	}

	private function fetchTrashed($userId){
		$jsonResult = array();
			
		$result = Project::model()->byUser($userId)->trashed()->findAll();
		foreach($result as $id => $record){
			$jsonResult[$id] = $record->getAttributes();
		}
		return $jsonResult;
	}

	private function fetchSingle(){
		$result = Project::model()->findByPk($_GET['id']);
		return array($result->getAttributes());
	}

	private function fetchActive(){
		$result = Project::model()->findByPk(Yii::app()->user->getState("project-id"));
		return array($result->getAttributes());
	}
}