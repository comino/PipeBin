var ret = {};
var default_env = {};
var default_env_text = '';

function get_env(key, default_value) {
	if (!default_env.hasOwnProperty(key)) {
		default_env[key] = default_value;
		if (default_env_text!='') default_env_text += '\n';
		default_env_text += key + '=' + default_value;
	}
	if (process.env.hasOwnProperty(key)) {
		return process.env[key]
	}
	return default_value;
}

// GENERAL 
ret.DOMAIN = get_env('DOMAIN', 'localhost:8000');
ret.TOKEN_LEN = parseInt(get_env('TOKEN_LEN', '3'));

// HTTP
ret.HTTP = {};
ret.HTTP.PORT = parseInt(get_env('PORT', '') || get_env('HTTP_PORT', '8000'));

/// INGOING TCP CONNECTION
ret.INGOING = {}; 
ret.INGOING.PORT_DEFAULT =  parseInt(get_env('PORT_DEFAULT', '9000'));
ret.INGOING.PORT_URL_ONLY =  parseInt(get_env('PORT_URL_ONLY', '9001'));

// FILES FOLDER 
ret.FILES = {}; 
ret.FILES.LIFETIME = get_env('LIFETIME', '90')
ret.FILES.ROOT_FOLDER = get_env('ROOT_FOLDER', 'www')

module.exports = ret;
