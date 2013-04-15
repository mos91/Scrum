<?php

class LoginAction extends CAction {
	private $identity;
	
	private function checkFormIsExist(){
		if (!isset(Yii::app()->request->restParams["LoginForm"])){
			throw new InvalidRestParamsException(500, $this, 'Login Form is not exist');
			$this->controller->render('login');
		}
	}
	
	private function checkFormIsValid($form){
		if (!$form->validate()){
			//$this->controller->render('login', array('model' => $form));
			throw new AuthenticationFailureException(500, $this);
		}
	}
	
	public function run(){
		if (Yii::app()->request->isPostRequest){
			$this->onSubmit();
		}
	}
	
	private function onSubmit(){
		$form = new LoginForm;
		$this->checkFormIsExist();	
		$form->attributes = Yii::app()->request->restParams["LoginForm"];
		$this->checkFormIsValid($form);
		
		$duration=$form->rememberMe ? 3600*24*30 : 0; // 30 days
		Yii::app()->user->login($form->identity,$duration);
		$cookies = Yii::app()->request->getCookies();
		$cookies->add('login', new CHttpCookie('login', true));
		echo CJSON::encode(array('success' => true));
		Yii::app()->end();
	} 
}