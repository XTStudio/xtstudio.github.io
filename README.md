# XT Studio

## 简介

> XT Studio（ 简称 XT ） 是一个应用开发框架。

XT 致力于使开发者能使用 TypeScript 语言，基于同一套代码构建 iOS / Android 以及 Web 应用。

在集成 XT-Runtime 后，你可以使用 XT 所提供的 API 开发移动、PC应用。

XT 与其它框架十分类似，却更具特色，如果希望了解 XT 与它们的区别，请查看[对比其它框架]()。

## 起步

> 我们假定你已经了解关于 TypeScript / JavaScript 的中级知识。如果你是一个 TypeScript 新手，我们建议你先学习好基础知识再来看这篇指南。

> 如果你是一个 iOS 开发者，那么，你会在 XT 学习过程中，感觉良好。

> 如果你是一个 Android 开发者，在 XT 的学习过程中，可以得到不少启发。

> 如果你是一个 Web 开发者，可能需要一些思维上的转换，才能学懂 XT。

尝试 XT 最简单的方法是使用 [Playground](http://xt-studio.com/XT-Playground-Web/)。你可以在浏览器新标签页中打开它，跟着例子学习一些基础用法。

在 Playground 编辑器中输入一些代码，点击 『Run』，接着，一个 iPhone / Android 模拟器便会呈现在你面前，你所输入的代码会在一个 iframe 中运行。

想要移动设备上预览真实的渲染结果，你需要进入[Tools -> Playground](/Playground)，使用 Xcode 或 Android Studio 将对应的 Playground 构建在手机中。

## 启动应用

```javascript
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
		this.window.rootViewController = new UI.NavigationController(new HelloViewController())
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

一行胜千言，让我们现在就添加一个 View 到视图中。

我们定义这个 View 是红色的，并且位于屏幕左上角，其大小为 44 * 44 （在 XT 中，所有大小单位都是 Point）。

```javascript
class HelloViewController extends UI.ViewController {

	viewDidLoad() {
		super.viewDidLoad()
		const redView = new UI.View
        redView.frame = UI.RectMake(0, 0, 44, 44)
		this.view.addSubview(redView)
	}

}
```

现在，就在 Playground 中[运行](http://xt-studio.com/XT-Playground-Web/#/samples/RedView.ts)这段代码，一个红色的方块出现在屏幕左上角。

## 布局