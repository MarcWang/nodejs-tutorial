# Firebase

## 專案初始化設定

1. 專案設定
2. 服務帳號
3. 選擇NodeJS
4. 產生新的私密金鑰

> 金鑰內容如下

``` json
{
  "type": "service_account",
  "project_id": "YOUR_PROJECT_ID",
  "private_key_id": "YOUR_PRIVATE_KEY_ID",
  "private_key": "YOUR_PRIVATE_KEY",
  "client_email": "YOUR_CLIENT_EMAIL",
  "client_id": "YOUR_CLIENT_ID",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ps43a%40marctalk-623a0.iam.gserviceaccount.com"
}
```

``` js
var admin = require("firebase-admin");

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://YOUR_PROJECT_NAME.firebaseio.com"
});
```

## 安裝firebase sdk

```bat
npm install firebase-admin --save
```

### 儲存資料

Firebase提供四種方式寫入資料 `set` 、 `update` 、 `push` 、 `transaction`。

參考 [Saving Data](https://firebase.google.com/docs/database/server/save-data)