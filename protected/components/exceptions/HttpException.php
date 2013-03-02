<?php
class HttpException extends CHttpException {
	protected $context;
	protected $specific;
	
	public function __construct($controller = null, $specific = null)
	{
		if (!isset($controller)){
			$this->context = Yii::app()->name;
		}
		else {
			$this->context = $controller->route;
		}
		$this->specific = $specific;
		
		parent::__construct(500,$this->composeMessage(), $this->defineCode());
	}
	
	public function composeMessage(){
		return 'Unknown exception in '.$this->context.".".$this->composeSpecificMessage();
	}
	
	public function composeSpecificMessage(){
		return '';
	}
	
	public function defineCode(){
		return ExceptionCodes::UNKNOWN_ERROR;
	}
	
	public function asArray(){
		return  array('code' => $this->code, 
			'message' => $this->message,
			'specific' => $this->specific,
			'context' => $this->context,
			'status' => $this->statusCode
		);
	}
}