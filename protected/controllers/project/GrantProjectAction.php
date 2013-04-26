<?php
class GrantProjectAction extends CAction {
	public function run(){
		if (Yii::app()->request->isPostRequest){
			$this->onSubmit();
		}
	}

	private function onSubmit(){
		$request = Yii::app()->request;
		$userId = Yii::app()->user->getState('user-id');

		if (isset($request->restParams['ids'])){
			$ids = Yii::app()->request->restParams['ids'];

			ProjectAssign::model()->updateAll(array('favorite' => true), 
				'user_id=:user_id AND project_id IN ('.implode(',', $ids).')', 
				array(':user_id' => $userId));

			$projects = Project::model()->findAllByAttributes(array('id' => $ids));
	
			echo CJSON::encode(array('success' => true, 'data' => $projects));
			Yii::app()->end();	
		}
		else if (isset($request->restParams['id'])){
			$id = Yii::app()->request->restParams['id'];

			$projectAssign = ProjectAssign::model()->find('user_id=:user_id AND project_id=:project_id', 
				array(':user_id' => $userId, ':project_id' => $id));
			$projectAssign->favorite = true;
			$projectAssign->save();
			
			echo CJSON::encode(array('success' => true, 'data' => array($projectAssign->project())));
			Yii::app()->end();
		}
		else {
			throw new InvalidRestParamsException(500, $this->controller, 'Request parameters doesnt exist');
		}
	}
}