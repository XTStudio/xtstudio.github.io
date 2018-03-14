# 扩展

XT 提供扩展机制，开发者可根据自己的业务进行定制，XT 提供以下两类扩展：

* XT.ExtObject - 用于扩展逻辑
* UI.ExtView - 用于扩展 UI 界面

## XT.ExtObject

使用 ```XT.ExtObject``` 类扩展应用逻辑，以实现更多功能。下面，我们将通过一个 ```FooClass``` 类扩展，为各位演示如何进行逻辑扩展。

### 桥接类

在编写原生逻辑前，我们需要先在 ```TypeScript``` 端编写一个桥接类，使其继承 ```XT.ExtObject```。

我们在 ```FooClass``` 类中定义了一个 ```fooValue``` 成员变量。

```typescript
class FooClass extends XT.ExtObject {

    static className = "FooClass"

    fooValue: string = this.defineProperty("fooValue", "Hello, World!")

}
```

### iOS

现在，我们可以在 Xcode 工程中编写 ```FooClass``` 实现。

```objectivec
#import <XT/XTExtObject.h>

@interface FooClass : XTExtObjectImplementation

@property (nonatomic, strong) NSString *fooValue;

@end

@implementation FooClass

- (void)setFooValue:(NSString *)fooValue {
    _fooValue = fooValue;
    NSLog(@"%@", fooValue);
}

@end

```

这是一个简单的实现，我们创建了一个名为 ```FooClass``` 的 OC 类。

你已经可以使用打开应用发起调用了，还记得我们创建的桥接类吗？

```typescript
const fooObject = new FooClass()
fooObject.fooValue = "Testing..."
```

运行这个应用，如无意外，你将在 Xcode 控制台中看到 Testing... 的打印结果。

#### 存取成员变量

你可以重写 ```onGetValue:``` ```onSetValue:value:``` 方法，更灵活地存取成员变量。

```objectivec
- (id)onGetValue:(NSString *)propKey {
    if ([propKey isEqualToString:@"fooValue"]) {
        return self.fooValue;
    }
    return nil;
}

- (void)onSetValue:(NSString *)propKey value:(id)value {
    if ([propKey isEqualToString:@"fooValue"] && [value isKindOfClass:[NSString class]]) {
        self.fooValue = value;
    }
}
```

#### JS 调用原生方法

要在 JavaScript 向原生对象发起同步请求，我们需要修改一下桥接类，添加一个 ```callMe``` 成员变量，并使用 ```defineFunction``` 将其定义为方法。

```typescript
class FooClass extends XT.ExtObject {
    //...
    callMe: (who: string) => string = this.defineFunction("callMe")
}
```

然后在原生代码中重写 ```onCallMethod:args:``` 方法，当 JS 发起调用时，该原生方法将被执行。

```typescript
const fooObject = new FooClass()
fooObject.callMe("Pony")
```

#### 原生调用 JS 方法

你可以在任何时候，调用 ```invokeMethod:args:``` 方法，此时 JS 方法将被执行。

```objectivec
[self invokeMethod:@"handleNativeCall" args:@[]];
```

### Android

在 Android 上实现任何 ```ExtObject``` 应始终将其 ```package``` 声明为 ```com.opensource.ext.implementations```。

现在，我们使用 Kotlin 创建一个 ```FooClass``` 类，并使其继承 ```XTExtObject.Implementation``` 类。

```kotlin
package com.opensource.ext.implementations

import com.opensource.xt.core.XTExtObject

class FooClass: XTExtObject.Implementation() {

    var fooValue: String = ""
        set(value) {
            field = value
            System.out.println(value)
        }

}
```

你已经可以使用打开应用发起调用了，还记得我们创建的桥接类吗？

```typescript
const fooObject = new FooClass()
fooObject.fooValue = "Testing..."
```

运行这个应用，如无意外，你将在 Xcode 控制台中看到 Testing... 的打印结果。

#### 存取成员变量

你可以重写 ```onGetValue``` ```onSetValue``` 方法，更灵活地存取成员变量。

```kotlin
override fun onSetValue(prop: String, value: Any): Any? {
    if (prop == "fooValue" && value is String) {
        this.fooValue = value
    }
    return true
}

override fun onGetValue(prop: String): Any? {
    if (prop == "fooValue") {
        return this.fooValue
    }
    return null
}
```

#### JS 调用原生方法

要在 JavaScript 向原生对象发起同步请求，我们需要修改一下桥接类，添加一个 ```callMe``` 成员变量，并使用 ```defineFunction``` 将其定义为方法。

```typescript
class FooClass extends XT.ExtObject {
    //...
    callMe: (who: string) => string = this.defineFunction("callMe")
}
```

然后在原生代码中重写添加相应方法，当 JS 发起调用时，该原生方法将被执行。

