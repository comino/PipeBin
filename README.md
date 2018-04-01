
# PipeBeam
## Author: Sven Eliasson 
PipeBeam is a simple self-deployable service for simple text or file transmission between command lines without the need to install any software. Sometimes you cant or dont want to install additional tools and you just need to get some data across to another computer, server or person. Typical usecases: 
- to transport your public ssh key to establish a secure ssh connction
- to quickly transport code snippets via command line to another person
- to distribute instructions / notes to several people

You can write via a raw tcp connection to your instance or the publicly hosted services like: 
```
$ cat ~/.ssh/id_rsa.pub | nc pipebin.de 4444 
> http://pipebin.de/rusty-piper-beaf
```
It will produce easaly readable domain names made to be transmitted via voice. 
It furthermore can optionally produce QR code codes for pc-smartphone transmission by using port 55555 which will be directly printed in the command line. 

```
$ cat ~/.ssh/id_rsa.pub | nc pipebin.de 55555
http://pipebin.de/boat-barrier-west
{{QR_CODE_WILL_APPEAR_HERE}}
```

Please note: This is currently a quick hack to check if it suits my own needs.
NOT READY FOR REAL USAGE

# Installation
```
git clone 
npm install 
npm start
```

# Usage
```
$ echo "Hello World" | nc pipebeam.eu 4444 
> http://pipebeam.eu/rose-butter-heaven-oil
$ cat file.txt | nc pipebeam.eu 4444
```

# Security
This solution is ment to be self deployed. Please note, that there is currently no built in way for encryption. 
Please consider your data public once you use the public hosted service. 
You may add your own encryption: 

```
# encryption
$ cat file.txt | openssl enc -aes-256-cbc -base64 | nc pipebeam 4444
#decryption
curl -s http://pipebeam.com/{BEAM_ID} | openssl enc -aes-256-cbc -base64 -d > file.txt
```



