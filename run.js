const app = require('./app');
const http = require('http');
const config = require("./config/config.js");

function processError(port, error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  let msg = '';
  switch (error.code) {
    case 'EACCES':
      msg = `Cannot bind ${bind}, it requires elevated privileges`;
      break;
    case 'EADDRINUSE':
      msg = `Cannot bind ${bind}, it is already in use`;
      break;
    default:
      throw error;
  }
  console.error(msg);
  process.exit(1);
}

const server = http.createServer(app).listen( config.HTTP.PORT, () => {
  console.log(`HTTP server started at port ${config.HTTP.PORT}`);
});

server.on('error', (error) => {
  processError(config.HTTP.PORT, error);
});
