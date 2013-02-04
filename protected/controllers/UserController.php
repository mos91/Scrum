<?php

class UserController extends Controller
{
	public function representations($representation){
		$arr = array('table' => 'BootstrapTableView', 'grid' => 'BootstrapGridView');
		return (!empty($representation) && isset($arr[$representation]))? $arr[$representation]: $arr; 
	}
	
	public function actionIndex(){
		// renders the view file 'protected/views/site/index.php'
		// using the default layout 'protected/views/layouts/main.php'
		$this->render('me' , array('activeTab' => 'you'));
	}

	public function actionMe(){
		$this->render('me', array('activeTab' => 'you'));
	}
	
	//запрос user/team
	//запрос user/team/?view=table
	//запрос user/team/?view=grid
	public function actionTeam(){
		$activeRepresentation = (isset($this->actionParams) && !empty($this->actionParams['view']))? $this->actionParams['view'] : 'table';
		$this->render('team', array('activeTab' => 'team', 'activeRepresentation' => $activeRepresentation));
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