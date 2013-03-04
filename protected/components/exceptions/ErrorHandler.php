<?php
class ErrorHandler extends CErrorHandler {
	protected $_error;
	
	public function getError()
	{
		return $this->_error;
	}
	
	/**
	 * Handles the exception.
	 * @param Exception $exception the exception captured
	 */
	protected function handleException($exception)
	{
		$app=Yii::app();
		if($app instanceof CWebApplication)
		{
			if(($trace=$this->getExactTrace($exception))===null)
			{
				$fileName=$exception->getFile();
				$errorLine=$exception->getLine();
			}
			else
			{
				$fileName=$trace['file'];
				$errorLine=$trace['line'];
			}
	
			$trace = $exception->getTrace();
	
			foreach($trace as $i=>$t)
			{
				if(!isset($t['file']))
					$trace[$i]['file']='unknown';
	
				if(!isset($t['line']))
					$trace[$i]['line']=0;
	
				if(!isset($t['function']))
					$trace[$i]['function']='unknown';
	
				unset($trace[$i]['object']);
			}
	
			$this->_error=$data=array(
					'exception' => $exception,
					'code'=>($exception instanceof CHttpException)?$exception->statusCode:500,
					'type'=>get_class($exception),
					'errorCode'=>$exception->getCode(),
					'message'=>$exception->getMessage(),
					'file'=>$fileName,
					'line'=>$errorLine,
					'trace'=>$exception->getTraceAsString(),
					'traces'=>$trace,
			);
	
			if(!headers_sent())
				header("HTTP/1.0 {$data['code']} ".$this->getHttpHeader($data['code'], get_class($exception)));
	
			if($exception instanceof CHttpException || !YII_DEBUG)
				$this->render('error',$data);
			else
			{
				if($this->isAjaxRequest())
					$app->displayException($exception);
				else
					$this->render('exception',$data);
			}
		}
		else
			$app->displayException($exception);
	}
	
	protected function handleError($event)
	{
		$trace=debug_backtrace();
		// skip the first 3 stacks as they do not tell the error position
		if(count($trace)>3)
			$trace=array_slice($trace,3);
		$traceString='';
		foreach($trace as $i=>$t)
		{
			if(!isset($t['file']))
				$trace[$i]['file']='unknown';
	
			if(!isset($t['line']))
				$trace[$i]['line']=0;
	
			if(!isset($t['function']))
				$trace[$i]['function']='unknown';
	
			$traceString.="#$i {$trace[$i]['file']}({$trace[$i]['line']}): ";
			if(isset($t['object']) && is_object($t['object']))
				$traceString.=get_class($t['object']).'->';
			$traceString.="{$trace[$i]['function']}()\n";
	
			unset($trace[$i]['object']);
		}
	
		$app=Yii::app();
		if($app instanceof CWebApplication)
		{
			switch($event->code)
			{
				case E_WARNING:
					$type = 'PHP warning';
					break;
				case E_NOTICE:
					$type = 'PHP notice';
					break;
				case E_USER_ERROR:
					$type = 'User error';
					break;
				case E_USER_WARNING:
					$type = 'User warning';
					break;
				case E_USER_NOTICE:
					$type = 'User notice';
					break;
				case E_RECOVERABLE_ERROR:
					$type = 'Recoverable error';
					break;
				default:
					$type = 'PHP error';
			}
			$this->_error=$data=array(
					'code'=>500,
					'type'=>$type,
					'message'=>$event->message,
					'file'=>$event->file,
					'line'=>$event->line,
					'trace'=>$traceString,
					'traces'=>$trace,
			);
			if(!headers_sent())
				header("HTTP/1.0 500 Internal Server Error");
			if($this->isAjaxRequest())
				$app->displayError($event->code,$event->message,$event->file,$event->line);
			elseif(YII_DEBUG)
			$this->render('exception',$data);
			else
				$this->render('error',$data);
		}
		else
			$app->displayError($event->code,$event->message,$event->file,$event->line);
	}
}
