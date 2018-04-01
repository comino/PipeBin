const express = require('express');
const net = require('net');
const qrcode = require('qrcode-terminal');
const config = require('./config/config');
const storeToFile = require('./helpers/storeToFile'); 

/*********************************
		HTTP - ENDPOINTS  
**********************************/
const app = express();
app.disable('x-powered-by');
app.disable('etag');
app.use(express.static(config.FILES.ROOT_FOLDER));

app.all('/', (req, res) => {
	res.status(200).json({ success: true, message: 'You reached the beam endpoint' });
});

/*
TODO: add a POST data endpoint? Easier to integrate in some 3rd party apps
app.post('/', (req, res) => {

}); */

/*********************************
		RAW TCP - ENDPOINTS  
**********************************/

const generateFileLink = (fileName) => {
	if (config.HTTP.PORT === 80) {
		return `http://${config.DOMAIN}/${fileName}`;
	} else {
		return `http://${config.DOMAIN}:${config.HTTP.PORT}/${fileName}`;
	}
}; 

app.qrserver = net.createServer((socket) => {
	socket.on('data', (payload) => {
		const fileName = storeToFile(payload, config.FILES.ROOT_FOLDER, config.TOKEN_LEN);
		const fileLink = generateFileLink(fileName); 
		qrcode.generate(fileLink, (qr) => {
			socket.write(`${fileLink}\n${qr}\n`);
			socket.destroy();
		});
	});
}).listen(config.INGOING.PORT_DEFAULT);

app.qrserver = net.createServer((socket) => {
	socket.on('data', (payload) => {
		const fileName = storeToFile(payload, config.FILES.ROOT_FOLDER, config.TOKEN_LEN);
		const fileLink = generateFileLink(fileName); 
		socket.write(`${fileLink}\n`);
		socket.destroy();
	})
}).listen(config.INGOING.PORT_URL_ONLY);


module.exports = app;
