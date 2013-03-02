<?php

class SiteController extends Controller
{
	public function actionIndex(){
		$this->render('index', array('activeTab' => 'main'));
	}

	public function actionError()
	{
		if($error=Yii::app()->errorHandler->error)
		{
			if(Yii::app()->request->isAjaxRequest){
				$exception = $error['exception'];
				echo $exception->getJsonState();
			}
				
			else
				$this->renderFile('error', $error);
		}
	}
}