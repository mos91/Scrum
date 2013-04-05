<?php
class ModelValidator extends CValidator {
	protected function validateAttribute($object, $attribute){
		if (is_object($attribute) && $object->$attribute instanceof CModel){
			if (!$attribute->validate()){
				$errors = $attribute->getErrors();
				foreach($errors as $error => $message){
					$this->addError($object, $attribute,$message);
				}
			}
		}
	}  
}