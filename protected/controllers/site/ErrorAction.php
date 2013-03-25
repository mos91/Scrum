<?php
class ErrorAction extends CAction {
	public function run(){
		if($error=Yii::app()->errorHandler->error)
		{
			if(Yii::app()->request->isAjaxRequest){
				//если результатом ajax-запроса было исключение
				if (isset($error['exception'])){
					$exception = $error['exception'];
					//в режиме отладки с ajax-запросом можно передать параметр verbose, означающий чтобы исключения, 
					//определенные в коде приложения выдавали полную информацию со стэком вызовов не в json-формате
					if (YII_DEBUG && isset(Yii::app()->request->restParams['verbose'])){
						Yii::app()->displayException($exception);
					}
					else
					{
						//подготовка ajax-исключения и его отправка клиенту
						$result = array('code' => $exception->getCode(), 'message' => $exception->getMessage());
						if ($exception instanceof CHttpException){
							$result['statusCode'] = $exception->statusCode;
							if ($exception instanceof HttpException){
								$result['type'] = $exception->type;
								$result['context'] = $exception->context;
								$result['specific']= $exception->specific;
							}
						}
						else if ($exception instanceof CDbException){
							$result['specicic'] = $exception->errorInfo;
						}	
						
						echo CJSON::encode($result);
					} 
					
					Yii::app()->end(1);
				}
			}
			//если результатом запроса было исключение или ошибка
			else{
				$this->controller->renderFile(Yii::getPathOfAlias('application.views.site.error').'.php', $error);
			}
				
		}
	}
}