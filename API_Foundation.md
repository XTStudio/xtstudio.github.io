# API 文档 - Foundation

> 所有 Foundation 类均以 ```NS.``` 前缀命名。

## Data

使用 Data 类操作二进制数据，支持 UTF-8 字符串与 Data 相互转换，支持 Base64 编解码，支持哈希计算。

### 字符串转换

* 将 UTF-8 字符串转换成 Data 对象

    ```typescript
    static initWithString(value: string): Data  
    ```

* 将 Data 对象转换为 UTF-8 字符串

    ```typescript
    utf8String(): string | undefined  
    ```

### Base64 编解码

* 使用 Base64 字符串创建 Data 对象

    ```typescript
    static initWithBase64EncodedString(string: string): Data | undefined  
    ```

* 使用 Base64 Data 对象创建解码后的 Data 对象

    ```typescript
    static initWithBase64EncodedData(data: Data): Data | undefined  
    ```

* 将当前 Data 对象编码成 Base64 字符串

    ```typescript
    base64EncodedString(): string  
    ```

* 将当前 Data 对象编码成 Base64 Data 对象

    ```typescript
    base64EncodedData(): Data  
    ```

### 哈希计算

* 计算当前 Data 对象的 md5 值

    ```typescript
    md5(): string  
    ```

* 计算当前 Data 对象的 sha1 值

    ```typescript
    sha1(): string  
    ```

### 其它

* 使用 Uint8Array 创建 Data 对象

    ```typescript
    static initWithBytes(bytes: Uint8Array): Data  
    ```

* 使用 Data 对象创建 Data 对象（拷贝）

    ```typescript
    static initWithData(data: Data): Data  
    ```
    
* 检查两个 Data 对象中的数据是否一致

    ```typescript
    isEqualTo(data: Data): boolean  
    ```

* 获取 Data 对象内容长度

    ```typescript
    length(): number  
    ```

* 提取 Uint8Array

    ```typescript
    getBytes(): Uint8Array  
    ```

## FileManager

使用 FileManager 管理闪存中的文件，你可以对沙箱、SDCard中的文件进行写入、读取以及删除操作。

### 仓库

你必须先选择一个仓库，用于存储文件，不同的仓库有不同的用途。

* document 仓库用于保存用户生成文件，不得保存缓存文件和临时文件。

    ```typescript
    static document: FileManager  
    ```

* cache 仓库用于保存缓存文件。

    ```typescript
    static cache: FileManager  
    ```

* tmp 仓库用于保存临时文件。

    ```typescript
    static tmp: FileManager  
    ```

* sdcard 仓库用于操作 SD 数据卡文件，仅限 Android 系统使用，Android 6.0+ 系统上首次操作会报失败（请求用户给予权限）。

    ```typescript
    static sdcard: FileManager  
    ```

### 读写文件

* 写入数据 - 返回 ```true``` 代表写入成功

    ```typescript
    writeData(data: Data, path: string): boolean  
    ```

* 读取数据

    ```typescript
    readData(path: string): Data | undefined  
    ```

### 其它

* 遍历文件夹 - 返回路径数组

    ```typescript
    list(path: string): string[]  
    ```

* 检查文件是否存在

    ```typescript
    isFileExist(path: string): boolean  
    ```

* 删除文件

    ```typescript
    deleteFile(path: string): boolean  
    ```

## Notification

* Notification 是 NotificationCenter 中用于交换信息的实体类。

    ```typescript
    class Notification {
        /**
        * 事件名称 
        */
        readonly name: string 
        /**
        * postNotification 中附带的第一个参数 
        */
        readonly object: any 
        /**
        * postNotification 中附带的第二个参数 
        */
        readonly userInfo: { [key: string]: any } 
    }
    ```

## NotificationCenter

* 要使用 NotificationCenter，请使用单例。

    ```typescript
    static default: NotificationCenter  
    ```

* 添加观察者 - 返回一个 Handler ID

    ```typescript
    addObserver(name: string, triggerBlock: (notification: Notification) => void): string  
    ```

* 移除观察者 - 使用返回的 Handler ID 移除观察者 

    ```typescript
    removeObserver(handler: string): void  
    ```

