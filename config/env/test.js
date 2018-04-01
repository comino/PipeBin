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
    return process.env[key];
  }
  return default_value;
}

ret.DEBUG = get_env('DEBUG', 'true')=='true';
ret.IS_TEST_SERVER = false;

// HTTP
ret.HTTP = {};
ret.HTTP.PORT = parseInt(get_env('PORT', '') || get_env('HTTP_PORT', '8000'));

ret.INGOING = {}; 
ret.INGOING.PORT_DEFAULT =  parseInt(get_env('PORT', '') || get_env('HTTP_PORT', '9000'));
ret.INGOING.PORT_URL_ONLY =  parseInt(get_env('PORT', '') || get_env('HTTP_PORT', '9001'));

module.exports = ret;

