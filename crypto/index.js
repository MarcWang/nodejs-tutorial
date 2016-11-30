const crypto = require('crypto');
const algorithm = 'aes192'; //aes-256-ctr
const password = 'WF';

function encrypt(text) {
    let cipher = crypto.createCipher(algorithm, password);
    let crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

function decrypt(text) {
    let decipher = crypto.createDecipher(algorithm, password);
    let dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}

function encryptHash(algorithm, content) {
    let shasum = crypto.createHash(algorithm);
    shasum.update(content, 'utf8', 'hex');
    let crypted = shasum.digest('hex');
    return crypted;
}

console.log(`NodeJS Version ${process.version}`);
const hashes = crypto.getHashes();
const content = 'hello';
for (let hash of hashes) {
    const result = encryptHash(hash, content);
    console.log(`${hash} : ${result}`);
}
