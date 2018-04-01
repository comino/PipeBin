'use strict'
const generateFileName = require("./generateFileName");
const fs = require("fs");

	// TODO: use asnyc methods instead

let storeToFile = function(data, folder, tokenLen){
	if (!fs.existsSync(folder)) fs.mkdirSync(folder);
	const fileName = generateFileName(tokenLen);
	if (fs.existsSync(fileName)){
		fs.unlinkSync(fileName);
	}
	const file = fs.createWriteStream(folder + "/" + fileName);
	file.write(data);
	return fileName; 
}

module.exports =  storeToFile; 
