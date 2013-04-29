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
		$jsonResult = array();
		$request = Yii::app()->request;
		$groups = array('open','accepted','inprogress', 'completed', 'trashed');
		
		if (in_array($_GET['group'], $groups)){
			$jsonResult = $this->fetchCollection($_GET['group']);
		}
		else if (isset($_GET['id'])){
			$jsonResult = $this->fetchSingle();
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

	private function fetchCollection($collectionName){
		$projectId = Yii::app()->user->getState('project-id');
		$userId = Yii::app()->user->getState('user-id');
		$jsonResult = array();
		$model = UserStory::model();
		$args = array($projectId);
		$collections = array('open','accepted','inprogress','trashed');
		$scope = call_user_func_array(array($model, $collectionName), $args);

		if (isset($_GET['data']) && !empty($_GET['data'])){
			$result = $scope->findAll();
			$jsonResult['data'] = array();
			foreach($result as $id => $record){
				$jsonResult['data'][$id] = $record->getAttributes();
			}
		}

		if (isset($_GET['count'])){
			if (isset($_GET['data']) && isset($result))	
				$jsonResult['count'] = count($result);
			else{
				$jsonResult['count'] = $scope->count();
			}
		}

		return $jsonResult;
	}

	/*fetch one model by id*/
	private function fetchSingle(){
		$result = Project::model()->findByPk($_GET['id']);
		return array($result);
	}
}