var path = require('path');
var development = 	require('./env/development');
var production = 	require('./env/production');
var test = 			require('./env/test');
var extend = 		require('util')._extend;

if (!process.env.NODE_ENV) {
    console.error('NODE_ENV is not defined! Using default development environment');
    process.env.NODE_ENV = 'development';
} else {
    console.log('Using envioment: ' + process.env.NODE_ENV);
}

module.exports = {
    development: extend(development),
    test: extend(test),
    production: extend(production),
}[process.env.NODE_ENV || 'development'];
