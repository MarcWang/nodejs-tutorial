# 雲端圖片服務 Cloudinary

## 使用方式

先到[Cloudinary](https://cloudinary.com/)申請開發者帳號，取得以下開發必要的資訊。

``` js
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.IMG_CLOUDINARY_AC,
    api_key: process.env.IMG_CLOUDINARY_API_KEY,
    api_secret: process.env.IMG_CLOUDINARY_API_SEC
});
```

### 使用callback方式上傳圖片

``` js
const file = './../assets/images/waffle.png';
const options = {
    tags: 'waffle'
}
cloudinary.uploader.upload(file, options, (err, result) => {
    if( err ){
        console.error(err);
        return;
    }
    console.log(result);
});
```

> 如果上傳成功會回傳以下資訊
- public_id: 'khwdncjw3gnlpb5y5eyv' `可以透過URL直接取得的ID`
- version: 1516851472
- signature: '3be614aa611918fdb87748a3cb074b8f27043616'
- width: 204 `原始圖片寬度`
- height: 201 `原始圖片長度`
- format: 'png' `原始圖片格式`
- resource_type: 'image'
- created_at: '2018-01-25T03:37:52Z' `建立時間`
- tags: [ 'waffle' ] `該圖片的tag`
- bytes: 31764 `原始圖片檔案大小`
- type: 'upload'
- etag: '55a9b992d9da4a6852e810d4f028eab0'
- placeholder: false
- url: http://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1516851472/khwdncjw3gnlpb5y5eyv.png
- secure_url: https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1516851472/khwdncjw3gnlpb5y5eyv.png
- original_filename: 'waffle'

---

### 使用stream方式上傳圖片

``` js
const file = './../assets/images/waffle.png';
const options = {
    tags: 'waffle'
}
const upload_stream = cloudinary.uploader.upload_stream(options, (err, result) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(result);
});
const file_reader = fs.createReadStream(file).pipe(upload_stream);
```

---

### 使用Promise方式上傳圖片

``` js
const file = './../assets/images/waffle.png';
const options = {
    tags: 'waffle'
}
cloudinary.uploader.upload(file, options).then(image => {
    console.log(image);
}).catch(err => {
    console.error(err);
});
```

---

### 指定 Public ID

``` js
const file = './../assets/images/waffle.png';
const options = {
    tags: 'waffle'
}
const options_public_id = Object.assign({
    public_id: 'unique_id'
}, options);
cloudinary.uploader.upload(file, options_public_id).then(image => {
    console.log(image);
}).catch(err => {
    console.error(err);
});
```

---

### 上傳圖片時直接做型態轉換

``` js
const file = './../assets/images/waffle.png';
const options = {
    tags: 'waffle'
}
const eager_options = {
    width: 64,
    height: 64,
    crop: 'scale',
    format: 'jpg'
};
const options_transformations = Object.assign({ eager: eager_options }, options);
cloudinary.uploader.upload(file, options_transformations).then(image => {
    console.log(image);
}).catch(err => {
    console.error(err);
});
```

> 比照原本的回傳值會多出一個eager的物件

- eager:
  - transformation: 'c_scale,h_64,w_64/jpg',
  - width: 64,
  - height: 64,
  - bytes: 3052,
  - url: 'http://res.cloudinary.com/dcqgm4tgy/image/upload/c_scale,h_64,w_64/v1516851039/pofiverbkbtgj2nqx16t.jpg',
  - secure_url: 'https://res.cloudinary.com/dcqgm4tgy/image/upload/c_scale,h_64,w_64/v1516851039/pofiverbkbtgj2nqx16t.jpg'