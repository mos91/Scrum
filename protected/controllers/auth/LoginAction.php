<?php

class LoginAction extends CAction {
	private $identity;
		
	private function checkIsAjax(){
		if (!Yii::app()->request->isAjaxRequest){
			throw new NotAjaxRequestException($this->controller);
		}	
	}
	
	private function checkFormIsValid($form){
		if (!$form->validate()){
			//$specific = CJSON::encode($form->errors);
			$specific 		
			throw new InvalidRestParamsException($this->controller, $specific);
		}
	}
	
	private function checkIsSuccessAuthenticate(){
		if ($this->identity->errorCode !== UserIdentity::ERROR_NONE){
			throw new AuthenticationFailureException($this->controller);
		}	
	}
	
	public function run(){
		if (Yii::app()->request->isPostRequest){
			$this->onSubmit();
		}
		else {
			$this->onGet();
		}
	}
	
	public function onGet(){
		$this->controller->render('login');
	}
	
	public function onSubmit(){
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
		echo CJson::encode(array('success' => true));
		Yii::app()->end();
	}
}