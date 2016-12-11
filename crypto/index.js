const crypto = require('crypto');
// const algorithm = 'aes192'; //aes-256-ctr
// const password = 'WF';

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

function encryptHashWithMD5(password) {
    return crypto.createHash('md5')
        .update(password, 'utf8', 'hex')
        .digest('hex');
};


function genRandomString(length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length);
};

function encryptPasswordWithHMAC(algorithm, password, salt) {
    return crypto.createHmac(algorithm, salt)
        .update(password)
        .digest('hex');
};

function encryptPBKDF2(password, salt) {
    const iterations = 10000;
    const key_length = 512;
    const algorithm = 'sha256';
    return crypto.pbkdf2Sync(password, salt, iterations, key_length, algorithm)
        .toString('hex');
};


// function encryptSign(algorithm, privateKey, content) {
//     let sign = crypto.createSign(algorithm);
//     sign.update(content, 'utf8', 'hex');
//     signture = sign.sign(privateKey);
//     return signture;
// }
// 

const password = '123456';
const salt = genRandomString(6);

const hash_md5_password = encryptHashWithMD5(password);
console.log(hash_md5_password);

const password_salt = password + salt;
const hash_md5_salt_password = encryptHashWithMD5(password_salt);
console.log(hash_md5_salt_password);

const pbkdf2_password = encryptPBKDF2(password, salt);
console.log(pbkdf2_password);

// const store_data = encryptPasswordWithHMAC('sha256', '123456', salt);
// console.log(store_data);


// console.log(`NodeJS Version ${process.version}`);
// const hashes = crypto.getHashes();
// const content = 'hello';
// for (let hash of hashes) {
//     const result = encryptHash(hash, content);
//     console.log(`${hash} : ${result}`);
// }
