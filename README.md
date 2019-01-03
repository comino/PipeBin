
# Pipebin
## Maintainer: Sven Eliasson 

PipeBin is a simple self-deployable service for simple text or file transmission between 
command lines without the need to install any software. Sometimes you cant or dont want 
to install additional tools and you just need to get some data across to another computer,
server or person. Typical usecases: 
- to transfer your public ssh key to establish a secure ssh connction
- to quickly transport code snippets via command line to another person
- to distribute instructions / notes to several people
- to send the lady acrross the room a funny cat pic 

# Why? 
Here we are, shooting cars into space and having super computers in our pockets. But one 
thing is still done like decades ago. Simple, human compatible file exchange. Whenever I
need to get a single simple file from one computer to another - there is actually no
default way of doing this without making asumptions about preinstalled tools. 
Yes you can send files via Emails - but not every computer you touch has a mail client installed.
Yes you can use Slack - but not every computer has a browser you are willing to type passwords into. 
Yes you can use ssh / sftp - but lets do that on your coworkers smartphone. 
Yes you can use pasteBin - but how can I put a image in there? 

I think this is still an interesting problem without a proper solition , and I dont claim 
to have a sulution for this.  This project is a research project to test how far a centralized
service for easy file exchange can solve this with 'creative' approaches, without beeing
another online file hoster in the end or a tool you need to install like any other. 

How far can we get with the available tools we have on any pc? 


The goal: 
- a single, easy deployable service beeing a data hub
- files are addressed with human readable URLs which can be easaly transmitted via voice
- responses contain a machine readable QR code containing the URL of the file 
- sending and receiving computers should (if possible) not need to install any tools
- the file is stored for very limited time, selfdestruct after some minutes
- dont even try to make hub trustful with tons of security mechanismn, simple client side encryption prefered

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

Please note: This is currently a research experiment intentionally hacky.
Deep in my heart I want a p2p solution, but maybe I can learn something!
Dont trust my service pipebin.eu // pipebin.eu, deploy yourself! 

# File name collision 
Currently there is no inbuild access controll. The only thing preventing other people from scraping your file 
is the random generated URL. The dictionary contains 2173 words. The filename collision 
is mainly dependend on the number of concated words. 

- 2 words: 4.7 10^6  combinations 
- 3 words: 1.0 10^10 combinations 
- 4 words: 2.2 10^13 combinations 
- 5 words: 4.8 10^16 combinations

# Installation
```
git clone 
npm install 
npm start
```

# Usage
```
echo "Hello World" | nc pipebin.de 4444 
http://pipebin.de/rose-butter-heaven-oil
cat file.txt | nc pipebin.de 4444
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



