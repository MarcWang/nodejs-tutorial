

### Crypto
> OpenSSL

### 何謂 Hash 雜湊演算法 ?
> 將一段已知的資料內容，透過某個函式 ( Hash Function ) 計算出雜湊值 ( Hash Value )
> 具備不可逆，不可反推計算出原本的值
> 對任意長度的訊息輸入，都能產生固定長度的雜湊值


### 如何評估一個好的雜湊演算法 ?
- 效率好，能快速算出鍵值所對應的儲存位址。
- 能有效利用雜湊表空間，不致於造成過度集中的情況。
- 能有效降低collision發生的機率。

### 專有名詞

訊息摘要 ( Message Digest )
> 雜湊值的另稱

單向的映射函數 ( One way transformation )
> 無法由輸出反推其原輸入值

擴張性 ( Diffusion )
> 只要修改明文某一部分，就會影響整個密文的樣子

Collision(碰撞)
> 雜湊函數的輸入和輸出不是一對一的關係，當兩個不同值卻得到相同的雜湊值，這就叫雜湊碰撞

雜湊訊息鑑別碼 ( Hash-based Message Authentication Code )
> 

明文 ( Plaintext )
> 尚未加密的原始資料，例如密碼本身 ( EX: 123456 )

密文 ( Ciphertext )
> 加密後的資料，例如存到資料庫的密碼 ( EX: 5d41402abc4b2a76b9719d911017c592 )

加密演算法 ( Encryption Algorithm )
> 對明文加密的演算法

解密演算法 ( Decryption Algorithm )
> 對密文解密的演算法

對稱加密算法 ( Symmetric Encryption )
> 加密跟解密使用同一支私鑰

不對稱加密算法 ( Asymmetric Encryption )
> 加密跟解密是使用一對金鑰

生日攻擊法 (Birthday Attack)
>

中途相遇攻擊法 (Meet-in-the-Middle Attack)
>

### 應用

一般來說，不同的輸入值應該產生不同的雜湊值。
SHA-2 包含 224, 256, 384, 512
MD5 的雜湊值長度為 128 位元
SHA-1 的摘要長度為 160位元

- MD5
- SHA
- SHA1
- SHA256
- SHA512
- RSA-SHA

```js
const crypto = require('crypto');
console.log(`NodeJS Version ${process.version}`);
const hashes = crypto.getHashes();
console.log(hashes);
```

> 輸出
NodeJS Version v6.9.0
[ 'DSA',
  'DSA-SHA',
  'DSA-SHA1',
  'DSA-SHA1-old',
  'RSA-MD4',
  'RSA-MD5',
  'RSA-MDC2',
  'RSA-RIPEMD160'...]


### 加密和解密
### 簽章和驗證
### salt

常見的方式
- bcrypt
- scrypt
- Argon2
- PBKDF2 


密碼明文
產生亂數SALT(固定長度)
(密碼明文 + 亂數SALT)做HASH加密 = 加密密碼
加密密碼 + 亂數SALT = 儲存密碼

### MD5 ( 密碼 ) -> 強烈不建議
> 已可以破解

```js
function encryptHashWithMD5(password) {
    return crypto.createHash('md5')
        .update(password, 'utf8', 'hex')
        .digest('hex');
};

const hash_md5_password = encryptHashWithMD5(password);
console.log(hash_md5_password);

```

### MD5( 密碼 + Salt ) -> 不建議
>

```js

function genRandomString(length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length);
};

function encryptHashWithMD5(password) {
    return crypto.createHash('md5')
        .update(password, 'utf8', 'hex')
        .digest('hex');
};

const salt = genRandomString(6);
const password = '123456';
const password_salt = password + salt;
const hash_md5_salt_password = encryptHashWithMD5(password_salt);
console.log(hash_md5_salt_password);

```


### PBKDF2 -> (建議)
> PBKDF2 ( Password-Based Key Derivation Function 2 )

```js

function genRandomString(length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length);
};

function encryptPBKDF2(password, salt) {
    const iterations = 10000;
    const key_length = 512;
    const algorithm = 'sha256';
    return crypto.pbkdf2Sync(password, salt, iterations, key_length, algorithm)
        .toString('hex');
};

const password = '123456';
const salt = genRandomString(6);
const pbkdf2_password = encryptPBKDF2(password, salt);
console.log(pbkdf2_password);

```


### 方法
1. 輸入明文密碼
2. 產生亂數SALT字串
3. 合併明文密碼與SALT字串
4. 對合併後的字串做雜湊(Hash)
5. 儲存雜湊值與SALT字串


###
Cryptographic hash algorithms (e.g. SHA256) are deterministic one-way algorithms that require zero keys.
Keyed hashing algorithms (e.g. HMAC) are used for authentication in secret-key cryptography; requires one key.
Secret-key encryption algorithms (e.g. AES-CTR) are used to transform messages so only someone possessing the secret key can reverse; requires one key.
Shared secret agreement algorithms (e.g. ECDH) are used to negotiate a shared secret key while only requiring the public transmission of both party's public keys. Requires four keys (two pairs of private/public) to generate a fifth.
Digital signature algorithms (e.g. Ed25519) are used to sign messages (with one's private key) that anyone possessing the corresponding public key can validate. Requires two keys.
Password hashing algorithms (e.g. bcrypt) are slow hashing algorithms designed specifically for being difficult to efficiently attack with a brute force search. Requires one secret input and a per-user salt.
Encoding algorithms (e.g. Base64) are not cryptographic.
Compression algorithms (e.g. gzip) are not cryptographic

[node-argon2](https://github.com/ranisalt/node-argon2)
[PHC (Password Hashing Competition )]()
[Crackstation](https://crackstation.net/hashing-security.htm)
