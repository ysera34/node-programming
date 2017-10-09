var os = require('os');

console.log("os.hostname() : %s", os.hostname());
console.log("os.type() : %s", os.type());
console.log("os.platform() : %s", os.platform());
console.log("os.arch() : %s", os.arch());
console.log("os.release() : %s", os.release());
console.log("os.uptime() : %d", os.uptime());
console.log("os.loadavg() : %s", os.loadavg());
console.log("os.totalmem() : %d", os.totalmem());
console.log("os.freemem() : %s", os.freemem());
console.log("os.cpus() : %j", os.cpus());
console.log("os.networkInterfaces() : %j", os.networkInterfaces());

// ---------- // ---------- // ---------- // ----------

var url = require('url');

var parsedObject = url.parse('http://www.example.com/book/look.html?isbn=978-888-999');
console.log(parsedObject);


var querystring = require('querystring');

console.log(querystring.parse(parsedObject.query));
console.log(url.parse('http://www.example.com/book/look.html?isbn=978-888-999', true));

// ---------- // ---------- // ---------- // ----------

var util = require('util');

var data = util.format('%d + %d = %d', 52, 273, 52 + 273);
console.log(data);

// ---------- // ---------- // ---------- // ----------

var crypto = require('crypto');

var shasum = crypto.createHash('sha1');
shasum.update('crypto_hash');
var output = shasum.digest('hex');

console.log('crypto_hash:', output);

// ---------- // ---------- // ---------- // ----------

var key = 'My private key that no one knows';
var input = 'PASSWORD';

// encryption
var cipher = crypto.createCipher('aes192', key);
cipher.update(input, 'utf8', 'base64');
var cipheredOutput = cipher.final('base64');

// decryption
var decipher = crypto.createDecipher('aes192', key);
decipher.update(cipheredOutput, 'base64', 'utf8');
var decipheredOutput = decipher.final('utf8');

console.log('input : ', input);
console.log('cipheredOutput : ', cipheredOutput);
console.log('decipheredOutput : ', decipheredOutput);

// ---------- // ---------- // ---------- // ----------

var fs = require('fs');

var text = fs.readFileSync('textfile.txt', 'utf8');
console.log('read file sync output : ', text);

fs.readFile('textfile.txt', 'utf8', function (error, data) {
    console.log('read file async output : ', data);
});

var data = 'Hello world write file';

fs.writeFile('textfile2.txt', data, 'utf8', function (error) {
    console.log('write file async completed');
});

fs.writeFileSync('textfile3.txt', data, 'utf8');
console.log('write file sync completed');