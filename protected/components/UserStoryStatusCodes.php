<?php
interface UserStoryStatusCodes {
	//новая, не рассмотренная на Sprint Planning Meeting
	const OPEN = 0x0000;
	//подготовленная для рассмотрения на Sprint Planning Meeting
	const READY_FOR_ESTIMATION = 0x0001;
	//подготовленная,рассмотренная на Sprint Planning Meeting, одобренная
	const READY_FOR_SPRINT = 0x0002;
	//приаттаченная к следующему спринту
	const ASSIGNED_TO_SPRINT = 0x0003;
	//имеющая статус после начала спринта
	const TODO = 0x0004;
	//после начала работы над ней во время спринта
	const IN_PROGRESS = 0x0005;
	//после завершения основных задач, готова к тестированию
	const TO_TEST = 0x0006;
	//выполненная
	const DONE = 0x0007;
}