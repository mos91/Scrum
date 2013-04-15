<?php
class RegistrationAction extends CAction {
	private function checkFormIsExist(){
		if (!isset(Yii::app()->request->restParams['RegistrationForm'])){
			throw new InvalidRestParamsException(200, $this->controller, 'Registration Form is not exist');			
		}	
	}
	
	private function checkFormIsValid($form){
		if (!$form->validate()){
			throw new AuthenticationFailureException(200, $this->controller, $form->errors);
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

		echo CJSON::encode(array('success' => true));
	}
}