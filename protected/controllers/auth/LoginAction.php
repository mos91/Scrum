<?php

class LoginAction extends CAction {
	private $identity;
		
	private function checkIsAjax(){
		if (!Yii::app()->request->isAjaxRequest){
			throw new NotAjaxRequestException(500, $this->controller, null);
		}	
	}
	
	private function checkFormIsValid($form){
		if (!$form->validate()){
			throw new InvalidRestParamsException(200, $this->controller, $form->errors);
		}
	}
	
	private function checkIsSuccessAuthenticate(){
		if ($this->identity->errorCode !== UserIdentity::ERROR_NONE){
			throw new AuthenticationFailureException(200, $this->controller, $this->identity->errorMessage);
		}	
	}
	
	public function run(){
		if (Yii::app()->request->isPostRequest){
			$this->onSubmit();
		}
	}
	
	
	private function onSubmit(){
		$this->checkIsAjax();
		$form = new LoginForm;
		$form->attributes = Yii::app()->request->restParams["LoginForm"];
		$this->checkFormIsValid($form);
		
		if($this->identity===null)
		{
			$this->identity=new UserIdentity($form->email,$form->password);
			$this->identity->authenticate();
		}
		$this->checkIsSuccessAuthenticate();
		
		$duration=$form->rememberMe ? 3600*24*30 : 0; // 30 days
		Yii::app()->user->login($this->identity,$duration);
		echo CJSON::encode(array('success' => true));
		Yii::app()->end();
	}
}