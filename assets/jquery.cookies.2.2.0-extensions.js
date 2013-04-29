var jaaulde = window.jaaulde || {};
jaaulde.utils = jaaulde.utils || {};
var cookies = jaaulde.utils.cookies = jaaulde.utils.cookies || {};
cookies.__proto__.SHA1HASH_LENGTH = 40;
cookies.__proto__.getHashedState = function(cookieName){
	var rawValue = cookies.get(cookieName), result;
	try {
		result = JSON.parse(rawValue.substr(this.SHA1HASH_LENGTH, rawValue.length - 1));
	}
	catch (e){

	}

	return result;
}