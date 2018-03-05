# Foundation

* Foundation 框架是 XT 的核心库，你可以使用 Foundation 框架处理包括数据、网络、存储等 API。
* Foundation 框架前缀是 ```NS```，API 的蓝本是 macOS / iOS Foundation Framework。
* Foundation 框架所提供的 API 是跨平台一致的。

## 数据

使用 ```NS.Data``` 处理数据相关操作，它封装了 ```Bytes``` 的各种操作，避免开发者直接接触 ```Bytes```。

### 创建一个 Data 对象

你可以使用字符串创建一个 Data 对象。

```typescript
const data = NS.Data.initWithString("Hello, World!")
```

也可以使用 Base64 编码字符串创建一个 Data 对象。

```typescript
const data = NS.Data.initWithBase64EncodedString("SGVsbG8sIEJlbmppIQ==")
```

当然，使用 Uint8Array 创建一个 Data 对象，也是可以的。

```typescript
const data = NS.Data.initWithBytes(new Uint8Array([1, 2, 3, 4]))
```

### 获取 UTF-8 字符串

你可以使用以下方法，获取 UTF-8 字符串（只支持 UTF-8）。

```typescript
const fooString = data.utf8String()
```

### 获取 Uint8Array

同样的，你也可以从 Data 对象中获取 Uint8Array 对象。

```typescript
const arr = data.getBytes()
```

### 获取哈希值

你可以通过 md5 和 sha1 方法，获取哈希值。

```typescript
const digest = data.md5()
const digest = data.sha1()
```

### 获取 Base64 编码字符串

你可以使用以下方法获得 Base64 编码后的字符串，或是 Base64 编码后的 Data 对象。

```typescript
const encodedString = data.base64EncodedString()
const encodedData = data.base64EncodedData()
```

## 网络

你可以使用 ```NS.URLSession``` API 访问 HTTP 服务。

* 注意：iOS 和 Android 原生平台没有跨域限制，Web 平台存在跨域限制，你只能使用 [CORS](http://www.ruanyifeng.com/blog/2016/04/cors.html) 解决问题。

### URLRequest

在发起 HTTP 请求前，你需要先初始化 ```NS.URLRequest``` 对象（也可以直接使用 URL 进行请求）。

```typescript
const request = new NS.URLRequest("https://api.github.com/users?since=0")
request.setHTTPMethod("GET") // 设置 HTTPMethod，可选值为 GET POST PUT DELETE，默认值是 GET。
request.setHTTPHeader("aValue", "aKey") // 设置 HTTP Header 信息。
request.setHTTPBody("XXXX") // 设置 HTTP 的正文信息，如果是 GET 请求，一般不设置这个。
```

### 创建任务

我们需要使用 ```NS.URLSession``` 创建一个任务。

```typescript
const task = NS.URLSession.sharedSession.dataTaskWithRequest(request, (data, response, error) => {

})
```

### 发起请求

使用 ```resume``` 方法，激活一个任务。

```typescript
task.resume()
```

### 获取返回数据

我们需要修改一下 ```创建任务``` 的代码，以便获取返回数据，这个 API 返回的数据是 JSON 格式的 UTF-8 字符串，我们使用以下方法处理返回。

```typescript
const task = NS.URLSession.sharedSession.dataTaskWithRequest(request, (data, response, error) => {
    if (data) {
        try {
            const objects = JSON.parse(data.utf8String())
            console.log(objects)
        } catch (e) {}
    }
})
```

* 在返回参数中 data 是 ```NS.Data``` 对象
* 在返回参数中 response 是 ```NS.URLResponse``` 对象
* 在返回参数中 error 是 ```Error``` 对象

## WebSocket

你可以使用 ```NS.WebSocket``` 发起 WebSocket 请求，```NS.WebSocket``` 支持 ```ws://``` 和 ```wss://``` 两种协议头，一个应用理论上可以创建不超过 64 个 WebSocket 连接。

### 创建实例

```typescript
this.socket = new NS.WebSocket("ws://sandbox.kaazing.net/echo").retain()
```

* 注意，socket 实例必须使用 ```retain``` 方法，以保证它不会被意外释放。

### 监听事件

```typescript
this.socket.onOpen = () => {
    this.socket.sendString("Hello, World!");
}
this.socket.onMessage = (msg) => {
    console.log(msg)
}
```

* onMessage 的第一个参数，可能是 ```string``` 类型，也可能是 ```NS.Data``` 类型。
* sendString 用于发送 ```string``` 数据。
* sendData 用于发送 ```NS.Data``` 数据。 

### 断开连接

```typescript
this.socket.close()
```

## 配置存储

你可以使用 ```NS.UserDefaults``` API 保存一些简单的 Key-Value 数据，这些数据一般是用户配置。

### 写入

你可以写入 ```string | number | boolean | null | object | array``` 类型的值。

```typescript
NS.UserDefaults.standard.set("Hello, World!", "testKey")
```

### 读取

```typescript
const value = NS.UserDefaults.standard.get("testKey")
```

### 删除

写入一个 ```undefined``` 值即可达到删除的目的。

```typescript
NS.UserDefaults.standard.set(undefined, "testKey")
```

## 文件存储

你可以使用 ```NS.FileManager``` API 存储数据(```NS.Data```)到文件系统，在不同平台上，可以存储的大小有以下限制。

* iOS 无限制
* Android 无限制
* Web 单个文件不超过 100K 所有文件不超过 5M

### 仓库

你可以将文件存储到不同的仓库中。

* document，只能存储由用户主动生成的数据，它会被 iCloud 自动备份，在 document 仓库写入缓存文件可能被 App Store 拒绝上架。
* cache，用于保存缓存数据，它会在用户手机空间不足时被自动删除。
* tmp，用于保存临时数据，它会在应用结束或者用户手机空间不足时被自动删除。
* sdcard，只有 Android 原生平台可用，用于保存长效数据，用户可能会拒绝你使用 sdcard 仓库。

### 写入

```typescript
const data = NS.Data.initWithString("Hello, World!")
NS.FileManager.document.writeData(data, "foo.txt")
```

### 读取

```typescript
const data = NS.FileManager.document.readData("foo.txt")
console.log(data.utf8String())
```

### 遍历文件

使用 ```list``` 方法遍历文件夹下的所有文件，这将得到一个数组对象。

```typescript
const allFiles = NS.FileManager.document.list('/')
```

### 检查文件是否存在

```typescript
NS.FileManager.document.isFileExist('foo.txt')
```

### 删除文件

```typescript
NS.FileManager.document.deleteFile('foo.txt')
```

## 通知中心

使用通知中心，可以监听一个事件，也可以发送一个事件，这些事件可以跨 Context，跨应用传递。

### 创建监听者

```typescript
this.observer = NS.NotificationCenter.default.addObserver("FooEvent", (note) => {
    console.log(note)
})
```

### 发送事件

发送事件的同时，可以附带两个参数，这将会附带在监听者得到的 note 对象中。

```typescript
NS.NotificationCenter.default.postNotification("FooEvent", "Hello, World!", { aKey: "aValue" });
```

### 移除监听者

在不需要继续监听时，移除监听者。

```typescript
NS.NotificationCenter.default.removeObserver(this.observer)
```