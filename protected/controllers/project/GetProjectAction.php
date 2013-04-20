<?php
class GetProjectAction extends CAction {
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
	
		if (isset($_GET['live'])){
			$jsonResult = $this->fetchLive();
		}
		else if (isset($_GET['trashed'])){
			$jsonResult = $this->fetchTrashed();
		}
		else if (isset($_GET['id'])){
			$jsonResult = $this->fetchSingle();
		}
		else {
			$jsonResult = $this->fetchActive();
		}

		$jsonResult = array_merge(array('success' => true), $jsonResult);
		echo CJSON::encode($jsonResult);
	}
	
	public function onGet(){
		$request = Yii::app()->request;
		$userId = Yii::app()->user->getState('user-id');
		if (isset($_GET['all'])){
			$this->controller->render('table');
		}
		else {
			$this->controller->render('dashboard');
		}
	}


	private function fetchTrashed(){
		$userId = Yii::app()->user->getState('user-id');
		$jsonResult = array();
			
		if (isset($_GET['data']) && !empty($_GET['data'])){
			$result = Project::model()->trashed($userId)->findAll();	
			$jsonResult['data'] = array();
			foreach($result as $id => $record){
				$jsonResult['data'][$id] = $record->getAttributes();
			}
		}

		if (isset($_GET['count']) && !empty($_GET['data'])){
			if (isset($_GET['data']) && isset($result))	
				$jsonResult['count'] = count($result);
			else
				$jsonResult['count'] = Project::model()->trashed($userId)->count();
		}

		return $jsonResult;
	}

	private function fetchLive(){
		$userId = Yii::app()->user->getState('user-id');
		$jsonResult = array();
			
		if (isset($_GET['data']) && !empty($_GET['data'])){
			$result = Project::model()->byUser($userId)->findAll();	
			$jsonResult['data'] = array();
			foreach($result as $id => $record){
				$jsonResult['data'][$id] = $record->getAttributes();
			}
		}

		if (isset($_GET['count']) && !empty($_GET['count'])){
			if (isset($_GET['data']) && !empty($_GET['data']) && isset($result))	
				$jsonResult['count'] = count($result);
			else
				$jsonResult['count'] = Project::model()->byUser($userId)->count();
		}

		return $jsonResult;
	}

	/*fetch one model by id*/
	private function fetchSingle(){
		$result = Project::model()->findByPk($_GET['id']);
		return array($result);
	}

	private function fetchActive(){
		$result = Project::model()->findByPk(Yii::app()->user->getState("project-id"));
		return array($result);
	}
}