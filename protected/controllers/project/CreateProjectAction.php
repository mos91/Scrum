<?php
class CreateProjectAction extends CAction {
	private function checkIsCompanyExist(){
		$companyId = Yii::app()->user->getState('company-id');
		if (!isset($companyId)){
			throw new InvalidStateException(500, $this->controller, "company Id doesnt exist");
		}	
	}
	
	private function checkIsFormExist(){
		if (!isset(Yii::app()->request->restParams["ProjectForm"])){
			throw new InvalidRestParamsException(500, $this->controller, "request params doesnt exist");
		}	
	}
	
	private function checkFormIsValid($form){
		if (!$form->validate()){
			if (Yii::app()->request->isAjaxRequest){
				echo CJSON::encode(array('error' => true, 
						'content' => $this->controller->renderPartial('form', array('model' => $form), true)));
				Yii::app()->end();
			}
		}
	}
	
	public function run(){
		if (Yii::app()->request->isPostRequest){
			$this->onSubmit();
		}
		else {
			if (Yii::app()->request->isAjaxRequest)
				$this->controller->renderPartial('form', array('model' => new ProjectForm));
		}
	}
	
	private function onSubmit(){
		//если в состоянии сессии нет id компании, то проект создать нельзя
		$this->checkIsCompanyExist();
		$this->checkIsFormExist();
		$form = new ProjectForm;
		$form->setAttributes(Yii::app()->request->restParams["ProjectForm"],false);
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

		$result = array('project' => $project->getAttributes());

		echo CJSON::encode($result);
		Yii::app()->end();
	}
}