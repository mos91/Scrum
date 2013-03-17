<?php
class TransactionFailureException extends HttpException {
	protected function composeMessage(){
		return 'Transaction failure in '.$this->context.".";
	}
	
	protected function defineCode(){
		return ExceptionCodes::TRANSACTION_FAILURE;
	}
	
	protected function defineType(){
		return 'TRANSACTION_FAILURE';
	}
}