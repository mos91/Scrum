<?php
class GetProjectAction extends CAction {
	public function run(){
		if (Yii::app()->request->isAjaxRequest){
			$this->onAjax();
		}
	}
	
	public function onAjax(){
		$request = Yii::app()->request;
		$userId = Yii::app()->user->getState('user-id');

		if (isset($_GET['all'])){
			$jsonResult = array();
			
			$result = Project::model()->byUser($userId)->findAll();
			foreach($result as $id => $record){
				$jsonResult[$id] = $record->getAttributes();
			}
			echo CJSON::encode($jsonResult);
		}
		else if (isset($_GET['trashed'])){
			$jsonResult = array();
			
			$result = Project::model()->trashed($userId)->findAll();
			foreach($result as $id => $record){
				$jsonResult[$id] = $record->getAttributes();
			}
			echo CJSON::encode($jsonResult);	
		}
		else if (isset($_GET['id'])){
			$result = Project::model()->findByPk($_GET['id']);
			echo CJSON::encode($result);
		}
		else {
			$result = Project::model()->findByPk(Yii::app()->user->getState("project-id"));
			echo CJSON::encode($result);
		}
	}
}