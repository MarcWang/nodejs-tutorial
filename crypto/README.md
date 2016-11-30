

### Crypto
> OpenSSL

### Hash 雜湊演算法
> 
具備不可逆
確保傳送資料沒被篡改
單向雜湊函數(One Way Hash Function)

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
  'RSA-RIPEMD160',
  'RSA-SHA',
  'RSA-SHA1',
  'RSA-SHA1-2',
  'RSA-SHA224',
  'RSA-SHA256',
  'RSA-SHA384',
  'RSA-SHA512',
  'dsaEncryption',
  'dsaWithSHA',
  'dsaWithSHA1',
  'dss1',
  'ecdsa-with-SHA1',
  'md4',
  'md4WithRSAEncryption',
  'md5',
  'md5WithRSAEncryption',
  'mdc2',
  'mdc2WithRSA',
  'ripemd',
  'ripemd160',
  'ripemd160WithRSA',
  'rmd160',
  'sha',
  'sha1',
  'sha1WithRSAEncryption',
  'sha224',
  'sha224WithRSAEncryption',
  'sha256',
  'sha256WithRSAEncryption',
  'sha384',
  'sha384WithRSAEncryption',
  'sha512',
  'sha512WithRSAEncryption',
  'shaWithRSAEncryption',
  'ssl2-md5',
  'ssl3-md5',
  'ssl3-sha1',
  'whirlpool' ]

> 輸出
NodeJS Version v6.9.0
RSA-SHA : ac62a630ca850b4ea07eda664eaecf9480843152
RSA-SHA1 : aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d
RSA-SHA256 : 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
RSA-SHA512 : 9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca72323c3d99ba5c11d7c7acc6e14b8c5da0c4663475c2
e5c3adef46f73bcdec043
md5 : 5d41402abc4b2a76b9719d911017c592
sha : ac62a630ca850b4ea07eda664eaecf9480843152
sha1 : aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d
sha256 : 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
sha512 : 9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca72323c3d99ba5c11d7c7acc6e14b8c5da0c4663475c2e5c3
adef46f73bcdec043


### Hmac
### 加密和解密
### 簽章和驗證
### salt