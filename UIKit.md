# UIKit

> XT UIKit 是以 iOS UIKit 为蓝本编写的，你可以通过学习相关的 iOS 教程获得更多知识。

UIKit 是 XT 的核心库，你所看到的图形界面均由 UIKit 构建。

UIKit 没有 DOM 结构，也不存在虚拟 DOM 结构，这是一套完全使用 TypeScript 语言进行描述的界面系统。

UIKit 是一套 API 的集合，你可以使用 UIKit 创建包括图像、按钮、画布、列表等组件，并且，这些组件是跨平台的、可复用的。

## 基础

```UI.View``` 是所有 View 的基类，它定义了所有 View 的基础行为，包括层级、样式、布局以及触摸。

### 层级

```UI.View``` 是一个容器类，它可以添加任意 ```UI.View``` 作为子视图，在 Android 中可以类比为 ```ViewGroup```，在 Web 中可以类比为 ```Div```。

#### 添加一个子视图

以下例子演示了，如何将一个黄色的 View 添加到红色的 View 中。

```typescript
const redView = new UI.View
redView.frame = UI.RectMake(0, 0, 88, 88)
redView.backgroundColor = UI.Color.redColor
const yellowView = new UI.View
yellowView.frame = UI.RectMake(22, 22, 44, 44)
yellowView.backgroundColor = UI.Color.yellowColor
redView.addSubview(yellowView)
```

