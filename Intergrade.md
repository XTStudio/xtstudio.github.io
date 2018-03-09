# 集成运行时

当 XT 应用开发完成时，你将会得到一个 ```app.min.js``` 文件，那怎样才能将工作成果集成到现有的应用中呢？

## 集成方式

首先，你需要知道的一件事是，XT 支持三种集成方式。

* 应用模式
* 模块模式
* 视图模式

### 应用模式

在这种模式下，XT 应用就是整个应用，可以简单地理解为，XT 接管了整个应用。

### 模块模式

在这种模式下，XT 应用实质上是一个 ```ViewController``` / ```Activity```，当启动一个 XT 应用时，实质上就是打开了一个新的 ```ViewController``` / ```Activity```。

### 视图模式

在这种模式下，XT 应用实质上是一个 ```View```，也就是说，你可以将 XT 运行在一个小小的 ```View``` 中。

## 集成方法

### iOS

在 iOS 上集成运行时的最佳方式是 CocoaPods，如果你还不懂如何使用 CocoaPods 请自行 Google 之。

1. 集成前，先使用 ```pod setup``` 将 repos 升级至最新。
2. 在 ```Podfile``` 中添加依赖 ```pod 'XT'```。
3. 执行 ```pod install```。

#### 添加 app.min.js

你可以将 ```app.min.js```（文件名可以自行修改）上传至服务器，也可以将其放置在 Bundle 中。

#### 以应用模式集成

要以应用模式集成，请在 ```AppDelegate.m``` 中参照以下代码集成。

```objectivec
#import <XT/XTFoundationContext.h>
#import <XT/XTUIContext.h>

@interface AppDelegate ()

@property (nonatomic, strong) XTUIContext *context;

@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    self.window.rootViewController = [UIViewController new];
    NSURL *sourceURL = [[NSBundle mainBundle] URLForResource:@"app.min.js" withExtension:nil];
    self.context = [[XTUIContext alloc] initWithSourceURL:sourceURL
                                                  options:nil
                                          completionBlock:^(UIViewController * _Nullable rootViewController) {
                                              self.window.rootViewController = rootViewController;
                                              [self.window makeKeyAndVisible];
                                          } failureBlock:nil];
    return YES;
}

@end
```

#### 以模块模式集成

当以模块模式集成时，实际上就是通过初始化 ```XTUIContext```，得到一个 ```rootViewController```，然后执行 ```push``` 或 ```present``` 操作。

```objectivec
NSURL *sourceURL = [[NSBundle mainBundle] URLForResource:@"app.min.js" withExtension:nil];
self.context = [[XTUIContext alloc] initWithSourceURL:sourceURL
                                            options:nil
                                    completionBlock:^(UIViewController * _Nullable rootViewController) {
                                        [self.navigationController pushViewController:rootViewController animated:YES];
                                    } failureBlock:nil];
```

#### 以视图模式集成

当以视图模式集成时，实际上也是通过初始化 ```XTUIContext```，得到一个 ```rootViewController```，接着将这个 ```UIViewController``` 以 ```childViewController``` 的形式添加到当前 ```UIViewController``` 中，并将 ```rootViewController.view``` 添加至目标视图。

```objectivec
NSURL *sourceURL = [[NSBundle mainBundle] URLForResource:@"app.min.js" withExtension:nil];
self.context = [[XTUIContext alloc] initWithSourceURL:sourceURL
                                            options:nil
                                    completionBlock:^(UIViewController * _Nullable rootViewController) {
                                        [self addChildViewController:rootViewController];
                                        [self.view addSubview:rootViewController.view];
                                        rootViewController.view.frame = CGRectMake(0,
                                                                                    self.view.bounds.size.height - 180,
                                                                                    self.view.bounds.size.width,
                                                                                    180);
                                    } failureBlock:nil];
```

#### XTUIContext 

不管以何种形式集成 XT，你应始终保持 ```XTUIContext``` 实例引用，一旦 ```XTUIContext``` 引用丢失，XT 应用会停止运行。

### Android

在 Android 上集成运行时的最佳方式是 Gradle，XT 托管在 Jitpack.io 上，你需要按照以下步骤添加依赖。

* 以下演示代码均为 Kotlin，如需使用 Java 调用方法也类似。

1. 在顶级 build.gradle 中添加仓库
    ```
    allprojects {
		repositories {
			...
			maven { url 'https://jitpack.io' }
		}
	}
    ```

2. 在应用 build.gradle 中添加依赖
    ```
    dependencies {
        compile 'com.github.XTStudio.XT:core:0.1.2'
        compile 'com.github.XTStudio.XT:foundation:0.1.2'
        compile 'com.github.XTStudio.XT:uikit:0.1.2'
	}
    ```

3. Sync 同步

#### 添加 app.min.js

你可以将 ```app.min.js```（文件名可以自行修改）上传至服务器，也可以将其放置在工程目录 assets 文件夹中。

#### 以应用模式集成

```kotlin
class MainActivity : XTUIActivity() {

    var currentContext: XTUIContext? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        this.currentContext = XTUIContext.createWithAssets(this, "app.min.js", null, {
            it.attach(this)
        })
    }

}
```

#### 以模块模式集成

```kotlin
this.currentContext = XTUIContext.createWithAssets(this, "app.min.js", null, {
    it.start()
})
```

#### 以视图模式集成

要以视图模式集成，你需要在原有视图上先创建一个 Fragment，将以下代码中的 ```fragment_id``` 替换为你创建的 Fragment ID。

```kotlin
this.currentContext = XTUIContext.createWithAssets(this, "app.min.js", null, {
    it.attach(this, fragment_id)
})
```

#### XTUIContext

在 XT 应用运行时，请始终保引 ```XTUIContext``` 实例引用，正确的方式是，在初始化 ```XTUIContext``` 后，将其引用指向当前 ```Activity```。

然后 override ```onDestory``` 方法。

```kotlin
override fun onDestroy() {
    super.onDestroy()
    currentUIContext?.release()
}
```

### Web

#### 自动加载

首先，你需要将 ```app.min.js``` 放置在适当的位置，然后，参照以下 HTML 代码加载应用。 

```html
<html>

<head>
    <meta name="viewport" content="width=device-width, user-scalable=no" />
</head>

<style>
    body {
        margin: 0;
        overflow-y: hidden;
        -webkit-transform: translate3d(0, 0, 0);
        -moz-transform: translate3d(0, 0, 0);
        -ms-transform: translate3d(0, 0, 0);
        -o-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
</style>

<body class="UIContext" src="./app.min.js" options='{"foo": "value"}'></body>

<script src="https://cdn.jsdelivr.net/npm/xt-studio@0.1.0/index.min.js"></script>

</html>
``` 

#### 手动加载

你也可以使用手动加载的方式，初始化 ```UI.Context``` 并附着到视图。

```javascript
XTFrameworkLoader.loadUrl('./app.min.js', function (sourceURL) {
    UI.Context.startWithURL(sourceURL, { foo: "value" }, function (_, context) {
        context.attachTo(document.body)
    })
})
```

任何的 Div / Body 元素都可以成为目标加载视图。
