<?php

class SiteController extends Controller
{
	public function actions(){
		return array(
			'error' => 'application.controllers.site.ErrorAction'
		);	
	}
	
	public function actionIndex(){
		$this->render('index', array('activeTab' => 'main'));
	}
}