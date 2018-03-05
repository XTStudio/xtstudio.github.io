# XT Studio

## 简介

> XT Studio（ 简称 XT ） 是一个应用开发框架。

XT 致力于使开发者能使用 TypeScript 语言，基于同一套代码构建 iOS / Android 以及 Web 应用。

在集成 XT 运行时后，你可以使用 XT 所提供的 API 开发移动、PC应用。

XT 与其它框架十分类似，却更具特色，如果希望了解 XT 与它们的区别，请查看[对比其它框架](/Compare)。

## 运行时

### iOS

* 在界面上，XT 是使用 UIKit/CoreGraphics 进行渲染的，也就是原生界面。
* 在 JavaScript 上，XT 使用 JavaScriptCore 库，兼容 iOS 8.0+ 机器，支持所有 ES6 语法（部分库需要 Polyfill）。

### Android

* 在界面上，XT 是使用 android.view.* 包进行渲染的，也就是原生界面。
* 在 JavaScript 上，XT 使用 J2V8 库，也就是 V8 引擎，该 V8 引擎支持所有 ES6 语法（不需要任何 Polyfill）。

### Web

* 在界面上，XT 基于 SVG 进行渲染。
* 在 JavaScript 上，XT 依赖浏览器、WebView 的运行环境。

## 起步

> 我们假定你已经了解关于 TypeScript / JavaScript 的中级知识。如果你是一个 TypeScript 新手，我们建议你先学习好基础知识再来看这篇指南。

> 如果你是一个 iOS 开发者，那么，你会在 XT 学习过程中，感觉良好。

> 如果你是一个 Android 开发者，在 XT 的学习过程中，可以得到不少启发。

> 如果你是一个 Web 开发者，可能需要一些思维上的转换，才能学懂 XT。