```kotlin
fun callMe(who: String) {    
    System.out.println(who)
}
```

#### 原生调用 JS 方法

你可以在任何时候，调用 ```invokeMethod``` 方法，此时 JS 方法将被执行。

```kotlin
invokeMethod("handleNativeCall", listOf())
```

### Web

要在 Web 中实现 ```FooClass```，只需将 ```FooClass``` 类赋予全局对象(window)即可。

```typescript
if (XT.platform === "Web") {

    window["FooClass"] = class FooClass {

        fooValue: string = ""

    }

}
```

#### 存取成员变量

如果使用 ```TypeScript``` 编写 ```FooClass```，可以通过 ```get``` ```set``` 前缀拦截值的存取，如果使用 ```JavaScript``` 编写，你需要使用 [Object.defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)。

#### JS 调用扩展方法

要在 JavaScript 向原生对象发起同步请求，我们需要修改一下桥接类，添加一个 ```callMe``` 成员变量，并使用 ```defineFunction``` 将其定义为方法。

```typescript
class FooClass extends XT.ExtObject {
    //...
    callMe: (who: string) => string = this.defineFunction("callMe")
}
```

然后在扩展代码中重写添加相应方法，当 JS 发起调用时，该扩展方法将被执行。

```typescript
if (XT.platform === "Web") {

    window["FooClass"] = class FooClass {

        fooValue: string = ""

        callMe(who: string) { console.log(who) }

    }

}
```

#### 扩展调用 JS 方法

你可以在任何时候，调用 ```invokeMethod``` 方法，此时 JS 方法将被执行。

```typescript
if (XT.platform === "Web") {

    window["FooClass"] = class FooClass {

        invokeMethod: any; // 定义一个属性，避免 TypeScript 错误提示。

        barMethod() {
            this.invokeMethod("handleNativeCall", [])
        }

    }
    
}
```

## XT.ExtView

使用 ```XT.ExtView``` 类扩展应用 UI 界面。下面，我们将通过一个 ```FooView``` 界面扩展，为各位演示如何进行 UI 扩展。

### 桥接类

在编写原生界面前，我们需要先在 ```TypeScript``` 端编写一个桥接类，使其继承 ```XT.ExtView```，并将其 className 设为 ```FooView```。

我们在 ```FooView``` 类中定义了一个 ```fooColor``` 成员变量，其值默认为 ```gray```。

```typescript
class FooView extends UI.ExtView {

    static className = "FooView"

    fooColor: string = this.defineProperty("fooColor", "gray")

}
```

### iOS

现在，我们可以开始编写原生界面实现了。

```objectivec
#import <UIKit/UIKit.h>
#import <XT/XTUIExtView.h>

@interface FooView : UIView<XTExtViewProtocol>

@property (nonatomic, weak) XTUIExtView *extView;
@property (nonatomic, strong) NSString *fooColor;

@end

@implementation FooView

- (void)setFooColor:(NSString *)fooColor {
    _fooColor = fooColor;
    if ([fooColor isEqualToString:@"gray"]) {
        self.backgroundColor = [UIColor grayColor];
    }
    else if ([fooColor isEqualToString:@"green"]) {
        self.backgroundColor = [UIColor greenColor];
    }
}

@end
```

* 我们创建了一个 ```FooView``` 类使其继承 ```UIView```，并使其遵循 ```XTExtViewProtocol``` 协议。
* 我们创建了一个 ```fooColor``` 成员变量，并通过重写 ```setter``` 的方式，监听值的变化，作出响应。

使用以下代码测试这个 View。

```typescript
const fooView = new FooView()
// 请自行将 fooView 添加到主视图中
fooView.fooColor = "green"
```

运行这个应用，如无意外，你将看到一个绿色背景的视图。

#### 存取成员变量

你可以重写 ```onGetValue:``` ```onSetValue:value:``` 方法，更灵活地存取成员变量。

```objectivec
- (id)onGetValue:(NSString *)propKey {
    if ([propKey isEqualToString:@"fooValue"]) {
        return self.fooValue;
    }
    return nil;
}

- (void)onSetValue:(NSString *)propKey value:(id)value {
    if ([propKey isEqualToString:@"fooValue"] && [value isKindOfClass:[NSString class]]) {
        self.fooValue = value;
    }
}
```

#### JS 调用原生方法

要在 JavaScript 向原生对象发起同步请求，我们需要修改一下桥接类，添加一个 ```callMe``` 成员变量，并使用 ```defineFunction``` 将其定义为方法。

```typescript
class FooView extends XT.ExtView {
    //...
    callMe: (who: string) => string = this.defineFunction("callMe")
}
```

然后在原生代码中重写 ```onCallMethod:args:``` 方法，当 JS 发起调用时，该原生方法将被执行。

```typescript
const fooView = new FooView()
fooView.callMe("Pony")
```

