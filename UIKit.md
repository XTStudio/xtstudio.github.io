# UIKit

> XT UIKit 是以 iOS UIKit 为蓝本构建的，你可以通过学习相关的 iOS 教程获得更多知识。

UIKit 是 XT 的核心库，你所看到的图形界面均由 UIKit 构建。

UIKit 没有 DOM 结构，也不存在虚拟 DOM 结构，这是一套完全使用 TypeScript 语言进行描述的界面系统。

UIKit 是一套 API 的集合，你可以使用 UIKit 创建包括图像、按钮、画布、列表等组件，并且，这些组件是跨平台的、可复用的。

## 基础

```UI.View``` 是所有 View 的基类，它定义了所有 View 的基础行为，包括层级、样式、布局以及触摸。

### 层级

```UI.View``` 是一个容器类，它可以添加任意 ```UI.View``` 作为子视图，在 Android 中可以类比为 ```ViewGroup```，在 Web 中可以类比为 ```Div```。

#### 添加一个子视图

以下例子演示了，如何将一个黄色的 View 添加到红色的 View 中。

```javascript
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

```javascript
if (yellowView.superview) {
    yellowView.superview.frame = UI.RectMake(88, 88, 88, 88)
}
```

[试一试](http://xt-studio.com/XT-Playground-Web/#/samples/UIKit_0_1.ts)

#### 访问子视图

同样的，添加子视图后，父 View 可以使用 ```subviews``` 属性访问所有子视图，这将返回一个数组。

以下例子演示了，将红色 View 下的所有 View 颜色更改为蓝色。

```javascript
redView.subviews.forEach((it => {
    it.backgroundColor = UI.Color.blueColor
}))
```

[试一试](http://xt-studio.com/XT-Playground-Web/#/samples/UIKit_0_2.ts)

#### 移出视图

不同于一般的视图层级系统，你不能在父级视图中执行 ```removeChild``` 操作，而只能使用 ```removeFromSuperview``` 方法，将自身移出可见视图。

以下例子演示了，将黄色 View 移出视图。

```javascript
yellowView.removeFromSuperview()
```

[试一试](http://xt-studio.com/XT-Playground-Web/#/samples/UIKit_0_3.ts)

#### 视图层级

与所有视图层级系统一致，越早被添加的 View 层级越低。

以下例子演示了，将黄色与绿色 View 添加至红色 View 中，并且绿色的可视层级更高。

```javascript
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

```javascript
greenView.backgroundColor = UI.Color.greenColor
```

##### UI.Color

```UI.Color``` 是一个用于描述颜色的类，你可以直接使用 ```UI.Color``` 的预设颜色，如 ```UI.Color.redColor```，也可以通过 RGBA 数值初始化实例。

```javascript
const color = new UI.Color(0.17, 0.04, 0.10, 1.0) // (R, G, B, A)
```

#### 不透明度

所有的 View 不透明度默认为 1.0，即完全显示，不透明度的属性值是 ```alpha```，其值允许的范围是 [0.0, 1.0]。

```javascript
fooView.alpha = 0.5
```

#### 隐藏 View

所有的 View 默认都是不隐藏的，要隐藏一个 View，除了可以将不透明度设置为 0.0 外，还可以将 ```hidden``` 属性设置为 ```true```。

```javascript
fooView.hidden = true
```

#### 圆角

要为视图添加圆角，你需要设置 ```cornerRadius```，以下例子演示了设置一个 10 的圆角。

```javascript
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

```javascript
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

```javascript
const redView = new UI.View
redView.frame = UI.RectMake(44, 44, 88, 88)
redView.backgroundColor = UI.Color.redColor
redView.borderWidth = 4
redView.borderColor = UI.Color.blackColor
```

#### 阴影 

设置 ```shadowColor``` ```shadowOpacity``` ```shadowOffset``` ```shadowRadius``` 四个属性，可以为视图添加阴影（目前 Android 暂不支持阴影）。

这四个属性分别代表，阴影颜色、阴影不透明度、阴影方向、阴影扩散度。

```javascript
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

```javascript
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

```javascript
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

```javascript
new UI.TransformMatrix().postRotate(45 * Math.PI / 180)
```

###### 缩放

以下例子表示横向放大至 1.5 倍，纵向放大至 2.5 倍。

```javascript
new UI.TransformMatrix().postScale(1.5, 2.5)
```

###### 位移

以下例子表示横向（向右）位移 20 个点，纵向（向下）位移 20 个点。

```javascript
new UI.TransformMatrix().postTranslate(20.0, 20.0)
```
