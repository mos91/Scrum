<?php
class WebUser extends CWebUser {
	public function beforeLogin($id, $states, $fromCookie){
		if ($fromCookie){
			$userRecord = UserRecord::model()->find('email=:email AND session_key=:session_key', 
					array(	':email' => $id,
							':session_key' => $states['session-key']));
			if ($userRecord === null)
				return false;
		}
		return true;
	}
	
	public function beforeLogout(){
		$session_count = $this->getState('session_count');
		$userRecord = UserRecord::model()->find('email=:email', array(':email' => $this->getId()));
		
		$userRecord->session_count = --$session_count;
		$userRecord->save();
		return true;
	}

	protected function saveToCookie($duration)
	{
		$app=Yii::app();
		$cookie=$this->createIdentityCookie($this->getStateKeyPrefix());
		$cookie->expire=time()+$duration;
		$data=array(
			$this->getId(),
			$this->getName(),
			$duration,
			$this->saveIdentityStates(),
		);
		$cookie->value=$app->getSecurityManager()->hashData(CJSON::encode($data));
		$app->getRequest()->getCookies()->add($cookie->name,$cookie);
	}
}