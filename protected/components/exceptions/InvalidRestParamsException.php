<?php
class InvalidRestParamsException extends HttpException {
	protected function composeMessage(){
		return 'Invalid request params in '.$this->context.".".$this->composeSpecificMessage();
	}
	
	protected function defineCode(){
		return ExceptionCodes::INVALID_REST_PARAMS;
	}
	
	protected function defineType(){
		return 'INVALID_REST_PARAMS';
	}
}