# FAQ

我们的目标是为开发者提供一致的运行环境，以便代码可以不经任何修改即可运行在不同的平台上。但是，在不同平台上，JavaScript 的差异是客观存在的，我们希望借此页面解答开发者的疑问。

## JavaScript 运行环境

### iOS

在 iOS 中，我们依赖 ```JavaScriptCore``` 系统框架，可以运行所有 ES6 代码（ 借助 TypeScript 编译至 ES5 ），但在 iOS 10.3 以下系统中会缺失部分 ES6 类（例如 Promise 库），你可以通过 shim 的方式补全这些类。

### Android

在 Android 中，我们使用 ```J2V8``` 第三方库运行 ```JavaScript```，其版本号为 4.5.0，该版本引擎可以支持所有 ES6 语法、库，无须 shim。

### Web

在 Web 中，JavaScript 的运行环境并不固定，但可以确定的一点是所有 ES6 代码（ 借助 TypeScript 编译至 ES5 ）都可以运行，ES6 类的缺失也可以通过 shim 的方式补全。

### shim

如果需要使用 shim 库，建议使用 [https://github.com/paulmillr/es6-shim](https://github.com/paulmillr/es6-shim)。

## 内存管理

一般情况下，你不用担心内存管理的问题，框架内部会负责这件事。

但是，下面的情况，你需要手动管理内存（我们正在努力解决这些问题），否则，对应的对象在 Native 端将被回收。

### 延时调用

如果一个对象，需要被延时调用，则需要手动 retain，在调用完成后，手动调用 release。 

```javascript
class HelloViewController extends UI.ViewController {

	viewDidLoad() {
		super.viewDidLoad()
		NS.URLSession.sharedSession.dataTaskWithURL("http://yourserver.com/", (data, response, error) => {
			data.retain()
			setTimeout(() => {
				console.log(data.utf8String())
				data.release()
			}, 3000)
		}).resume()
	}

}
```

* 如果忘记调用 ```release```，对象会在应用中止后释放。

### 继承 XT.BaseObject 

当你需要声明一个 ```class``` 的时候，我们建议你将其继承 ```XT.BaseObject```，它会自动管理对该类下的对象进行引用计数。

```typescript
class FooClass extends XT.BaseObject {
	// your code
}
```

### 使用 XT.BaseArray 替代 Array

强烈建议你使用 ```XT.BaseArray``` 替代普通数组，```XT.BaseArray``` API 与 Array 完全一致，BaseArray 会自动管理对数组元素进行引用计数。

```typescript
const fooArray = new XT.BaseArray([1, 2, 3])
fooArray.push(4)
fooArray.pop()
fooArray.clear()
```

## 屏幕旋转

我们可以使用 ```UI.ViewController``` 中的 ```supportOrientations``` 属性控制屏幕旋转方向，这个值默认是只允许竖屏。

但是，在 Web 平台中，这个属性无效，我们无法阻止宿主应用的旋转行为。

## 键盘遮挡

我们可以使用 ```UI.ViewController``` 中的 ```keyboardAvoidingMode``` 方法，控制虚拟键盘弹出时，应用的处理方式。

### KeyboardAvoidingMode.None

当返回 None 值时，应用不会调整 UI 元素，转而调用 ```UI.ViewController:keyboardWillShow``` ```UI.ViewController:keyboardWillHide``` 方法，你需要自行处理相关 UI 元素变化。

### KeyboardAvoidingMode.Pan

当返回 Pan 值时，应用会自行调用相关 UI 元素，优先保证 ```UI.TextField``` ```UI.TextView``` 不被遮挡。

### Web 平台

在 iOS 中，会始终使用 Pan 模式。在 Android 中，这个问题，无法解决，因此，建议在 Web 页面中，将 TextField 放置在最上方，以避免键盘遮挡问题。

## 卡顿

渲染耗时严重，JavaScript 线程太忙等因素都会导致卡顿。

### 渲染耗时严重

* 请尝试精简页面结构。
* 请勿将带有阴影的视图添加至 ```UI.ListCell``` 中，这会导致严重的渲染性能问题，一个替代的方法是，使用 ```UI.ImageView``` 并放置一张 PNG 阴影图。

### JavaScript 线程太忙

* 请勿在 JavaScript 主线程中执行过多计算操作。
* 可以通过创建 ```NS.Context``` 线程的方式进行密集计算，然后将结果发送回 JavaScript 主线程（暂未实现）。

## 图片资源

我们不建议开发者引入尺寸过大的图片资源，```require``` 方式所引用的图片资源，应始终保持最小尺寸（文件大小），我们会在编译时，使用 ```pngquant``` 再次压缩你的图片资源。

对于大尺寸文件，我们建议将其放在服务器上，动态加载。