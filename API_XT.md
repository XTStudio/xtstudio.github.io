# API 文档 - XT

> 所有 XT 类均以 ```XT.``` 前缀命名。

## minSDK

使用 minSDK 指定当前 TypeScript 文件要求的最低 SDK 版本，你可以在多个文件中指定不同版本号，编译时会以最小的版本号为准。

```typescript
XT.minSDK = "0.1.0" /* @available(0.1.0) */
```

## ClassType

```typescript
enum ClassType {
    Unknown, /* @available(0.1.0) */
    ObjC, /* @available(0.1.0) */
    Java, /* @available(0.1.0) */
    JavaScript, /* @available(0.1.0) */
} /* @available(0.1.0) */
```

## ClassLoader

### loadClass

使用 loadClass 方法加载一个扩展类，一般用于扩展开发。

```typescript
static loadClass(classType: ClassType, className: string | Object, globalName: string): void /* @available(0.1.0) */
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