* 发送通知

    ```typescript
    postNotification(name: string, object: any, userInfo: { [key: string]: any }): void  
    ```

## URLCachePolicy

* 在 URLRequest 类初始化时使用，定义缓存的使用场景。

    ```typescript
    enum URLCachePolily {
        /**
         * 根据 HTTP Reponse Header 决定缓存的使用。 
         */
        UseProtocolCachePolicy = 0, 
        /**
         * 忽略本地缓存，强制刷新。 
         */
        ReloadIgnoringLocalCacheData = 1, 
        /**
         * 如果存在本地缓存，则使用本地缓存，否则请求网络。 
         */
        ReturnCacheDataElseLoad = 2, 
        /**
         * 如果存在本地缓存，则使用本地缓存，否则返回错误，相当于离线模式。 
         */
        ReturnCacheDataDontLoad = 3, 
    }
    ```

## URLRequest

使用 URLRequest 创建一个网络请求，你可以指定该请求的 Method，头部信息，正文信息等。

* 创建一个请求

    ```typescript
    constructor(url: string, timeout?: number, cachePolicy?: URLCachePolily)  
    ```

* 设置请求方法 - 默认值为 GET

    ```typescript
    setHTTPMethod(value: "GET" | "POST" | "PUT" | "DELETE"): void  
    ```

* 设置请求头部信息

    ```typescript
    setHTTPHeader(value: string, key: string): void  
    ```

* 设置请求正文信息（一般是 POST 请求才需要设置）

    ```typescript
    setHTTPBody(value: string | Data): void  
    ```

## URLResponse

* 当 ```URLSessionTask``` 任务完成后，会附带 ```URLResponse``` 信息。

    ```typescript
    class URLResponse {
        /**
         * 内容长度 
         */
        expectedContentLength: number 
        /**
         * 建议保存的文件名 
         */
        suggestedFilename?: string 
        /**
         * MIMEType 
         */
        mimeType?: string 
        /**
         * 文本编码 
         */
        textEncodingName?: string 
        /**
         * 原始请求 URL 
         */
        url?: string 
        /**
         * Response 头部信息 
         */
        allHeaderFields: { [key: string]: any } 
        /**
         * HTTP 状态码  
         */
        statusCode: number 
    }
    ```

## URLSession

使用 ```URLSession``` 发起一个网络请求任务，对于返回 ```URLSessionTask``` 任务实例，你需要手动调用 ```resume``` 方法，任务才会开始。

* 使用单例

    ```typescript
    static sharedSession: URLSession  
    ```

* 使用 URL 发起任务

    ```typescript
    dataTaskWithURL(url: string, completionHandler: (data?: Data, response?: URLResponse, error?: Error) => void): URLSessionTask  
    ```

* 使用 ```URLRequest``` 发起任务

    ```typescript
    dataTaskWithRequest(req: URLRequest, completionHandler: (data?: Data, response?: URLResponse, error?: Error) => void): URLSessionTask  
    ```

## URLSessionTask

```URLSessionTask``` 表示一个 HTTP 请求任务，你可以使用 ```resume()``` 开始一个任务，使用 ```cancel()``` 中止一个任务。

## UserDefaults

使用 ```UserDefaults``` 保存用户配置，这是一个简单的 Key-Value 数据库，切勿用于保存大量数据。

* 可使用单例

    ```typescript
    static standard: UserDefaults  
    ```

* 也可以指定仓库

    ```typescript
    constructor(suite: string | undefined)  
    ```

* 写入数据

    ```typescript
    set(object: any, forKey: string): void  
    ```

* 读取数据

    ```typescript
    get(forKey: string): any  
    ```

## WebSocket

使用 ```WebSocket``` 创建一个 WebSocket 连接请求。

* 使用 URL 创建实例

    ```typescript
    constructor(url: string)  
    ```

* 监听事件

    ```typescript
    onOpen?: () => void 
    onClose?: (code: number, reason: string) => void 
    onFail?: (error: Error) => void 
    onMessage?: (message: Data | string) => void 
    ```

* 发送数据

    ```typescript
    sendData(data: Data): void 
    sendString(string: string): void 
    ```

* 关闭连接

    ```typescript
    close(): void 
    ```