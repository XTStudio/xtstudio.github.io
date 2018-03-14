# API 文档 - XT

> 所有 XT 类均以 ```XT.``` 前缀命名。

## minSDK

使用 minSDK 指定当前 TypeScript 文件要求的最低 SDK 版本，你可以在多个文件中指定不同版本号，编译时会以最小的版本号为准。

```typescript
XT.minSDK = "0.1.0"
```

## currentSDK

使用 currentSDK 获取当前 SDK 版本。

```typescript
const currentSDK: string
```

## platform

使用 platform 获取当前平台。

```typescript
const platform: "iOS" | "Android" | "Web"
```

## ClassType

```typescript
enum ClassType {
    Unknown,
    ObjC,
    Java,
    JavaScript,
}
```

## ClassLoader

### loadClass

使用 loadClass 方法加载一个扩展类，一般用于扩展开发。

```typescript
static loadClass(classType: ClassType, className: string | Object, globalName: string): void
```

以下例子，演示了分别加载 ObjC / Java / Web 的扩展类。

```typescript 
XT.ClassLoader.loadClass(XT.ClassType.ObjC, "FooClass", "Foo");
XT.ClassLoader.loadClass(XT.ClassType.Java, "com.opensource.xtsample.FooClass", "Foo");
(function () {
    var FooClass = {
        sayHello: () => { return "Hello, World!" }
    }
    XT.ClassLoader.loadClass(XT.ClassType.JavaScript, FooClass, "Foo")
})();
```

## ExtObject

使用 ExtObject 扩展一个原生类，用于逻辑类扩展。

### className

使用 className 确定原生类的名称

```typescript
static className: string
```

### defineFunction

使用 ```defineFunction``` 方法，定义一个原生实例方法。

```typescript
defineFunction(prop: string): any
```

### defineProperty

使用 ```defineProperty``` 方法，定义一个原生成员变量。

```typescript
defineProperty(prop: string, defaultValue?: any): any
```