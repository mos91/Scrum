<?php

class SiteController extends Controller
{
	/**
	 * Declares class-based actions.
	 */
	public function actions()
	{
		return array(
			'page'=>array(
				'class'=>'CViewAction',
			),
		);
	}

	public function actionIndex(){
		$this->render('index', array('activeTab' => 'main'));
	}

	/**/
	public function actionContacts(){
		if ($this->request->isAjaxRequest)
			$this->renderPartial('contacts.php', array('activeTab' => 'contacts'));
	}

	public function actionError()
	{
		if($error=Yii::app()->errorHandler->error)
		{
			if(Yii::app()->request->isAjaxRequest)
				echo $error['message'];
			else
				$this->render('error', $error);
		}
	}
}