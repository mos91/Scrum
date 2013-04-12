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
		if (isset($_GET['all'])){
			$jsonResult = array();
			$userId = Yii::app()->user->getState('user-id');
			$result = Project::model()->byUser($userId)->findAll();
			foreach($result as $id => $record){
				$jsonResult[$id] = $record->getAttributes();
			}
			echo CJSON::encode($jsonResult);
		}
		else if (isset($_GET['id'])){
			$id = $request->restParams['id'];
			$result = Project::model()->findByPk($id);
			echo CJSON::encode($result);
		}
		else {
			$result = Project::model()->findByPk(Yii::app()->user->getState("project-id"));
			echo CJSON::encode($result);
		}
	}
	
	public function onGet(){
		$request = Yii::app()->request;
		$userId = Yii::app()->user->getState('user-id');
		if (isset($_GET['all'])){
			$model = Project::model()->byUser($userId)->findAll();
			$trashed = Project::model()->trashed($userId)->findAll();
			$this->controller->render('table', array('model' => $model, 'trashed_projects' => $trashed));
		}
		else {
			$this->controller->render('dashboard');
		}
	}
}