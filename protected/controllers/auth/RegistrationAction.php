<?php
class RegistrationAction extends CAction {
	private function checkFormIsExist(){
		if (!isset(Yii::app()->request->restParams['RegistrationForm'])){
			$this->controller->render('registration');
			Yii::app()->end();
		}	
	}
	
	private function checkFormIsValid($form){
		if (!$form->validate()){
			$this->controller->render('registration', array('model' => $form));
			Yii::app()->end();
		}
	}
	
	private function createUserRecord($form){
		$userRecord = new UserRecord;
		$userRecord->email = $form->email;
		$userRecord->password = crypt($form->password, $salt = Utility::blowfishSalt());
		$userRecord->firstname = $form->firstname;
		$userRecord->lastname = $form->lastname;
		$userRecord->session_key = md5($salt.$form->email);
		
		return $userRecord;
	}
	
	public function run(){
		$request = Yii::app()->request; 
		if ($request->isPostRequest){
			$this->onSubmit();
		}
	}
	
	private function onSubmit(){
		$form = new RegistrationForm;
		$this->checkFormIsExist();
		$form->attributes = Yii::app()->request->restParams['RegistrationForm'];
		$this->checkFormIsValid($form);
		$userRecord = $this->createUserRecord($form);
		$userRecord->save();
	}
}