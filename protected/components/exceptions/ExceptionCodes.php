<?php
interface ExceptionCodes {
	const NONE = 0x0000;
	const NOT_AJAX_REQUEST = 0x0001;
	const INVALID_REST_PARAMS = 0x0002;
	const AUTHENTICATION_FAILURE = 0x0003;
	const REGISTRATION_FAILURE = 0x0004;
	const UNKNOWN = 0xffff;
}