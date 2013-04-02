<?php
class GetProjectAction extends CAction {
	public function run(){
		$request = Yii::app()->request; 
		if (isset($_GET['activeProject'])){
			$result = Project::model()->findByPk(Yii::app()->user->getState("project-id"));
			echo CJSON::encode($result);
		}
		else if (isset($_GET['id'])){
			$id = $request->restParams['id'];
			$result = Project::model()->findByPk($id);
			echo CJSON::encode($result);		
		}
		else {
			$jsonResult = array();
			$userId = Yii::app()->user->getState('user-id');
			$result = Project::model()->byUser($userId)->findAll();
			foreach($result as $id => $record){
				$jsonResult[$id] = $record->getAttributes();
			}
			echo CJSON::encode($jsonResult);
		}
	}
}