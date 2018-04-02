const express = require('express');
const net = require('net');
const qrcode = require('qrcode-terminal');
const config = require('./config/config');
const storeToFile = require('./helpers/storeToFile'); 
const bodyParser = require('body-parser');

/*********************************
		HTTP - ENDPOINTS  
**********************************/
const app = express();
app.disable('x-powered-by');
app.disable('etag');
app.use(bodyParser.text({limit: config.FILES.BIN_LIMIT}));
app.use(bodyParser.raw({limit:config.FILES.BIN_LIMIT}));

// DONWLOAD BIN's
express.static.mime.default_type = "text/html";
app.use(express.static(config.FILES.ROOT_FOLDER));

// MISC ENDPOINTS
app.get('/', (req, res) => {
	res.status(200).json({ success: true, message: 'You reached the beam endpoint' });
});

app.post('/', (req, res) => {
	if(!req.body){
		res.status(422).send("Empty or invalid payload"); 
	}
	const fileName = storeToFile(req.body, config.FILES.ROOT_FOLDER, config.TOKEN_LEN);
	const fileLink = `http://${config.DOMAIN}/${fileName}`;
	res.status(200).send(fileLink + "\n"); 
});

/*********************************
		RAW TCP - ENDPOINTS  
**********************************/
app.qrserver = net.createServer((socket) => {
	socket.on('data', (payload) => {
		const fileName = storeToFile(payload, config.FILES.ROOT_FOLDER, config.TOKEN_LEN);
		const fileLink = `http://${config.DOMAIN}/${fileName}`;
		qrcode.generate(fileLink, (qr) => {
			socket.write(`${fileLink}\n${qr}\n`);
			socket.destroy();
		});
	});
}).listen(config.INGOING.PORT_DEFAULT);

app.qrserver = net.createServer((socket) => {
	socket.on('data', (payload) => {
		const fileName = storeToFile(payload, config.FILES.ROOT_FOLDER, config.TOKEN_LEN);
		const fileLink = `http://${config.DOMAIN}/${fileName}`;
		socket.write(`${fileLink}\n`);
		socket.destroy();
	})
}).listen(config.INGOING.PORT_URL_ONLY);

module.exports = app;


