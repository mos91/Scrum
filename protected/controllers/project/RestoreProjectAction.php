<?php
class RestoreProjectAction extends CAction {
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
			
			Project::model()->updateByPk($ids, array('dropped' => false));
			$projects = Project::model()->localInfo($userId, $ids)->findAll();

			foreach($projects as $id => $project){
				$jsonResult[$id] = $project->getAttributes();
				$jsonResult[$id]['favorite'] = $project->assigns[0]->favorite;
			}

			echo CJSON::encode(array('success' => true, 'data' => $jsonResult));
			Yii::app()->end();	
		}
		else if (isset($request->restParams['id'])) {
			$id = Yii::app()->request->restParams['id'];

			Project::model()->updateByPk($id, array('dropped' => false));
			$project = Project::model()->localInfo($userId, $id)->find();

			$jsonResult[0] = $project->getAttributes();
			$jsonResult[0]['favorite'] = $project->assigns[0]->favorite;

			echo CJSON::encode(array('success' => true, 'data' => $jsonResult));
			Yii::app()->end();
		}
		else {
			throw new InvalidRestParamsException(500, $this->controller, 'Request parameters doesnt exist');
		}
	}
} 