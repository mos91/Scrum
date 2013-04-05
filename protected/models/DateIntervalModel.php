<?php
class DateIntervalModel extends CModel {
	public $weeks;
	public $days;
	public $hours;
	
	const WEEKS_COUNT = 4;
	const DAYS_COUNT = 30;
	const HOURS_COUNT = 24;
	
	public function attributeNames(){
		return array('weeks' => 'weeks','days' => 'days','hours' => 'hours');	
	}
	
	public function rules(){
		return array(
				array('weeks', 'in', 'range' => array('min' => 1, 'max' => 4)),
				array('days', 'in', 'range' => array('min' => 1, 'max' => 30)),
				array('hours', 'in', 'range' => array('min' => 1, 'max' => 24))
			);	
	}
	
	public static function generateWeeksList(){
		$result = array('weeks');
		
		for($i = 1;$i <= self::WEEKS_COUNT;$i++){
			$result[$i] = ''.$i;
		}
		return $result;
	}
	
	public static function generateDaysList(){
		$result = array('days');
		for($i = 1;$i <= self::DAYS_COUNT;$i++){
			$result[$i] = ''.$i;
		}
		return $result;
	}
	
	public static function generateHoursList(){
		$result = array('hours');
		for($i = 1;$i <= self::HOURS_COUNT;$i++){
			$result[$i] = ''.$i;
		}
		return $result;
	}
}