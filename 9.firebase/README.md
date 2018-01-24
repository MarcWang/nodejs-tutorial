

### Server端加入Firebase

1. 建立一個專案[Firebase console](https://console.firebase.google.com/)
2. 權限 -> IAM與管理員 -> 服務帳戶
3. 選擇欲使用帳戶並在右方選擇建立金鑰
4. 選擇JSON類型並建立

安裝firebase sdk

```bat
npm install firbase --save
```

接下來在程式中加入便可以使用

```js
var firebase = require("firebase");
firebase.initializeApp({
    serviceAccount: "path/to/serviceAccountCredentials.json",
    databaseURL: "https://{databaseName}.firebaseio.com"
});
```

參考 [Add Firebase to your Server](https://firebase.google.com/docs/server/setup)

### 儲存資料

Firebase提供四種方式寫入資料 `set` 、 `update` 、 `push` 、 `transaction`。

- set : 寫入或覆蓋至指定路徑； 如 `messages/users/<username>`

``` js
var schoolRef = ref.child("school");
schoolRef.set({
    classA: {
        students: 50,
        teacher: 'Marc'
    },
    classB: {
        students: 35,
        teacher: 'Ingrid'
    }
});
```

如果想要新增部分資訊也可以寫成這樣

```js
schoolRef.child("classC").set({
    students: 49,
    teacher: 'Nick'
});
```

- update : 更新全部或部分資料

```js
var schoolRef = ref.child("school");
schoolRef.update({
    classA: {
        students: 47,
        teacher: 'Marc'
    }
})
```

一次同步更新多個也可以使用下面這種寫法

```js
schoolRef.update({
    "classB/students": 41,
    "classC/students": 51
})
```

可以加入callback函式檢查成功或失敗

``` js
schoolRef.update({
    "classB/students": 41,
    "classC/students": 51
}, (error) => {
    if(error){
        console.log(`Data could not be saved ${error}`);
    }else{
        console.log('Data saved successfully.')
    }
})
```

- push : 解決覆蓋問題，當有兩個同時寫入同一個位置時，會有其中一個寫入的資料會被覆蓋，所以利用`push`可以自動產生一個以時間戳的ID避免覆蓋。

```js
var postRef = ref.child("posts");
var newPost = postRef.push();
var postId = newPost.key;
console.log(postId)
//-JRHTHaIs-jNPLXOQivY

newPost.set({
    title: 'I like her',
    author: 'Marc'
})

postRef.push().set({
    title: 'He like me',
    author: 'Ingrid'
})
```

- transaction : 固定新增或減少數據時可使用

```js
var authorRef = db.ref('/some_resource/school/classA/students');
authorRef.transaction((current_value) => {
    return (current_value || 0) + 1;
})
```

參考 [Saving Data](https://firebase.google.com/docs/database/server/save-data)