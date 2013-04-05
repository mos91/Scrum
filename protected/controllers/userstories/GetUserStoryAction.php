<?php
class GetUserStoryAction extends CAction {
	public function run(){
		$request = Yii::app()->request;
		if (isset($_GET['id'])){
			$id = $request->restParams['id'];
			$result = UserStory::model()->findByPk($id);
			echo CJSON::encode($result);
		}
		else {
			$jsonResult = array();
			$projectId = Yii::app()->user->getState('project-id');
			$model = UserStory::model()->byProject($projectId);
			if (isset($request->restParams['limit'])){
				$limit = $request->restParams['limit'];
				$model->setDbCriteria(new CDbCriteria(array('limit' => $limit)));
			}
			$result = $model->findAll();
			foreach($result as $id => $record){
				$jsonResult[$id] = $record->getAttributes();
			}
			echo CJSON::encode($jsonResult);
		}
	}
}