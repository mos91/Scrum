<?php
class InvalidRestParamsException extends HttpException {
	public function composeMessage(){
		return 'Invalid request params in '.$this->context.".".$this->specificMessage;
	}
	
	public function defineCode(){
		return ExceptionCodes::INVALID_REST_PARAMS;
	}
}