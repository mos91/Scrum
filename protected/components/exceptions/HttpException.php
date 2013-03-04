<?php
class HttpException extends CHttpException {
	//type of exception as a string
	public $type;
	public $context;
	public $specific;
	
	public function __construct($statusCode = 500, $controller = null, $specific = null)
	{
		if (!isset($controller)){
			$this->context = Yii::app()->name;
		}
		else {
			$this->context = $controller->route;
		}
		$this->specific = $specific;
		
		parent::__construct($statusCode,$this->composeMessage(), $this->defineCode());
		$this->type = $this->defineType();
	}
	
	protected function composeMessage(){
		return 'Unknown exception in '.$this->context.".".$this->composeSpecificMessage();
	}
	
	protected function composeSpecificMessage(){
		return '';	
	}
	
	protected function defineCode(){
		return ExceptionCodes::UNKNOWN;
	}
	
	protected function defineType(){
		return 'UNKNOWN_ERROR';	
	}
}