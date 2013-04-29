<?php

class LoginAction extends CAction {
	private $identity;
	
	private function checkFormIsExist(){
		if (!isset(Yii::app()->request->restParams["LoginForm"])){
			$this->controller->render('login');
			Yii::app()->end();
		}
	}
	
	private function checkFormIsValid($form){
		if (!$form->validate()){
			$this->controller->render('login', array('model' => $form));
			Yii::app()->end();
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
	
	private function onGet(){
		$this->controller->render('login', array('model' => new LoginForm));
	}
	
	private function onSubmit(){
		$form = new LoginForm;
		$this->checkFormIsExist();	
		$form->attributes = Yii::app()->request->restParams["LoginForm"];
		$this->checkFormIsValid($form);
		
		$day = 3600*24;
		$duration=$form->rememberMe ? $day*30 : $day; // 30 days
		Yii::app()->user->login($form->identity,$duration);
		$cookies = Yii::app()->request->getCookies();
		$cookies->add('login', new CHttpCookie('login', true));
		$cookies->add('state-cookie', new CHttpCookie('state-cookie', Yii::app()->user->getStateKeyPrefix()));
		$this->controller->redirect('/site/index');
		Yii::app()->end();
	} 
}