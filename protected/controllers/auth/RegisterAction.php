<?php
class RegisterAction extends CAction {
	public function checkFormIsValid($form){
		if (!$form->validate()){
			throw new InvalidRestParamsException($this->controller, $form->errors); 
		}
	}
	
	public function checkIsSuccessRegistration(){
		
	}
	
	public function run(){
		$form = new RegistrationForm;
		$form->attributes = Yii::app()->request->restParams['RegistrationForm'];
		$this->checkFormIsValid($form);
		
		$userRecord = new UserRecord;
		$userRecord->email = $form->email;
		$userRecord->password = crypt($form->password, self::blowfishSalt());
		
	}
}