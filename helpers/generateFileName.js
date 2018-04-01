const crypto = require('crypto');
const wordlist  = require('./wordlist');
const WORDLIST_LEN = wordlist.length;

generateFileName = function (TOKEN_LEN) {
	if ( TOKEN_LEN <1 || TOKEN_LEN == undefined){
		throw new Error("Token length must be at lest 1"); 
		return;
	}
	let token = "";
	for (let i = 0; i < TOKEN_LEN; i++) {
		const randomNumber = parseInt( crypto.randomBytes(2).toString('hex'), 16);
		//TODO: this is not entirely correct, since some numbers will be more likely
		//modulo 4096 and reroll if bigger than WORDLIST_LEN
		const converted = wordlist[randomNumber % WORDLIST_LEN];
		token += converted + "-";
	}
	token = token.slice(0,-1);
	return token; 
};

module.exports = generateFileName;
