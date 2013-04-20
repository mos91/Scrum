<?php
class DropProjectAction extends CAction {
	private function checkIsIdExist(){
		if (!isset(Yii::app()->request->restParams['id'])){
			throw new InvalidRestParamsException(500, $this->controller, 'Id doesnt exist');
		}
	}

	private function checkIsIdsExist(){
		if (!isset(Yii::app()->request->restParams['ids'])){
			throw new InvalidRestParamsException(500, $this->controller, 'Ids doesnt exist');
		}
	}

	public function run(){
		if (Yii::app()->request->isPostRequest){
			$this->onSubmit();
		}
	}
	
	private function onSubmit(){
		$request = Yii::app()->request;
		if ($request->restParams['ids']){
			$this->checkIsIdsExist();
			$ids = Yii::app()->request->restParams['ids'];

			Project::model()->updateByPk($ids, array('dropped' => true));
			$projects = Project::model()->findAllByAttributes(array('id' => $ids));
	
			echo CJSON::encode(array('success' => true, 'data' => $projects));
			Yii::app()->end();	
		}
		else if ($request->restParams['id']){
			$this->checkIsIdExist();
			$id = Yii::app()->request->restParams['id'];

			$project = Project::model()->findByPk($id);
			$project->dropped = false;
			$project->save();
			
			echo CJSON::encode(array('success' = true, 'data' => $project));
			Yii::app()->end();
		}
	}
} 