尝试 XT 最简单的方法是使用 [Playground](http://xt-studio.com/XT-Playground-Web/)。你可以在浏览器新标签页中打开它，跟着例子学习一些基础用法。

在 Playground 编辑器中输入一些代码，点击 『Run』，接着，一个 iPhone / Android 模拟器便会呈现在你面前，你所输入的代码会在一个 iframe 中运行。

想要在移动设备上预览真实的渲染结果，你需要进入[Tools -> Playground](/Playground)，使用 Xcode 或 Android Studio 将对应的 Playground 构建在手机中。

## 启动应用

```typescript
class HelloViewController extends UI.ViewController {

	fooLabel = new UI.Label()

	viewDidLoad() {
		super.viewDidLoad()
		this.fooLabel.text = "Hello, World!"
		this.fooLabel.textAlignment = UI.TextAlignment.Center
		this.view.addSubview(this.fooLabel)
	}

	viewWillLayoutSubviews() {
		super.viewWillLayoutSubviews()
		this.fooLabel.frame = this.view.bounds
	}

}

class AppDelegate extends UI.ApplicationDelegate {

	applicationDidFinishLaunchingWithOptions() {
		this.window = new UI.Window()
		this.window.rootViewController = new HelloViewController()
		this.window.makeKeyAndVisible()
	}

}

const application = new UI.Application(undefined, new AppDelegate())
```

如果你是一名 iOS 开发者，应该很熟悉上面的代码，因为 XT API 的设计就是以 iOS API 作为模板的。如果不是，也不用担心，我们将一步一步地进行讲解。

### UI.Application

```UI.Application``` 用于启动一个应用，一般情况下，你不需要修改、继承它，直接复制、粘贴即可。

### UI.ApplicationDelegate

```UI.ApplicationDelegate``` 是整个应用的核心。

当前， ```ApplicationDelegate``` 只有一个方法 ```applicationDidFinishLaunchingWithOptions```，这个方法会在应用启动后，被** 立刻 **调用，并且只会被调用一次。

你可以在 ```ApplicationDelegate``` 中进行全局初始化操作，上述例子中，我们对 ```ApplicationDelegate::window``` 进行初始赋值。

### UI.View

在例子中，并没有```UI.View```关键字，但实际上，```UI.View```贯穿于整个 UIKit，是 UIKit 的基础组件。

你可以将```UI.View```理解为视图容器，它是有位置的，有大小的，可渲染背景、边框、阴影的，可承载子容器的类，在 XT 中，所有可视界面均继承于 ```UI.View```。

在 Web 中，你可以将其理解为 ```HTMLDivElement```，在 Android 中，你可以将其理解为 ```FrameLayout```。

### UI.Window

```UI.Window``` 是整个应用中，位于最底层的 View，实际上，```UI.Window``` 只是一个抽象类，只负责管理 ```RootViewController``` 和一些全局的界面操作。

在例子中，我们将一个全新的 ```UI.Window``` 实例赋值到 ```ApplicationDelegate``` 实例中。

紧接着，一个 ```UI.ViewController``` 实例被设置为 ```rootViewController```。

最为关键的一步 ```makeKeyAndVisible()``` 是必须调用的，如果不调用此方法，界面将不会呈现给最终用户。

### UI.ViewController

```UI.ViewController``` 管理一个可视界面，可以简单地理解为『场景管理器』。

一个场景中只存在一个最底层的 View，这个 View 会在 ```loadView``` 方法中被初始化（我们暂时不会接触到这个方法）。

我们可以添加任意的 subview 到这个 view 中，我们正是基于这种方式，构建所有的界面。

### UI.Label

```UI.Label``` 用于渲染文本，关于 UI.Label 的具体用法，可以参照 [UIKit](/UIKit) 文档。

## 从 View 开始

行胜于言，让我们现在就添加一个 View 到视图中。

我们定义这个 View 是红色的，并且位于屏幕左上角，其大小为 44 * 44 （在 XT 中，所有大小单位都是 Point）。

```typescript
class HelloViewController extends UI.ViewController {

	viewDidLoad() {
		super.viewDidLoad()
		const redView = new UI.View
        redView.frame = UI.RectMake(0, 0, 44, 44)
		redView.backgroundColor = UI.Color.redColor
		this.view.addSubview(redView)
	}

}
```

现在，就在 Playground 中[运行](http://xt-studio.com/XT-Playground-Web/#/samples/RedView.ts)这段代码，一个红色的方块将出现在屏幕左上角。

## 布局

### frame

或许你已经留意到了，上一段代码中，我们设置了 ```redView.frame = UI.RectMake(0, 0, 44, 44)```，你可以理解为这个 View 位于左上角 x = 0, y = 0 这个位置上，它的 width = 44，height = 44。

```frame``` 是```UI.View```的成员变量，它描述这个 View 所在的位置和大小。

### viewWillLayoutSubviews

```viewWillLayoutSubviews``` 是 ```UI.ViewController``` 的成员方法，每次 ```UI.ViewController::view``` 布局变化时，都会被触发，你可以在这个方法中改变子 View 的 frame，达到响应式布局的目的。使用以下代码，修改 ```redView.frame```，使其与屏幕等宽，```this.view.bounds```反映的是底层 View 的可视区域大小。

```typescript
class HelloViewController extends UI.ViewController {

    redView = new UI.View

	viewDidLoad() {
		super.viewDidLoad()
        this.redView.frame = UI.RectMake(0, 0, 44, 44)
		this.redView.backgroundColor = UI.Color.redColor
		this.view.addSubview(this.redView)
    }

	viewWillLayoutSubviews() {
		super.viewWillLayoutSubviews()
		this.redView.frame = UI.RectMake(0, 0, this.view.bounds.width, 44)
	}

}
```

现在，就在 Playground 中[运行](http://xt-studio.com/XT-Playground-Web/#/samples/RedViewEqualsWidth.ts)这段代码。

** 再次说明，在 XT 中，没有像素、em 等单位存在，所有单位都是 Pt。 **

### layoutSubviews

一个事实是，如果完全在 ```viewWillLayoutSubviews``` 中进行所有层级的 ```frame``` 修改，会让代码混乱不堪。必要时，你应该创建 ```UI.View``` 子类。

```layoutSubviews``` 是 ```UI.View``` 的成员方法，它会在本级 View 布局变化时被触发。

在以下例子中，我们在红色 View 中添加一个左间距为 20，右间距为 20 的黄色 View。

```typescript
class RedView extends UI.View {

	yellowView = new UI.View

	constructor() {
		super()
		this.backgroundColor = UI.Color.redColor
		this.yellowView.backgroundColor = UI.Color.yellowColor
		this.addSubview(this.yellowView)
	}

	layoutSubviews() {
		super.layoutSubviews()
		this.yellowView.frame = UI.RectMake(20, 0, this.bounds.width - 40, this.bounds.height)
	}

}

class HelloViewController extends UI.ViewController {

    redView = new RedView

	viewDidLoad() {
		super.viewDidLoad()
		this.view.addSubview(this.redView)
    }

	viewWillLayoutSubviews() {
		super.viewWillLayoutSubviews()
		this.redView.frame = UI.RectMake(0, 0, this.view.bounds.width, 44)
	}

}
```

现在，就在 Playground 中[运行](http://xt-studio.com/XT-Playground-Web/#/samples/RedViewWithYellowView.ts)这段代码。

### AutoLayout

另外一种更高级的布局方式是 AutoLayout，关于 AutoLayout 的使用，请参阅文档。

## 样式

在 XT 中，要为一个 View 设置样式，实际上就是修改这个 View 的属性，在上述的例子中，你已经留意到我们设置背景色所使用的方法。

```typescript
redView.backgroundColor = UI.Color.redColor
```

同样的，我们可以为 ```UI.View``` 设置以下这些样式，这些样式的定义请参阅文档。

```typescript
clipsToBounds: boolean;
backgroundColor: Color;
alpha: number;
opaque: boolean;
hidden: boolean;
tintColor: Color
cornerRadius: number;
borderWidth: number;
borderColor: Color;
shadowColor: Color;
shadowOpacity: number;
shadowOffset: Size;
shadowRadius: number;
```

## 触摸

在 XT 中，所有的 ```UI.View``` 以及它的子类，都是可触摸的，当 ```userInteractionEnabled``` 属性为 ```true``` 时，View 可以响应触摸。

### 响应单击事件

只需为 ```view.onTap``` 赋值，即可响应单击事件，在以下例子中，单击红色 View 后，红色 View 将变为黄色。

```typescript
class HelloViewController extends UI.ViewController {

	viewDidLoad() {
		super.viewDidLoad()
		const redView = new UI.View
		redView.backgroundColor = UI.Color.redColor
        redView.frame = UI.RectMake(0, 0, 44, 44)
		redView.onTap = () => {
			redView.backgroundColor = UI.Color.yellowColor
		}
		this.view.addSubview(redView)
	}

}
```

现在，就在 Playground 中[运行](http://xt-studio.com/XT-Playground-Web/#/samples/OnTap.ts)这段代码。

同样的，为 ```view.onDoubleTap``` 赋值，可响应双击事件，如果单击事件和双击事件同时存在，那么，单击事件会等待双击事件失败后，才会响应。

### 响应长按事件

长按事件比单击事件略为复杂，一个长按事件分为三个阶段，开始（Began）、移动（Changed）、结束（Ended），你必须显式地判断当前阶段，才能执行相关操作。

```typescript
class HelloViewController extends UI.ViewController {

	viewDidLoad() {
		super.viewDidLoad()
		const redView = new UI.View
		redView.backgroundColor = UI.Color.redColor
        redView.frame = UI.RectMake(120, 120, 66, 66)
		redView.onLongPress = (state) => {
			if (state == UI.InteractionState.Began) {
				redView.backgroundColor = UI.Color.yellowColor
			}
            else if (state == UI.InteractionState.Changed) {
                redView.backgroundColor = UI.Color.greenColor
            }
            else if (state == UI.InteractionState.Ended) {
				redView.backgroundColor = UI.Color.redColor
            }
        }
		this.view.addSubview(redView)
	}

}
```

现在，就在 Playground 中[运行](http://xt-studio.com/XT-Playground-Web/#/samples/OnLongPress.ts)这段代码。

### 响应拖动事件

拖动事件与长按事件一致，也是分为三个阶段识别，同时，还包括四个附加回调参数，具体请参阅文档。

```typescript
class HelloViewController extends UI.ViewController {

	viewDidLoad() {
		super.viewDidLoad()
		const redView = new UI.View
		redView.backgroundColor = UI.Color.redColor
        redView.frame = UI.RectMake(120, 120, 66, 66)
		redView.onPan = (state, viewLocation, absLocation, velocity, translation) => {
			if (state == UI.InteractionState.Began) {
				redView.backgroundColor = UI.Color.yellowColor
			}
            else if (state == UI.InteractionState.Changed) {
                if (translation) {
                    redView.transform = new UI.TransformMatrix(1.0, 0.0, 0.0, 1.0, translation.x, translation.y)
                }
            }
            else if (state == UI.InteractionState.Ended) {
				redView.backgroundColor = UI.Color.redColor
                redView.transform = new UI.TransformMatrix(1.0, 0.0, 0.0, 1.0, 0.0, 0.0)
            }
        }
		this.view.addSubview(redView)
	}

}
```

现在，就在 Playground 中[运行](http://xt-studio.com/XT-Playground-Web/#/samples/OnPan.ts)这段代码。

## 动画

在 XT 中，所有的 View 都可以执行动画，以下的属性是可以响应动画的。

* frame
* center
* transform
* backgroundColor
* alpha
* cornerRadius
* borderWidth
* borderColor
* shadowColor
* shadowOpacity
* shadowOffset
* shadowRadius

动画分为两种，线性动画以及弹性动画，使用以下方式唤起界面动画。

### 线性动画

调用 ```UI.View.animationWithDuration``` 方法，第一个参数是动画时长，第二个参数是动画执行 Block，只需要在其中声明动画属性终点即可，第三个参数是动画结束 Block，它会在动画播放结束后被调用。

```typescript
class HelloViewController extends UI.ViewController {

	viewDidLoad() {
		super.viewDidLoad()
		const redView = new UI.View
		redView.backgroundColor = UI.Color.redColor
        redView.frame = UI.RectMake(0, 0, 44, 44)
		redView.onTap = () => {
			UI.View.animationWithDuration(0.3, () => {
				redView.frame = UI.RectMake(100, 100, 88, 88)
				redView.alpha = 0.5
				redView.backgroundColor = UI.Color.purpleColor
			}, () => {
				console.log("Done")
			})
		}
		this.view.addSubview(redView)
	}

}
```

现在，就在 Playground 中[运行](http://xt-studio.com/XT-Playground-Web/#/samples/DurationAnimation.ts)这段代码。

### 弹性动画

弹性动画调用方式与线性动画一致，唯一不同点在于传参，第一个参数是弹性系数，第二个参数是起始速度。

```typescript
class HelloViewController extends UI.ViewController {

	viewDidLoad() {
		super.viewDidLoad()
		const redView = new UI.View
		redView.backgroundColor = UI.Color.redColor
        redView.frame = UI.RectMake(0, 0, 44, 44)
		redView.onTap = () => {
			UI.View.animationWithBouncinessAndSpeed(10.0, 24.0, () => {
				redView.frame = UI.RectMake(100, 100, 88, 88)
				redView.alpha = 0.5
				redView.backgroundColor = UI.Color.purpleColor
			}, () => {
				console.log("Done")
			})
		}
		this.view.addSubview(redView)
	}

}
```

现在，就在 Playground 中[运行](http://xt-studio.com/XT-Playground-Web/#/samples/SpringAnimation.ts)这段代码。

## NavigationController

### 推入与弹出

现在，你学会了单个场景的布局、样式设置、触摸响应以及动画设置。

那么，一个真正的应用，就是由单个页面构成的吗？显然不是，一个真正的应用肯定是由一连串的场景所构成的，下面，我们就来学习路由。

首先，我们回到最开始的例子，将 ```UI.Window``` 中的 rootViewController 替换成 ```UI.NavigationController```。

并且，我们的目标是要在点击红色 View 的时候，推入一个新的场景。在点击新场景的灰色 View 时，弹出这个场景。

```typescript
class HelloViewController extends UI.ViewController {

	viewDidLoad() {
		super.viewDidLoad()
		const redView = new UI.View
		redView.backgroundColor = UI.Color.redColor
        redView.frame = UI.RectMake(0, 0, 44, 44)
		redView.onTap = () => {
			if (this.navigationController) {
				this.navigationController.pushViewController(new SecondViewController())
			}
		}
		this.view.addSubview(redView)
	}

}

class SecondViewController extends UI.ViewController {

	viewDidLoad() {
		super.viewDidLoad()
		const yellowView = new UI.View
		yellowView.backgroundColor = UI.Color.grayColor
        yellowView.frame = UI.RectMake(0, 0, 44, 44)
		yellowView.onTap = () => {
			if (this.navigationController) {
				this.navigationController.popViewController()
			}
		}
		this.view.addSubview(yellowView)
	}

}

class AppDelegate extends UI.ApplicationDelegate {

	applicationDidFinishLaunchingWithOptions() {
		this.window = new UI.Window()
		this.window.rootViewController = new UI.NavigationController(new HelloViewController())
		this.window.makeKeyAndVisible()
	}

}

const application = new UI.Application(undefined, new AppDelegate())
```

现在，就在 Playground 中[运行](http://xt-studio.com/XT-Playground-Web/#/samples/NavigationController.ts)这段代码。

### 显示导航栏

只是推入与弹出，还不够，一个正常的页面，还应该在顶部有一个导航栏。

在 ```UI.ViewController``` 中调用 ```showNavigationBar``` 显示导航栏。设置 ```UI.ViewController::title```，可以设置导航栏标题。使用 ```this.navigationBar.xxx``` 可以配置导航栏样式（导航栏也是一个普通的 ```UI.View```）。

```typescript
class HelloViewController extends UI.ViewController {

	viewDidLoad() {
		super.viewDidLoad()
		this.title = "Hello"
		this.navigationBar.backgroundColor = new UI.Color(0xe2 / 0xff, 0xe2 / 0xff, 0xe2 / 0xff)
		this.showNavigationBar()
		//...
	}

}
```

现在，就在 Playground 中[运行](http://xt-studio.com/XT-Playground-Web/#/samples/NavigationControllerWithBar.ts)这段代码。

## Explorer

你已经完成了初级的教程，如果你觉得上面的例子太简单，不妨看看 XT Explorer（代码经过编译，不可编辑，源码[点此](https://github.com/XTStudio/XT/tree/master/src/Sample)查看）。

在 Playground 中[运行](http://xt-studio.com/XT-Playground-Web/#/samples/Sample.ts) XT Explorer。

## 继续下一步

接下来，你将学习到更多知识。

* 你将使用 [VSCode](/VSCode) 替代 Playground 进行开发、调试以及发布。
* 你将学习 [UIKit](/UIKit) 各个组件的使用，用以构建完整的用户界面。
* 你将学习 [Foundation](/Foundation) 框架的使用，用以实现网络、存储、二进制处理等功能。
* XT 在某些方面可能与现有技术存在不一致的地方，你可以参阅 [FAQ](/FAQ)。