[试一试](http://xt-studio.com/XT-Playground-Web/#/samples/UIKit_0_0.ts)

#### 访问父级视图

一旦使用 ```addSubview``` 添加子视图后，子 View 即可使用 ```superview``` 属性访问父 View。

以下例子演示了，将黄色 View 的父 View (就是红色方块) 的移动到 (88, 88) 上。

```typescript
if (yellowView.superview) {
    yellowView.superview.frame = UI.RectMake(88, 88, 88, 88)
}
```

[试一试](http://xt-studio.com/XT-Playground-Web/#/samples/UIKit_0_1.ts)

#### 访问子视图

同样的，添加子视图后，父 View 可以使用 ```subviews``` 属性访问所有子视图，这将返回一个数组。

以下例子演示了，将红色 View 下的所有 View 颜色更改为蓝色。

```typescript
redView.subviews.forEach((it => {
    it.backgroundColor = UI.Color.blueColor
}))
```

[试一试](http://xt-studio.com/XT-Playground-Web/#/samples/UIKit_0_2.ts)

#### 移出视图

不同于一般的视图层级系统，你不能在父级视图中执行 ```removeChild``` 操作，而只能使用 ```removeFromSuperview``` 方法，将自身移出可见视图。

以下例子演示了，将黄色 View 移出视图。

```typescript
yellowView.removeFromSuperview()
```

[试一试](http://xt-studio.com/XT-Playground-Web/#/samples/UIKit_0_3.ts)

#### 视图层级

与所有视图层级系统一致，越早被添加的 View 层级越低。

以下例子演示了，将黄色与绿色 View 添加至红色 View 中，并且绿色的可视层级更高。

```typescript
const redView = new UI.View
redView.frame = UI.RectMake(44, 44, 88, 88)
redView.backgroundColor = UI.Color.redColor
const yellowView = new UI.View
yellowView.frame = UI.RectMake(22, 22, 44, 44)
yellowView.backgroundColor = UI.Color.yellowColor
redView.addSubview(yellowView)
const greenView = new UI.View
greenView.frame = UI.RectMake(11, 11, 33, 33)
greenView.backgroundColor = UI.Color.greenColor
redView.addSubview(greenView)
```

[试一试](http://xt-studio.com/XT-Playground-Web/#/samples/UIKit_0_4.ts)

##### 变换层级

有三个方法可以变换子视图的层级，它们的作用如字面所言。

* bringSubviewToFront
* sendSubviewToBack
* exchangeSubviewAtIndex

### 样式

```UI.View``` 使用属性访问的方式进行样式设置。

#### 背景色

如上述例子所示，要设置一个 View 的背景色，只需向 backgroundColor 属性赋予 ```UI.Color``` 实例即可。

```typescript
greenView.backgroundColor = UI.Color.greenColor
```

##### UI.Color

```UI.Color``` 是一个用于描述颜色的类，你可以直接使用 ```UI.Color``` 的预设颜色，如 ```UI.Color.redColor```，也可以通过 RGBA 数值初始化实例。

```typescript
const color = new UI.Color(0.17, 0.04, 0.10, 1.0) // (R, G, B, A)
```

#### 不透明度

所有的 View 不透明度默认为 1.0，即完全显示，不透明度的属性值是 ```alpha```，其值允许的范围是 [0.0, 1.0]。

```typescript
fooView.alpha = 0.5
```

#### 隐藏 View

所有的 View 默认都是不隐藏的，要隐藏一个 View，除了可以将不透明度设置为 0.0 外，还可以将 ```hidden``` 属性设置为 ```true```。

```typescript
fooView.hidden = true
```

#### 圆角

要为视图添加圆角，你需要设置 ```cornerRadius```，以下例子演示了设置一个 10 的圆角。

```typescript
const redView = new UI.View
redView.frame = UI.RectMake(44, 44, 88, 88)
redView.backgroundColor = UI.Color.redColor
redView.cornerRadius = 10
```

[试一试](http://xt-studio.com/XT-Playground-Web/#/samples/UIKit_1_0.ts)

圆角的最大值是 View 的 width, height 的一半，请尝试将上面例子的 ```cornerRadius``` 改为 44。

#### 裁剪

如果一个视图，它的内容（可能是图片、也可能是子视图）超出了它的大小，在默认的情况下，是不会被裁剪的。你需要将 ```clipsToBounds``` 属性设置为 ```true``` 才会触发裁剪机制。

以下例子演示了在一个圆角 View 中，裁剪超出其大小的子视图，请尝试把 ```clipsToBounds``` 设为 ```false```，看看有什么不同。

```typescript
const redView = new UI.View
redView.frame = UI.RectMake(44, 44, 88, 88)
redView.backgroundColor = UI.Color.redColor
redView.cornerRadius = 44
redView.clipsToBounds = true
const blurView = new UI.View
blurView.frame = UI.RectMake(44, 44, 44, 44)
blurView.backgroundColor = UI.Color.blueColor
redView.addSubview(blurView)
```

[试一试](http://xt-studio.com/XT-Playground-Web/#/samples/UIKit_1_1.ts)

#### 边框

设置 ```borderWidth``` 和 ```borderColor``` 可以为视图添加实心边框。

```typescript
const redView = new UI.View
redView.frame = UI.RectMake(44, 44, 88, 88)
redView.backgroundColor = UI.Color.redColor
redView.borderWidth = 4
redView.borderColor = UI.Color.blackColor
```

#### 阴影 

设置 ```shadowColor``` ```shadowOpacity``` ```shadowOffset``` ```shadowRadius``` 四个属性，可以为视图添加阴影（目前 Android 暂不支持阴影）。

这四个属性分别代表，阴影颜色、阴影不透明度、阴影方向、阴影扩散度。

```typescript
const view = new UI.View()
view.frame = UI.RectMake(44, 44, 44, 44)
view.cornerRadius = 22
view.backgroundColor = UI.Color.yellowColor
view.shadowColor = UI.Color.blackColor
view.shadowRadius = 8.0
view.shadowOpacity = 0.5
view.shadowOffset = UI.SizeMake(4.0, 4.0)
```

[试一试](http://xt-studio.com/XT-Playground-Web/#/samples/UIKit_1_2.ts)

#### 渲染色

```tintColor``` 意为渲染色，它将应用在 ```UI.Button``` ```UI.Switch``` ```UI.Slider``` 等组件中。 

```tintColor``` 是可传递的，当父 View 设置渲染色后，其子 View 会被递归设置 ```tintColor```，同时 ```tintColorDidChange``` 方法被执行。

### 布局

不同于其它框架，UIKit 的布局使用 frame 描述 View 的位置和大小，同时，UIKit 提供 AutoLayout 库用于响应式布局。

这意味着，你不能使用 Flex / 流式 / Linear / Relative 等方式进行布局，因此，Android 和 Web 初学者可能会感到略有困难。我们之所以抛弃这些布局方式，主要是从[性能角度]()考虑。

#### frame

在 UIKit 中，所有的 View 都基于 ```frame``` 进行布局，不管是使用 AutoLayout 或是其它方式，并且，在 UIKit 中，所有的数字单位都是点（不是像素、em、rem）。

你需要为 ```frame``` 赋予一个 ```UI.Rect``` 结构体，一般来说，使用 ```UI.RectMake(x, y, width, height)``` 方法得到。```frame``` 定义了一个 View 的 x, y 位置，它相对于父级 View 的左上角。同时，定义了 View 的大小，这个大小，与触摸以及渲染密切相关。

以下例子，表示 redView 在相对父 View 左上角的 (88, 88) 点上，大小为 (88, 88)。

```typescript
const redView = new UI.View
redView.frame = UI.RectMake(88, 88, 88, 88)
redView.backgroundColor = UI.Color.redColor
```

#### bounds

在 View 中，另一个与布局相关的属性是 ```bounds```，```bounds``` 与 ```frame``` 不一样的地方是，```bounds``` 其 ```{x, y}``` 值始终为 0，其 ```{width, height}``` 值与 ```frame``` 保持一致。

另外，```bounds``` 是只读的。

#### center

```center``` 属性表示这个 View 的中心点位置，这个位置相对于父 View 的左上角，你应该为其赋予一个 ```UI.Point``` 结构体，使用 ```UI.PointMake(x, y)``` 方法得到。

#### transform

通过设置 ```transform``` 属性，你可以旋转、缩放、拉伸 View，你需要为其赋予 ```TransformMatrix``` 对象。

以下例子，演示如何将红色 View 旋转 45 度。

```typescript
const redView = new UI.View
redView.frame = UI.RectMake(88, 88, 88, 88)
redView.backgroundColor = UI.Color.redColor
redView.transform = new UI.TransformMatrix().postRotate(45 * Math.PI / 180)
```

[试一试](http://xt-studio.com/XT-Playground-Web/#/samples/UIKit_2_0.ts)

##### TransformMatrix

```TransformMatrix``` 是一个包含 a, b, c, d, tx, ty 六个属性的对象，它们的含义请参照[这篇文章](http://www.zhangxinxu.com/wordpress/2012/06/css3-transform-matrix-矩阵/)。

就一般使用而言，我们不需要知道里面每个参数所代表的含义，```TransformMatrix``` 已经提供了几个预设的方法，用于旋转、缩放、位移。

* postRotate (旋转)
* postScale （缩放）
* postTranslate (位移)
* postConcat （合并矩阵）

以上方法，均以中心点为锚点，支持链式调用。

###### 旋转

要旋转一定角度，需要使用以下代码获取 ```TransformMatrix``` 对象，正值代表顺时针，负值代表逆时针。

以下例子为顺时针旋转 45 度。

```typescript
new UI.TransformMatrix().postRotate(45 * Math.PI / 180)
```

###### 缩放

以下例子表示横向放大至 1.5 倍，纵向放大至 2.5 倍。

```typescript
new UI.TransformMatrix().postScale(1.5, 2.5)
```

###### 位移

以下例子表示横向（向右）位移 20 个点，纵向（向下）位移 20 个点。

```typescript
new UI.TransformMatrix().postTranslate(20.0, 20.0)
```

### AutoLayout

AutoLayout 是一种全新的布局语言，它不同于任何 Web Android 以及传统 iOS 布局语言。在 XT 中，我们只支持使用纯代码的形式，使用 AutoLayout。

#### VisualFormat

VisualFormat 是 AutoLayout 的核心语言，借助 VisualFormat，你可以轻松地完成整个界面的布局描述。

我们将在下面的例子中，一步一步地学习使用 VisualFormat 布局界面。

#### Hello, World!

这是一个最简单的例子 ```H:|-0-[fooView]-0-|```，其中，```H``` 代表这是一个横向的布局描述，```|``` 代表父级视图，```[fooView]``` 代表需要执行布局的这个视图，fooView 是这个视图的名称，完整地的意思是，在横向上，fooView 的宽度等于父视图的宽度。

同样的，```V:|-0-[fooView]-0-|``` 代表在纵向上，fooView 的高度等于父视图的高度。

我们使用以下例子，演示如何将黄色 View 铺满整个屏幕。

```typescript
class HelloViewController extends UI.ViewController {

	yellowView = new UI.View()

	viewDidLoad() {
		super.viewDidLoad()
		this.yellowView.backgroundColor = UI.Color.yellowColor
		this.view.addSubview(this.yellowView)
		this.view.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"H:|-0-[yellowView]-0-|", {yellowView: this.yellowView}
		))
		this.view.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"V:|-0-[yellowView]-0-|", {yellowView: this.yellowView}
		))
		this.view.layoutIfNeeded()
	}

}
```

* ```addConstraints``` 是在父视图上执行的。
* ```addConstraints``` 方法，必须在 addSubview 后再执行。
* 最后，调用 ```layoutIfNeeded``` 方法，更新布局。

[试一试](http://xt-studio.com/XT-Playground-Web/#/samples/UIKit_3_0.ts)

#### 两个平行视图的布局

如果某 View 下，同时存在两个子 View，要如何布局它们呢？

使用类似这样的 VisualFormat ```H:|-0-[grayView(100)]-0-[yellowView]-0-|```

它的意思是，在横向方向上，grayView 位于左侧，占据 100 的宽度，剩余宽度由 yellowView 占据。

完整的例子如下，灰色 View 在左侧，宽度为 100，灰色和黄色 View 与父视图等高。我们使用 this 替代第二个参数，你可以仔细摸索原因。

```typescript
class HelloViewController extends UI.ViewController {

	grayView = new UI.View()
	yellowView = new UI.View()

	viewDidLoad() {
		super.viewDidLoad()
		this.grayView.backgroundColor = UI.Color.grayColor
		this.yellowView.backgroundColor = UI.Color.yellowColor
		this.view.addSubview(this.grayView)
		this.view.addSubview(this.yellowView)
		this.view.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"H:|-0-[grayView(100)]-0-[yellowView]-0-|", this
		))
		this.view.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"V:|-0-[yellowView,grayView]-0-|", this
		))
		this.view.layoutIfNeeded()
	}

}
```

[试一试](http://xt-studio.com/XT-Playground-Web/#/samples/UIKit_3_1.ts)

#### 使用百分比

你可以简单地将数字替换成百分比，比如 ```H:|-0-[grayView(50%)]-0-[yellowView(50%)]-0-|```，这样，灰色与黄色 View 将各占一半宽度。

#### 绝对居中

```"C:yellowView.centerX(_)"```，代表 yellowView 横向居中， ```C``` 开头的描述符表示这是一个居中描述，```(_)``` 表示居中于父视图。

```typescript
class HelloViewController extends UI.ViewController {

	yellowView = new UI.View()

	viewDidLoad() {
		super.viewDidLoad()
		this.yellowView.backgroundColor = UI.Color.yellowColor
		this.view.addSubview(this.yellowView)
		this.view.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"H:[yellowView(50%)]", this
		))
		this.view.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"C:yellowView.centerX(_)", this
		))
		this.view.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"V:|-0-[yellowView]-0-|", this
		))
		this.view.layoutIfNeeded()
	}

}
```

[试一试](http://xt-studio.com/XT-Playground-Web/#/samples/UIKit_3_2.ts)

#### 相对居中

可以把上面例子中的 ```(_)``` 替换为具体的 View，可使两个 View 相对居中。

下面例子演示了黄色与灰色 View 在水平方向上，相对居中。

```typescript
class HelloViewController extends UI.ViewController {

	yellowView = new UI.View()
	grayView = new UI.View()

	viewDidLoad() {
		super.viewDidLoad()
		this.yellowView.backgroundColor = UI.Color.yellowColor
		this.grayView.backgroundColor = UI.Color.grayColor
		this.view.addSubview(this.yellowView)
		this.view.addSubview(this.grayView)
		this.view.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"H:[yellowView(50%),grayView(100)]", this
		))
		this.view.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"V:|-100-[yellowView(44)]-44-[grayView(22)]", this
		))
		this.view.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"C:yellowView.centerX(_)", this
		))
		this.view.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"C:grayView.centerX(yellowView)", this
		))
		this.view.layoutIfNeeded()
	}

}
```

[试一试](http://xt-studio.com/XT-Playground-Web/#/samples/UIKit_3_3.ts)

#### 对齐

使用 ```C:grayView.left(yellowView.left)``` 可以使灰色与黄色 View 左侧对齐。

同样的，可以换成 ```right``` ```top``` ```bottom``` ```centerX``` ```centerY``` ```width``` ```height``` 这些属性。

#### 比例

在 VisualFormat 中可以在括号中使用比例，下面例子演示了，黄色 View 的高度始终是其宽度的 1.5 倍。

```typescript
class HelloViewController extends UI.ViewController {

	yellowView = new UI.View()

	viewDidLoad() {
		super.viewDidLoad()
		this.yellowView.backgroundColor = UI.Color.yellowColor
		this.view.addSubview(this.yellowView)
		this.view.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"H:|-15-[yellowView(50%)]", this
		))
		this.view.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"V:|-100-[yellowView(yellowView.width*1.5)]", this
		))
		this.view.layoutIfNeeded()
	}

}
```

[试一试](http://xt-studio.com/XT-Playground-Web/#/samples/UIKit_3_4.ts)

### 触摸

关于触摸，我们已经在初级教程中[提及](/?id=触摸)。这里，我们希望告诉你更多的细节。

#### hitTest

在 UIKit 中，会有一个根节点，这个根节点一般是 ```UI.Window```，当你的手指在屏幕上操作时，根节点会收到回调。

当 ```touchStart``` 时，UIKit 会从根节点开始往下递归地查找目标元素，元素应该符合以下条件，才能成功响应对象。

1. ```userInteractionEnabled == true```
2. ```alpha > 0```
3. ```hidden == false```

这个过程会在 ```UI.View``` 的 ```hitTest``` 方法中进行，但目前你暂不能通过重写这个方法修改它的行为。

#### GestureReconizer

在 ```UI.View``` 背后，响应触摸的是```GestureReconizer```，我们已经封装好了 ```TapGestureReconizer``` / ```LongPressGestureReconizer``` / ```PanGestureReconizer``` 三个识别器，但我们并没有对开发者直接开发这些类的访问。你只需要直接使用 ```UI.View``` 中在的 onTap / onDoubleTap / onLongPress / onPan 即可。

#### 手势冲突

当 View 中同时存在 onTap 和 onDoubleTap 回调时，onTap 的调用会延时执行。这是因为存在手势冲突，我们需要等待双击事件失败后，才能触发单击事件。

## 组件

UIKit 为开发者封装了各种常用的组件，借助组件，你不需要从零开始构建一个应用，所有的组件都继承 ```UI.View```。

### 按钮 Button

一个按钮，它的内容可以是一行文本，或者是一个图片，也可以是两者混合（垂直或水平排列）。

按钮是可触摸的视图，```UI.Button``` 会根据手指的状态，给予不同的回调。

```typescript
onTouchDown: () => void           // 手指按下时回调
onTouchDragInside: () => void     // 手指拖动时回调（仍然在按钮范围内）
onTouchDragOutside: () => void    // 手指拖动时回调（不在按钮范围内）
onTouchDragEnter: () => void      // 手指进入按钮范围时回调
onTouchDragExit: () => void       // 手指超出按钮范围时回调
onTouchUpInside: () => void       // 手指抬起时回调（在按钮范围内）
onTouchUpOutside: () => void      // 手指抬起时回调（在按钮范围外）
onTouchCancel: () => void         // 触摸被取消时回调（可能被另外一个 View 夺走了控制权）
onHighlighted: (highlighted: boolean) => void // 按钮高亮变化时回调
onHover: () => void               // 鼠标经过时回调（仅 PC 浏览器有效）
```

#### 文本按钮

以下例子演示了一个文本按钮的使用

```typescript
class HelloViewController extends UI.ViewController {

	fooButton = new UI.Button

	viewDidLoad() {
		super.viewDidLoad()
		// ...
		this.fooButton.title = "Foo"
		this.fooButton.onTouchUpInside = () => {
			this.fooButton.title = "Bar"
		}
		//...
	}

}
```

[试一试](http://xt-studio.com/XT-Playground-Web/#/samples/UIKit_4_0.ts)

#### 图像按钮

以下例子演示了一个图像按钮的使用（这里使用网络图片作演示，使用本地图片的方法请参照 ImageView 一节）

```typescript
class HelloViewController extends UI.ViewController {

	fooButton = new UI.Button

	viewDidLoad() {
		super.viewDidLoad()
		// ...
		UI.Image.fromURL("https://cdn.jsdelivr.net/npm/xt-studio@0.0.2/src/Sample/assets/voice%403x.png", (image) => {
			this.fooButton.image = image.imageWithImageRenderingMode(UI.ImageRenderingMode.Template)
		})
		this.fooButton.onTouchUpInside = () => {
			new UI.Alert("You touch me.").show()
		}
		//...
	}

}
```

* 请尝试把 ```.imageWithImageRenderingMode(UI.ImageRenderingMode.Template)``` 去掉，看看会发生什么？

[试一试](http://xt-studio.com/XT-Playground-Web/#/samples/UIKit_4_1.ts)

#### 图文混排

你可以同时设置 ```image``` 和 ```text``` 属性，即可实现图文混排。

修改 ```vertical``` 可以设置排版方式为垂直，修改 ```inset``` 数值可以设置图文间距。

### 文本框 Label

使用 ```UI.Label``` 可以显示单行或多行文本，文本将垂直居中显示。

#### 单行文本

以下例子演示了，如何显示单行文本，并设置其字体、颜色。

```typescript
class HelloViewController extends UI.ViewController {

	fooLabel = new UI.Label

	viewDidLoad() {
		super.viewDidLoad()
		this.fooLabel.font = UI.Font.boldSystemFontOfSize(17)
		this.fooLabel.textColor = UI.Color.purpleColor
		this.fooLabel.text = "Hello, World!"
		this.fooLabel.numberOfLines = 1
		// ...
	}

}
```

* font 属性接受一个 ```UI.Font``` 实例，具体请参阅文档。
* 在例子中，文本是居中显示的，因为我们给予了它一个 centerX centerY 的布局约束。

[试一试](http://xt-studio.com/XT-Playground-Web/#/samples/UIKit_5_0.ts)

#### 多行文本

当文本框拥有固定宽度，并且 numberOfLines > 1 时（0表示无限行），文本会自动换行，以下例子演示，如何显示多行文本。

```typescript
class HelloViewController extends UI.ViewController {

	fooLabel = new UI.Label

	viewDidLoad() {
		super.viewDidLoad()
		this.fooLabel.font = UI.Font.systemFontOfSize(16)
		this.fooLabel.textColor = UI.Color.blackColor
		this.fooLabel.text = `欢聚时代成立于2005年4月，国内首家富集通讯业务运营商，致力于打造最酷的网络直播公司，为全球用户提供团队语音服务，是当前国内领先的互联网语音视频平台提供商之一。欢聚时代怀揣着年轻的激情，运用创新的技术，缔造覆盖全球的富集通讯服务。`
		this.fooLabel.numberOfLines = 0
		// ...
	}

}
```

* 在例子中，文本框宽度限制为父级视图的一半。

[试一试](http://xt-studio.com/XT-Playground-Web/#/samples/UIKit_5_1.ts)

### 图片框 ImageView

使用 ```UI.ImageView``` 显示本地、网络图片，要显示图片，你必须获得一个 ```UI.Image``` 实例。

#### 本地图片

要加载本地图片，你需要使用 VSCode 开发应用，配置 VSCode 环境，请参阅[使用 VSCode 开发](/VSCode)。

以下例子演示了，如何加载一张本地图片（由于浏览器限制，Playground 无法在线预览本例子）。

在下面的例子中，你可以把 ```require('./success@2x.png')``` 当作 ```UI.Image``` 实例使用。

```typescript
const view = new UI.ImageView()
view.frame = UI.RectMake(0, 66, 78, 78)
view.image = require('./success@2x.png')
```

* 你需要把 ```success@2x.png``` 放置在合适的目录，require 图片路径相对于当前 ts 文件。
* 你需要显式指定文件路径，不能使用任何变量，如 ```require(fooString + "xxx.png")```。
* 如果是本地图片，在添加约束时，无须显式指定 ```UI.ImageView``` 的宽高（当然，你指定了，也没什么坏处）。

#### 网络图片

以下例子演示了，如何加载一张网络图片。

```typescript
const fooImageView = new UI.ImageView()
fooImageView.frame = UI.RectMake(44, 44, 100, 100)
UI.Image.fromURL("http://www.httpbin.org/image/png", (image) => {
    fooImageView.image = image
})
```

* 你必须显式声明 ```UI.ImageView``` 的宽高。
* 如果网络图片带有 @2x 后缀，则返回的 ```UI.Image``` 对象 scale 则为 2，以此类推。

[试一试](http://xt-studio.com/XT-Playground-Web/#/samples/UIKit_6_0.ts)

### 滚动视图 ScrollView

当屏幕内容超出一屏的时候，用户需要滚动视图，才能查看下方或者右方的内容，我们把这种视图，称为 ```ScrollView```。

```UI.ScrollView``` 也是一个 ```UI.View```，不同的是，在它之上，封装了一个 Pan 的手势识别器，用于响应拖动事件。

那么，如何表达我们在 ScrollView 里面的内容呢？又是如何告知 ScrollView，我们的内容宽高呢？

在下面的例子，黄色与红色两个 View，它们的宽高都是 300 * 300，它们所在的位置分别是 (0,0), (0, 600)，可见，红色 View 已经超出屏幕了。

#### 添加子视图到 ScrollView 中

```typescript
const yellowView = new UI.View
yellowView.frame = UI.RectMake(0, 0, 300, 300)
yellowView.backgroundColor = UI.Color.yellowColor
this.scrollView.addSubview(yellowView)
const redView = new UI.View
redView.frame = UI.RectMake(0, 600, 300, 300)
redView.backgroundColor = UI.Color.redColor
this.scrollView.addSubview(redView)
```

#### 设置 contentSize

通过上面的 View 信息，我们可以得知，最大高度是 900，我们不需要横向滑动，可以忽略内容宽度。使用以下方法设置 ScrollView 的内容大小。

```typescript
this.scrollView.contentSize = UI.SizeMake(0, 900)
```

一个简单的 ScrollView 已经完成了，现在[试一试](http://xt-studio.com/XT-Playground-Web/#/samples/UIKit_7_0.ts)效果吧。

设置 ScrollView 的属性，还可以实现分页滚动、横向滚动、隐藏滚动条等功能，具体请参阅文档。

### 列表视图 ListView

```UI.ListView``` 是提供垂直列表功能的组件，继承于 ```UI.ScrollView```，功能上等同于 ```UITableView(iOS)``` ```ListView(Android)```。

ListView 具有良好的内存管理机制，在 ```UI.ListView``` 管理下的 ```UI.ListCell``` 会被复用，当一个 Cell 滚出屏幕可见范围时，它会被重复利用，即使存在十万个 Cell，也不存在严重的性能问题。

在下面的例子中，我们会展示如何在 ```UI.ListView``` 中呈现一个用户列表，接口数据来自 GitHub [http://xt-studio.com/GHUser/0.json](http://xt-studio.com/GHUser/0.json)。

#### 创建一个 ListCell 子类

创建一个 ```UI.ListCell``` 子类，命名为 ```UserCell```。在其中添加 ```UI.ImageView``` 和 ```UI.Label```，分别用于显示用户头像和昵称。

```typescript
class UserCell extends UI.ListCell {

	iconImageView = new UI.ImageView
	nicknameLabel = new UI.Label

	constructor() {
		super()
		this.iconImageView.cornerRadius = 4
		this.iconImageView.clipsToBounds = true
		this.iconImageView.backgroundColor = UI.Color.lightGrayColor
		this.addSubview(this.iconImageView)
		this.nicknameLabel.font = UI.Font.systemFontOfSize(15)
		this.nicknameLabel.text = "#nickname"
		this.addSubview(this.nicknameLabel)
		this.setupLayout()
	}

	setupLayout() {
		this.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"H:|-15-[iconImageView(44)]-8-[nicknameLabel]-15-|", this
		))
		this.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"V:[iconImageView(44)]", this
		))
		this.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"C:iconImageView.centerY(_)", this
		))
		this.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"V:[nicknameLabel(44)]", this
		))
		this.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"C:nicknameLabel.centerY(_)", this
		))
		this.layoutIfNeeded()
	}

}
```

#### 创建 ListView 并注册 ListCell

在 ```ViewController``` 中创建一个 ```UI.ListView``` 实例，将刚刚创建的 ```UserCell``` 注册到 ```this.listView```，并添加至 ```view``` 中。

```typescript
this.listView.register(UserCell, "Cell", this)
this.view.addSubview(this.listView)
this.view.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
    "HV:|-0-[listView]-0-|", this
)) // Full Screen Layout
this.view.layoutIfNeeded()
```

#### 添加一些假数据

我们先添加一些假数据，让大家看到 Cell 展示的样子。

* reuseIdentifier 是上一步我们注册 UserCell 所指定的复用标识。
* rowHeight 是一个函数，返回该行的高度。

```typescript
loadData() {
    this.listView.items = [
        {
            reuseIdentifier: "Cell",
            rowHeight: () => 70
        },
        {
            reuseIdentifier: "Cell",
            rowHeight: () => 70
        },
        {
            reuseIdentifier: "Cell",
            rowHeight: () => 70
        },
        {
            reuseIdentifier: "Cell",
            rowHeight: () => 70
        }
    ]
    this.listView.reloadData()
}
```

[试一试](http://xt-studio.com/XT-Playground-Web/#/samples/UIKit_8_0.ts)

#### 加载真实数据

在上面的例子中，我们已经可以看到由假数据渲染出来的结果了，现在，修改 loadData 方法，把真实的数据加载并渲染出来。

我们会用到 ```Foundation``` 框架中的 ```URLSession``` 模块，用于加载远端数据。

```typescript
loadData() {
	NS.URLSession.sharedSession.dataTaskWithURL("http://xt-studio.com/GHUser/0.json", (data) => {
		if (data) {
			try {
				const json: any[] = JSON.parse(data.utf8String())
				this.listView.items = json.map(it => {
					return {
						...it,
						reuseIdentifier: "Cell",
						rowHeight: () => 70,
					}
				})
				this.listView.reloadData()
			} catch (e) {}
		}
	}).resume()
}
```

我们在 GitHub 上取得的数据，结构如下，目前我们只需要 login 和 avatar_url 字段。

```json
{
	"login": "mojombo",
	"id": 1,
	"avatar_url": "https://avatars0.githubusercontent.com/u/1?v=4",
	"gravatar_id": "",
	"url": "https://api.github.com/users/mojombo",
	"html_url": "https://github.com/mojombo",
	"followers_url": "https://api.github.com/users/mojombo/followers",
	"following_url": "https://api.github.com/users/mojombo/following{/other_user}",
	"gists_url": "https://api.github.com/users/mojombo/gists{/gist_id}",
	"starred_url": "https://api.github.com/users/mojombo/starred{/owner}{/repo}",
	"subscriptions_url": "https://api.github.com/users/mojombo/subscriptions",
	"organizations_url": "https://api.github.com/users/mojombo/orgs",
	"repos_url": "https://api.github.com/users/mojombo/repos",
	"events_url": "https://api.github.com/users/mojombo/events{/privacy}",
	"received_events_url": "https://api.github.com/users/mojombo/received_events",
	"type": "User",
	"site_admin": false
},
```

在 ```UserCell``` 类中添加 ```didRender``` 方法，把数据填充到 ImageView 和 Label 中。

```typescript
didRender() {
	super.didRender()
	if (this.currentItem) {
		this.iconImageView.loadImage(this.currentItem.avatar_url)
		this.nicknameLabel.text = this.currentItem.login
	}
}
```

嗯，我们要做的事情已经完成了，点此[试一试](http://xt-studio.com/XT-Playground-Web/#/samples/UIKit_8_1.ts)效果吧。

#### 添加下拉刷新功能

当用户在列表头部下拉时，会触发下拉刷新，要为 ```ListView``` 添加下拉刷新功能，我们需要用到 ```UI.RefreshControl```。

```typescript
this.listView.refreshControl = new UI.RefreshControl()
this.listView.refreshControl.onRefresh = () => {
	setTimeout(() => {
		// 在这里获取数据，我们使用 setTimeout 模拟数据获取过程。
		if (this.listView.refreshControl) {
			// 获取数据完毕后，使用 endRefreshing 结束刷新状态。
			this.listView.refreshControl.endRefreshing()
		}
	}, 3000)
}
```

#### 添加加载更多功能

当用户滑动至 ```ListView``` 底部时，会触发加载更多功能，要为 ```ListView``` 添加加载更多功能，我们需要用到 ```UI.LoadMoreControl```。

```typescript
this.listView.loadMoreControl = new UI.LoadMoreControl()
this.listView.loadMoreControl.onLoad = () => {
	setTimeout(() => {
		// 在这里获取数据，我们使用 setTimeout 模拟数据获取过程。
		if (this.listView.loadMoreControl) {
			// 获取数据完毕后，使用 endLoading 结束加载状态。
			this.listView.loadMoreControl.endLoading()
		}
	}, 3000)
}
```

[点此查看](http://xt-studio.com/XT-Playground-Web/#/samples/UIKit_8_2.ts)完整的例子，这个例子展示了包括下拉刷新、加载更多功能。

### 单行输入框

```UI.TextField``` 提供单行文本输入功能。

#### 添加一个圆角输入框

默认的 ```UI.TextField``` 是没有样式的，也就是，空白一片，你需要为其提供一些 ```border``` 样式，以下例子，演示了如何添加一个圆角输入框到界面上。

```typescript
class HelloViewController extends UI.ViewController {

	fooTextField = new UI.TextField()

	viewDidLoad() {
		super.viewDidLoad()
		this.fooTextField.borderWidth = 1
		this.fooTextField.borderColor = UI.Color.grayColor
		this.fooTextField.cornerRadius = 18
		this.fooTextField.placeholder = "Here's Placeholder"
		this.fooTextField.textAlignment = UI.TextAlignment.Center
		this.view.addSubview(this.fooTextField)
		this.setupLayout()
	}

	setupLayout() {
		this.view.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"H:[fooTextField(200)]", this
		))
		this.view.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"V:[fooTextField(36)]", this
		))
		this.view.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"C:fooTextField.centerX(_).centerY(_)", this
		))
	}

}
```

[试一试](http://xt-studio.com/XT-Playground-Web/#/samples/UIKit_9_0.ts)

#### 添加清除按钮

你可以为 ```UI.TextField``` 添加一个清除按钮，这样，用户就可以快速地删除输入内容了。

```typescript
this.fooTextField.clearButtonMode = UI.TextFieldViewMode.WhileEditing
```

#### Return 按键类型

你可以自定义虚拟键盘 Return 按钮的类型，但是，这只在 iOS 和 Android 原生平台上有效。

```typescript
this.fooTextField.returnKeyType = UI.ReturnKeyType.Send
```

#### 键盘类型

你可以自定义虚拟键盘的类型，如果只需要数字键盘，则可以使用以下方式设置。

```typescript
this.fooTextField.keyboardType = UI.KeyboardType.NumbersAndPunctuation
```

#### 焦点

你可以主动地触发 ```UI.TextField```，使用 ```focus``` 和 ```blur``` 方法即可。

#### 事件

设置以下属性值，可以得到相关事件，具体事件说明请参阅文档。

```typescript
shouldBeginEditing?: () => Boolean
didBeginEditing?: () => void
shouldEndEditing?: () => Boolean
didEndEditing?: () => void
shouldChange?: (inRange: { location: number, length: number }, replacementString: string) => Boolean
shouldClear?: () => Boolean
shouldReturn?: () => Boolean
```

### 多行输入框

```UI.TextView``` 提供多行文本输入功能，使用方法与 ```UI.TextField``` 一致。

### 画布

```UI.CanvasView``` 是画布类，你可以在画布上执行各种绘图操作，画布的使用方法与 [Web Canvas](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API) 大同小异，具体 API 请参阅文档，我们只在此处粗略介绍其使用方法。

以下例子，演示了如何添加一个蓝色方块到画布中。

```typescript
class HelloViewController extends UI.ViewController {

	fooCanvasView = new UI.CanvasView()

	viewDidLoad() {
		super.viewDidLoad()
		this.fooCanvasView.frame = UI.RectMake(0, 0, 300, 300)
		this.fooCanvasView.backgroundColor = UI.Color.lightGrayColor
		this.draw()
		this.view.addSubview(this.fooCanvasView)
	}

	draw() {
		this.fooCanvasView.fillStyle = UI.Color.blueColor
		this.fooCanvasView.fillRect(44, 44, 88, 88)
	}

}
```

[试一试](http://xt-studio.com/XT-Playground-Web/#/samples/UIKit_10_0.ts)