#### 原生调用 JS 方法

你可以在任何时候，调用 ```extView.invokeMethod:args:``` 方法，此时 JS 方法将被执行。

```objectivec
[self.extView invokeMethod:@"handleNativeCall" args:@[]]
```

### Android

在 Android 上实现任何 ```ExtView``` 应始终将其 ```package``` 声明为 ```com.opensource.ext.implementations```。

现在，我们使用 Kotlin 创建一个 ```FooView``` 类，并使其继承 ```View``` 类。

```kotlin
package com.opensource.ext.implementations

import android.content.Context
import android.graphics.Color
import android.util.AttributeSet
import android.view.View

class FooView @JvmOverloads constructor(
        context: Context, attrs: AttributeSet? = null, defStyleAttr: Int = 0
) : View(context, attrs, defStyleAttr) {

    var fooColor: String = ""
        set(value) {
            field = value
            when (value) {
                "gray" -> this.setBackgroundColor(Color.GRAY)
                "green" -> this.setBackgroundColor(Color.GREEN)
            }
        }

}
```

* 我们创建了一个 ```fooColor``` 成员变量，并通过重写 ```setter``` 的方式，监听值的变化，作出响应。

使用以下代码测试这个 View。

```typescript
const fooView = new FooView()
// 请自行将 fooView 添加到主视图中
fooView.fooColor = "green"
```

运行这个应用，如无意外，你将看到一个绿色背景的视图。

#### 存取成员变量

要自定义存取成员变量，你需要使 ```FooView``` 遵循 ```XTUIExtView.Implementation``` 协议。然后，你可以重写 ```onGetValue``` ```onSetValue``` 方法。

```kotlin
class FooView @JvmOverloads constructor(
        context: Context, attrs: AttributeSet? = null, defStyleAttr: Int = 0
) : View(context, attrs, defStyleAttr), XTUIExtView.Implementation {

    override var extView: XTUIExtView? = null

    override fun onGetValue(prop: String): Any? {
        // return something
        return null
    }

    override fun onSetValue(prop: String, value: Any): Any? {
        // do something
        return true
    }

    //...

}
```

#### JS 调用原生方法

要在 JavaScript 向原生对象发起同步请求，我们需要修改一下桥接类，添加一个 ```callMe``` 成员变量，并使用 ```defineFunction``` 将其定义为方法。

```typescript
class FooView extends XT.ExtView {
    //...
    callMe: (who: string) => string = this.defineFunction("callMe")
}
```

然后在原生代码中重写添加相应方法，当 JS 发起调用时，该原生方法将被执行。

```kotlin
fun callMe(who: String) {    
    System.out.println(who)
}
```

#### 原生调用 JS 方法

你可以在任何时候，调用 ```extView?.invokeMethod``` 方法，此时 JS 方法将被执行。

```kotlin
this.extView?.invokeMethod("handleNativeCall", listOf())
```

### Web

在 Web 中实现一个 ```ExtView```，你需要创建一个 ```FooView``` 类，并将其挂载到 window 对象中，同时，这个类应该有一个 ```element``` 的成员变量，提供一个 ```HTMLElement``` 类型的实例。

```typescript
if (XT.platform === "Web") {

    window["FooView"] = class FooView {

        element = document.createElement("div")

        public get fooColor(): string {
            return this.element.style.background || "";
        }

        public set fooColor(value: string) {
            this.element.style.background = value
        }

    };

}
```

* 我们使用 ```TypeScript``` ```set``` ```get``` 方法，使 ```fooColor``` 与 ```this.element.style.background``` 两者绑定。

使用以下代码测试这个 View。

```typescript
const fooView = new FooView()
// 请自行将 fooView 添加到主视图中
fooView.fooColor = "green"
```

运行这个应用，如无意外，你将看到一个绿色背景的视图。

#### JS 调用扩展方法

要在 JavaScript 向原生对象发起同步请求，我们需要修改一下桥接类，添加一个 ```callMe``` 成员变量，并使用 ```defineFunction``` 将其定义为方法。

```typescript
class FooView extends XT.ExtView {
    //...
    callMe: (who: string) => string = this.defineFunction("callMe")
}
```

然后在扩展代码中重写添加相应方法，当 JS 发起调用时，该扩展方法将被执行。

```typescript
if (XT.platform === "Web") {

    window["FooView"] = class FooView {

        callMe(who: string) { console.log(who) }

    }

}
```

#### 扩展调用 JS 方法

你可以在任何时候，调用 ```invokeMethod``` 方法，此时 JS 方法将被执行。

```typescript
if (XT.platform === "Web") {

    window["FooView"] = class FooView {

        invokeMethod: any; // 定义一个属性，避免 TypeScript 错误提示。

        barMethod() {
            this.invokeMethod("handleNativeCall", [])
        }

    }
    
}
```