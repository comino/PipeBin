
# Pipebin
Maintainer: Sven Eliasson 
PipeBin is a simple self-deployable service for simple text or file transmission between command lines without the need to install any software. Sometimes you cant or dont want to install additional tools and you just need to get some data across to another computer, server or person. Typical usecases: 
- to tBin your public ssh key to establish a secure ssh connction
- to quickly transport code snippets via command line to another person
- to distribute instructions / notes to several people

You can write via a raw tcp connection to your instance or the publicly hosted services like: 
```
$ cat ~/.ssh/id_rsa.pub | nc pipebin.de 4444 
> http://pipebin.de/rusty-piper-beaf
```
It will produce readable URL's made to be transmitted via voice. The URL's will have the patern pipebin.de/{BIN_ID} while BIN_ID will constist of 3 or more words out of a over 2000 word dictionary of easy english words. It furthermore can optionally produce QR code codes for pc-smartphone transmission by using port 5555 which will be directly printed in the command line. 

```
$ cat ~/.ssh/id_rsa.pub | nc pipebin.de 5555
http://pipebin.de/boat-barrier-west
{{QR_CODE_WILL_APPEAR_HERE}}
```

Please note: This is currently a quick hack for experimenting
NOT READY FOR PRODUCTION USAGE

# Installation
```
git clone 
npm install 
npm start
```

# Usage
```
$ echo "Hello World" | nc pipebin.de4444 
> http://pipebin.de/rose-butter-heaven-oil
$ cat file.txt | nc pipebin.de 4444
```

# Security
This solution is ment to be self deployed. Please note, that there is currently no built in way for encryption. 
Please consider your data public once you use the public hosted service. 
You may add your own encryption: 

```
# encryption
$ cat file.txt | openssl enc -aes-256-cbc -base64 | nc pipebin.de 4444
#decryption
curl -s http://pipebin.de/{BEAM_ID} | openssl enc -aes-256-cbc -base64 -d > file.txt
```



