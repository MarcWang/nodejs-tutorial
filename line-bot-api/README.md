## 申請BOT API Trial Account

https://business.line.me/services/products/4/introduction

![line-bot-api-register](http://farm8.staticflickr.com/7359/26200598203_8060331b22_b.jpg)

<!-- Channel ID
Channel Secret
MID -->


#### API訊息規範
- Protocol: HTTPS
- HTTP method: POST
- Content type: application/json; charset=UTF-8
- Target URL: URL registered on the Channel Console

當使用者傳送訊息時，Line會透過API POST的方式將資料傳送給你的伺服器

## 接收訊息(Receiving Messages)

```json
{
    "result":[
    {
        "from":"u2ddf2eb3c959e561f6c9fa2ea732e7eb8",
        "fromChannel":"1341301815",
        "to":["u0cc15697597f61dd8b01cea8b027050e"],
        "toChannel":1441301333,
        "eventType":"138311609000106303",
        "id":"ABCDEF-12345678901",
        "content": null
    }]
}
```

**result物件的參數說明**

- from = u2ddf2eb3c959e561f6c9fa2ea732e7eb8 (固定)
- fromChannel = 1341301815 (固定)
- id = 辨識訊息的ID 
- eventType = 訊息事件型態
    - 138311609000106303 = 接收訊息 (如訊息或照片)
    - 138311609100106403 = 接收操作指令 (如加好友)
- content = 傳送的訊息內容
- createdTime = 訊息成立的時間
- toChannel = BOT API伺服器的Channel ID
- to = 有哪些使用者會收到此訊息，所有使用者的MID

```json
{
    "location":null,
    "id":"325708",
    "contentType":1,
    "from":"uff2aec188e58752ee1fb0f9507c6529a",
    "createdTime":1332394961610,
    "to":["u0a556cffd4da0dd89c94fb36e36e1cdc"],
    "toType":1,
    "contentMetadata":{ 
        "AT_RECV_MODE": 2, 
        "SKIP_BADGE_COUNT": true 
    },
    "text":"Hello, BOT API Server!",
    "deliveredTime": 0,
    "seq": null
}
```

**content物件的參數說明**

- toType = 哪一類型的使用者會收到此訊息
- createdTime = 訊息成立的時間
- from = 傳送訊息使用者的MID
- location = 傳送地理位置的資訊
- to = 有哪些使用者會收到此訊息，所有使用者的MID
- text = 訊息內容，最長文字為10000的字元
- contentMetadata = 訊息的詳細資訊 (Object)
    - AT_RECV_MODE = 
    - SKIP_BADGE_COUNT = 
    - STKPKGID = (貼圖類型(contentType))
    - STKID = 貼圖ID (貼圖類型(contentType))
    - STKVER = 耶圖版本 (貼圖類型(contentType))
    - STKTXT = 貼圖代表內容文字 (貼圖類型(contentType))
    - mid = 連絡人的的MID (連絡資訊類型(contentType))
    - displayName = 連絡人的暱稱 (連絡資訊類型(contentType))
- deliveredTime = 沒解釋
- contentType = 訊息的型態 (Integer)
    - 1 = Text message
    - 2 = Image message
    - 3 = Video message
    - 4 = Audio message
    - 7 = Location message
    - 8 = Sticker message
    - 10 = Contact message
- seq = 沒解釋

## 取得訊息內容 (Getting Message Content)

伺服器     trialbot-api.line.me

GET        /v1/bot/

**Header**
```header
X-Line-ChannelID: Channel ID
X-Line-ChannelSecret: Channel secret
X-Line-Trusted-User-With-ACL: MID (of Channel)
```

**API List**
- https://trialbot-api.line.me/v1/profiles
- https://trialbot-api.line.me/v1/bot/message/<messageId>/content
- https://trialbot-api.line.me/v1/bot/message/<messageId>/content/preview


## 傳送格式

伺服器     trialbot-api.line.me

POST       /v1/events

**Header**
```header
'Content-Type': 'application/json; charset=UTF-8'
X-Line-ChannelID: Channel ID
X-Line-ChannelSecret: Channel secret
X-Line-Trusted-User-With-ACL: MID (of Channel)
```

## 傳送訊息 (Sending Messages)
```json
{
    "to":["u5912407b444e54885d00111f7b0ce375"],
    "toChannel":1383378250,
    "eventType":"138311608800106203",
    "content":{
        "contentType":1,
        "toType":1,
        "text":"Hello!"
    }
}
```

- to = 目標使用者MID
- toChannel = 1383378250 (固定)
- eventType = 138311608800106203 (固定)
- content = 傳送文字內容
- contentType = 2 (固定)
- toType = 1 (固定)
- text = 傳送文字

## 傳送圖片 (Sending Image)
```json
{
    "to":["u5912407b444e54885d00111f7b0ce375"],
    "toChannel":1383378250,
    "eventType":"138311608800106203",
    "content":{
        "contentType":2,
        "toType":1,
        "originalContentUrl":"http://example.com/original.jpg",
        "previewImageUrl":"http://example.com/preview.jpg"
    }
}
```

- to = 目標使用者MID
- toChannel = 1383378250 (固定)
- eventType = 138311608800106203 (固定)
- content = 傳送圖片內容
- contentType = 2 (固定)
- toType = 1 (固定)
- originalContentUrl = 圖片來源URL，只支援JPEG格式，最大1024*1024
- previewImageUrl = 圖片縮圖來源URL，只支援JPEG格式，最大240*240

## 傳送影片 (Sending Video)
```json
{
    "to":["u5912407b444e54885d00111f7b0ce375"],
    "toChannel":1383378250,
    "eventType":"138311608800106203",
    "content":{
        "contentType":3,
        "toType":1,
        "originalContentUrl":"http://example.com/original.mp4",
        "previewImageUrl":"http://example.com/preview.jpg"
    }
}
```

- to = 目標使用者MID
- toChannel = 1383378250 (固定)
- eventType = 138311608800106203 (固定)
- content = 傳送圖片內容
- contentType = 3 (固定)
- toType = 1 (固定)
- originalContentUrl = 影片來源URL，只支援mp4格式
- previewImageUrl = 影片縮圖來源URL

##傳送語音 (Sending Audio)
```json
{
    "to":["u5912407b444e54885d00111f7b0ce375"],
    "toChannel":1383378250,
    "eventType":"138311608800106203",
    "content":{
        "contentType":4,
        "toType":1,
        "originalContentUrl":"http://example.com/original.m4a",
        "contentMetada":{
            "AUDLEN":"240000"
        }
    }
}
```

- to = 目標使用者MID
- toChannel = 1383378250 (固定)
- eventType = 138311608800106203 (固定)
- content = 傳送圖片內容
- contentType = 4 (固定)
- toType = 1 (固定)
- originalContentUrl = 語音來源URL，只支援m4a格式
- contentMetada.AUDLEN = 語音長度 (milliseconds)

##傳送位址 (Sending Location)
```json
{
    "to":["u5912407b444e54885d00111f7b0ce375"],
    "toChannel":1383378250,
    "eventType":"138311608800106203",
    "content":{
        "contentType":7,
        "toType":1,
        "text":"Convention center",
        "location":{
            "title":"Convention center",
            "latitude":35.61823286112982,
            "longitude":139.72824096679688
        }
    }
}
```
