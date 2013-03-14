<?php
class InvalidStateException extends HttpException {
	protected function composeMessage(){
		return 'Invalid state in '.$this->context.".";
	}

	protected function defineCode(){
		return ExceptionCodes::INVALID_STATE;
	}

	protected function defineType(){
		return 'INVALID_STATE';
	}
}