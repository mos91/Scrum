<?php
class RegistrationAction extends CAction {
	private function checkFormIsExist(){
		if (!isset(Yii::app()->request->restParams['RegistrationForm'])){
			throw new InvalidRestParamsException(500, $this->controller, 'request params doesnt exist');
		}	
	}
	
	private function checkFormIsValid($form){
		if (!$form->validate()){
			throw new InvalidRestParamsException(200,$this->controller, $form->errors); 
		}
	}
	
	private function checkIsUserNotExist($userRecord){
		if ($userRecord->exists('email=:email', array(':email' => $userRecord->email))){
			throw new RegistrationFailureException(200,$this->controller, 'user with such email already exists');
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
		if (Yii::app()->request->isPostRequest){
			$this->onSubmit();
		}
	}
	
	private function onSubmit(){
		$form = new RegistrationForm;
		$this->checkFormIsExist();
		$form->attributes = Yii::app()->request->restParams['RegistrationForm'];
		$this->checkFormIsValid($form);
		$userRecord = $this->createUserRecord($form);
		$this->checkIsUserNotExist($userRecord);
		$userRecord->save();
		
		echo CJSON::encode(array('success' => true));
		Yii::app()->end();
	}
}