<?php

class SiteController extends Controller
{
	public function actions(){
		return array(
			'error' => 'application.controllers.site.ErrorAction'
		);	
	}
	
	public function actionIndex(){
		if (Yii::app()->user->isGuest){
			$this->render('index', array('activeTab' => 'main'));
		}
		else {
			$this->forward('project/get');
		}
	}
}