
```sh
$ npm install -g babel-cli
```

### Create .babelrc configuration file

首先需要建立一個`.babelrc`的設定檔在根目錄底下，與執行檔案同階層。

在Windows要建立一個空白名稱會出現錯誤，可以用下指令的方式

```bat
type NUL > .babelrc
```

**.babelrc**
```
{
    "presets": ["es2015"],
    "plugins": []
}
```

`presets`是指需要加入哪些轉碼規則，也必須相對安裝module

```sh
$ npm install --save-dev babel-preset-es2015
```
[plugins](http://babeljs.io/docs/plugins/)

```
$ babel example.js
```

單一檔案
```sh
$ babel example.js -o compiled.js
```

整個目錄
```sh
$ babel src -d lib
```







