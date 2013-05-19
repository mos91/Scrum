<?php
class CreateProjectAction extends CAction {
	private function checkIsCompanyExist(){
		$companyId = Yii::app()->user->getState('company-id');
		if (!isset($companyId)){
			throw new InvalidStateException(500, $this->controller, "company Id doesnt exist");
		}	
	}
	
	private function checkFormIsValid($form){
		if (!$form->validate()){
			if (Yii::app()->request->isAjaxRequest){
				throw new InvalidRestParamsException(500, $this->controller, "request params are invalid");	
			}
		}
	}
	
	public function run(){
		if (Yii::app()->request->isPostRequest){
			$this->onSubmit();
		}
	}
	
	private function onSubmit(){
		$this->checkIsCompanyExist();
		
		$form = new ProjectForm;
		$form->setAttributes(Yii::app()->request->restParams, false);
		$this->checkFormIsValid($form);
		
		$transaction = Yii::app()->db->beginTransaction();
		try{
			$project = new Project;
			$project->setAttributes($form->attributes, false);
			$project->company_id = Yii::app()->user->getState('company-id');
			$project->save();
			
			$projectAssign = new ProjectAssign;
			$projectAssign->project_id = $project->id;
			$projectAssign->user_id = Yii::app()->user->getState('user-id');
			$projectAssign->save();
			$transaction->commit();
		}
		catch(Exception $e){
			$transaction->rollback();
			throw TransactionFailureException(500, $this->controller);
		}

		echo CJSON::encode(array('success' => true, 
			'project' => array('id' => $project->getPrimaryKey(), 
			'update_time' => $project->update_time)));

		Yii::app()->end();
	}
}