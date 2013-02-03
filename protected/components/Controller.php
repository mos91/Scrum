<?php
/**
 * Controller is the customized base controller class.
 * All controller classes for this application should extend from this base class.
 */
class Controller extends CController
{
	public function render($view,$data=null,$return=false){
		if($this->beforeRender($view))
		{
			$output=$this->renderPartial($view,$data,true);
			if(($layoutFile=$this->getLayoutFile($this->layout))!==false)
				$output=$this->renderFile($layoutFile,array('content'=>$output, 'data' => $data), true);
		
			$this->afterRender($view,$output);
		
			$output=$this->processOutput($output);
		
			if($return)
				return $output;
			else
				echo $output;
		}
	}
}