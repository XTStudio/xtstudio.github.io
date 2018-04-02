# API 文档 - UIKit

> 所有 UIKit 类均以 ```UI.``` 前缀命名。

## Context

Context 是一个可交互应用的入口，你可以通过以下方法创建上下文，其中 ```options``` 参数将传递至 ```AppDelegate:applicationDidFinishLaunchingWithOptions``` 方法中。

* 使用 name 创建（如果 app.min.js 文件已打包到应用内）

    ```typescript
    static startWithNamed(name: string, options: any, completion: (rootViewController: ViewController) => void): Context
    ```

* 使用 url 创建

    ```typescript
    static startWithURL(url: string, options: any, completion: (rootViewController: ViewController) => void, failure: (error: Error) => void): Context
    ```

## ApplicationDelegate

ApplicationDelegate 是应用的回调类。

* 给予 window 属性赋值以便声明应用主窗口

    ```typescript
    window?: Window;
    ```

* 应用启动完成后，会回调 ```applicationDidFinishLaunchingWithOptions``` 方法，在这里处理窗口初始化工作。

    ```typescript
    applicationDidFinishLaunchingWithOptions(application: Application, launchOptions: Object): void
    ```

## Application

Application 是应用的根对象

* 初始化应用，第一个参数填 undefined 即可，第二个参数应该填入一个 ```ApplicationDelegate``` 对象。

    ```typescript
    constructor(t: any, delegate: ApplicationDelegate)
    ```

* 当应用初始化后，使用以下方法获取应用单例。

    ```typescript
    static sharedApplication(): Application
    ```

* 你可以直接获取到初始化时的 delegate 对象

    ```typescript
    readonly delegate: ApplicationDelegate
    ```

* 你可以获取到 keyWindow: [Window](#window)

    ```typescript
    readonly keyWindow?: Window
    ```

## View

```View``` 是所有视图的基类。

### 布局

* 使用 frame: [Rect](#rect) 设置视图位置和大小

    ```typescript
    frame: Rect = {x: 0, y: 0, width: 0, height: 0};
    ```

* 使用 bounds: [Rect](#rect) 获得视图大小

    ```typescript
    bounds: Rect = {x: 0, y: 0, width: 0, height: 0};
    ```

* 使用 center: [Point](#point) 指定视图的中心点

    ```typescript
    center: Point = {x: 0, y: 0};
    ```

* 使用 transform: [TransformMatrix](#transformmatrix) 指定视图的形变

    ```typescript
    center: TransformMatrix = {a: 1, b: 0, c: 0, d: 1, tx: 0, ty: 0};
    ```

* 当约束存在变化时，调用 ```setNeedsLayout()``` 可以在下一个循环中更新布局，调用 ```layoutIfNeeded()``` 可以立即更新布局。

* 当视图大小发生变化时 ```layoutSubviews()``` 方法会被调用，你可以通过重写这个方法，手动布局子视图。

### 约束

你可以使用以下 API 为视图添加、删除布局约束，约束变更后，要记得调用 ```setNeedsLayout()```。

* 获取所有约束

    ```typescript
    constraints: LayoutConstraint[] = []
    ```

* 添加约束

    ```typescript
    addConstraint(constraint: LayoutConstraint): void
    addConstraints(constraints: LayoutConstraint[]): void
    ```

* 移除约束

    ```typescript
    removeConstraint(constraint: LayoutConstraint): void
    removeAllConstraints(): void
    ```

* 相关文档 [LayoutConstraint](#layoutconstraint)

### 渲染

* 使用 clipsToBounds 属性控制视图裁剪行为

    ```typescript
    clipsToBounds: boolean = false
    ```

* 使用 backgroundColor: [Color](#color) 属性设置视图背景色

    ```typescript
    backgroundColor: Color = {r: 0, g: 0, b: 0, a: 0};
    ```

* 使用 alpha 属性指定视图不透明度

    ```typescript
    alpha: number = 1.0;
    ```

* 使用 hidden 属性隐藏视图

    ```typescript
    hidden: boolean = false;
    ```

* 使用 tintColor 属性指定视图主色，tintColor 是会向下传染的。

    ```typescript
    tintColor: Color = {r: 0.0, g: 122.0 / 255.0, b: 1.0, a: 1.0}
    ```

* ```tintColorDidChange``` 方法会在 ```tintColor``` 发生变化后触发

    ```typescript
    tintColorDidChange(): void
    ```

* 使用 cornerRadius 设置视图圆角度数

    ```typescript
    cornerRadius: number = 0;
    ```

* 使用 borderWidth 设置视图边框宽度

    ```typescript
    borderWidth: number = 0;
    ```

* 使用 borderColor: [Color](#color) 设置视图边框颜色

    ```typescript
    borderColor: Color = {r: 0, g: 0, b: 0, a: 0};
    ```

* 使用 shadowColor: [Color](#color) 设置视图阴影颜色

    ```typescript
    shadowColor: Color = {r: 0, g: 0, b: 0, a: 0};
    ```

* 使用 shadowOpacity 指定视图阴影不透明度

    ```typescript
    shadowOpacity: number = 0;
    ```

* 使用 shadowOffset: [Size](#size) 指定视图阴影延伸方向;

    ```typescript
    shadowOffset: Size = {width: 0, height: -3}; 
    ```

* 使用 shadowRadius 指定视图阴影扩散大小

    ```typescript
    shadowRadius: number = 3;
    ```

### 层级

* 使用 tag 属性可以为视图指定一个标记，使用 ```viewWithTag``` 方法向下递归地查找已标记的视图。

    ```typescript
    tag: number = 0;
    viewWithTag(tag: number): View | undefined;
    ```

* 使用 ```superview``` 属性和 ```subviews``` 属性获取父子视图。

    ```typescript
    superview?: View
    subviews: View[]
    ```

* 使用 ```window``` 属性获取当前附着的 ```UI.Window``` 对象。

    ```typescript
    window?: Window
    ```

* 使用以下方法添加或插入子视图

    ```typescript
    insertSubviewAtIndex(subview: View, atIndex: number): void
    addSubview(subview: View): void
    insertSubviewBelow(subview: View, siblingSubview: View): void
    insertSubviewAbove(subview: View, siblingSubview: View): void
    ```

* 使用以下方法将本视图从父视图中移除

    ```typescript
    removeFromSuperview(): void
    ```

* 使用以下方法改变子视图的层次

    ```typescript
    exchangeSubviewAtIndex(index1: number, index2: number): void
    bringSubviewToFront(subview: View): void
    sendSubviewToBack(subview: View): void
    ```

* 当视图结构改变时以下回调会被触发

    ```typescript
    didAddSubview(subview: View): void
    willRemoveSubview(subview: View): void
    willMoveToSuperview(newSuperview?: View): void
    didMoveToSuperview(): void
    willMoveToWindow(newWindow?: Window): void
    didMoveToWindow(): void
    ```

* 要确认一个视图是否从属于另外一个视图

    ```typescript
    isDescendantOfView(view: View): boolean
    ```

### 触摸

* 使用 userInteractionEnabled 属性控制该视图（包括子视图）是否响应触摸

    ```typescript
    userInteractionEnabled: boolean = true;
    ```

* 使用 longPressDuration 属性控制长按手势最小识别时长

    ```typescript
    longPressDuration: number = 0.5;
    ```

* 为以下属性赋值，激活相应手势识别器，其中 [InteractionState](#interactionstate) 是触摸状态。

    ```typescript
    onTap?: () => void
    onDoubleTap?: () => void
    onLongPress?: (state: InteractionState, viewLocation: () => Point, absLocation: Point) => void
    onPan?: (state: InteractionState, viewLocation: () => Point, absLocation: Point, velocity: Point, translation: Point) => void
    ```

#### InteractionState

* InteractionState 用于描述当前触摸状态

    ```typescript
    enum InteractionState {
        /**
         * 触摸开始
         */
        Began,
        /**
         * 触摸持续
         */
        Changed,
        /**
         * 触摸结束
         */
        Ended,
        /**
         * 触摸取消
         */
        Cancelled,
    }
    ```

### 动画

* 线性动画

    ```typescript
    /**
     * 定义并触发一组线性动画
     */
    static animationWithDuration(duration: number, animations: () => void, completion?: () => void): void
    ```

* 弹性动画

    ```typescript
    /** 
     * 此值只对 iOS 有效
     */
    static springAnimationDuration: number
    /**
     * 定义并触发一组弹性动画
     */
    static animationWithBouncinessAndSpeed(damping: number, velocity: number, animations: () => void, completion?: () => void): void
    ```

## Window

Window 继承 [View](#view)，是一个特殊的视图，它位于最底一级。

* 你必须给 rootViewController: [ViewController](#viewcontroller) 赋予一个 [ViewController](#viewcontroller) 实例。

    ```typescript
    rootViewController?: ViewController = undefined
    ```

* 调用 ```makeKeyAndVisible``` 方法，```Window``` 会成为 ```Appplication``` 的 ```keyWindow```。

    ```typescript
    makeKeyAndVisible(): void
    ```

* 调用 endEditing 方法可以让所有输入框失去输入焦点

    ```typescript
    endEditing(): void
    ```

## LayoutConstraint

LayoutConstraint 类，用于描述多个视图之间的约束关系。

* 使用 Visual Format 生成约束

    ```typescript
    static constraintsWithVisualFormat(format: string, views?: { [key: string]: View } | Object): LayoutConstraint[]
    ```

* 使用参数生成约束

    ```typescript
    constructor(firstItem?: View, firstAttr?: LayoutAttribute, relation?: LayoutRelation, 
                secondItem?: View, secondAttr?: LayoutAttribute, 
                constant?: number, multiplier?: number)
    ```

### LayoutAttribute

* LayoutAttribute 描述约束边界类型

    ```typescript
    enum LayoutAttribute {
        Const = 0,
        Left = 1,
        Right = 2,
        Top = 3,
        Bottom = 4,
        Width = 7,
        Height = 8,
        CenterX = 9,
        CenterY = 10,
    }
    ```

### LayoutRelation

* LayoutRelation 描述约束数值对比方法

    ```typescript
    enum LayoutRelation {
        Less = -1,
        Equal = 0,
        Greater = 1,
    }
    ```

## Button

Button 继承 [View](#view) ，是一个可触摸的视图。

* 使用 font: [Font](#font) 修改按钮的字体

    ```typescript
    font: Font;
    ```

* 使用 title 修改按钮的文字

    ```typescript
    title?: string
    ```

* 使用 image?: [Image](#image) 属性修改按钮的图片

    ```typescript
    image?: Image;
    ```

* 使用 color: [Color](#color) 属性修改按钮的文字、图片颜色

    ```typescript
    color: Color = tintColor
    ```

* 使用 vertical 和 inset 属性控制图片、文本的布局

    ```typescript
    vertical: boolean = false;
    inset: number = 0; 
    ```

* 给以下属性赋值，响应按钮的各种事件

    ```typescript
    /**
     * 按下时
     */
    onTouchDown?: (sender: this) => void
    /**
     * 在按钮内部拖动时
     */
    onTouchDragInside?: (sender: this) => void
    /**
     * 在按钮外部拖动时
     */
    onTouchDragOutside?: (sender: this) => void
    /**
     * 拖动过程中，手指从外部转至内部
     */
    onTouchDragEnter?: (sender: this) => void
    /**
     * 拖动过程中，手指从内部转至外部
     */
    onTouchDragExit?: (sender: this) => void
    /**
     * 手指在按钮内部弹起
     */
    onTouchUpInside?: (sender: this) => void
    /**
     * 手指在按钮外部弹起
     */
    onTouchUpOutside?: (sender: this) => void
    /**
     * 触摸被取消
     */
    onTouchCancel?: (sender: this) => void
    /**
     * 高亮变化时
     */
    onHighlighted?: (sender: this, highligted: boolean) => void
    /**
     * 仅 PC 端有效，鼠标经过（离开）时。
     */
    onHover?: (sender: this, hovered: boolean) => void
    ```

## ImageView

ImageView 继承 [View](#view)，用于渲染一张图片。

* 使用 image 属性设置一张图片

    ```typescript
    image?: Image;
    ```

* 使用 contentMode: [ContentMode](#contentmode) 控制图片的拉伸方式

    ```typescript
    contentMode: ContentMode;
    ```

* 使用 loadImage 加载一张图片

    ```typescript
    loadImage(url: string, fadeIn?: boolean): void
    ```

### Image

Image 用于描述一张图片

* 通过本地路径加载一个图片

    ```typescript
    static fromSource(localPath: string): Image
    ```

* 通过服务器地址创建图片

    ```typescript
    static fromURL(url: string, success: (image: Image) => void, failure?: (error: Error) => void): void
    ```

* 通过 Base64 编码字符串创建图片

    ```typescript
    static fromBase64(value: string, scale: number, bitmapWidth?: number, bitmapHeight?: number): Image | undefined
    ```

* 获取 Image 的信息

    ```typescript
    /**
     * 图片的大小
     */
    readonly size: Size;
    /**
     * 图片的倍率
     */
    readonly scale: number;
    /**
     * 图片的渲染模式
     */
    readonly renderingMode: ImageRenderingMode;
    ```

* 修改 renderingMode 并获取一个新的 Image 对象

    ```typescript
    imageWithImageRenderingMode(renderingMode: ImageRenderingMode): Image
    ```

#### ImageRenderingMode

* ImageRenderingMode 描述图片的渲染方式

    ```typescript
    enum ImageRenderingMode {
        /**
         * 使用原图渲染
         */
        Original,
        /**
         * 使用视图主色（tintColor）渲染
         */
        Template,
    }
    ```

### ContentMode

* ContentMode 描述视图内容的拉伸方式

    ```typescript
    enum ContentMode {
        /**
         * 非比例拉伸，铺满视图
         */
        ScaleToFill,
        /**
         * 等比例拉伸，并且不会超出视图区域
         */
        ScaleAspectFit,
        /**
         * 等比例拉伸，可能超出视图区域
         */
        ScaleAspectFill,
    }
    ```

## Label

Label 继承 [View](#view)，用于渲染单行或多行文本。

* 使用 text 属性设置文本

    ```typescript
    text: string;
    ```

* 使用 font: [Font](#font) 属性设置字体

    ```typescript
    font: Font = Font.systemFontOfSize(14.0)
    ```

* 使用 textColor: [Color](#color) 属性设置字体颜色

    ```typescript
    textColor: Color = Color.blackColor
    ```

* 使用 textAlignment: [TextAlignment](#textalignment) 属性设置文本对齐方式

    ```typescript
    textAlignment: TextAlignment = TextAlignment.Left
    ```

* 使用 numberOfLines 属性设置文本最大行数，为 0 时表示不限制行数。

    ```typescript
    numberOfLines: number = 0
    ```

* 使用 lineBreakMode: [LineBreakMode](#linebreakmode) 属性设置文本换行方式

    ```typescript
    lineBreakMode: LineBreakMode = LineBreakMode.WordWrapping
    ```

* 使用 letterSpace 控制字符间距

    ```typescript
    letterSpace: number = 0
    ```

* 使用 lineSpace 控制行间距

    ```typescript
    lineSpace: number = 0
    ```

* 使用 textRectForBounds 方法，获取当前文本在指定视图大小中的内容宽高

    ```typescript
    textRectForBounds(bounds: Rect): Rect
    ```

### TextAlignment

TextAlignment 描述文本水平对齐方式

    ```typescript
    enum TextAlignment {
        Left,
        Center,
        Right,
    }
    ```

### LineBreakMode

LineBreakMode 描述水平换行方式

    ```typescript
    enum LineBreakMode {
        WordWrapping = 0,
        TruncatingTail = 4,
    }
    ```

## ScrollView

ScrollView 继承 [View](#view)，是一个可滚动的视图。

* 使用 contentOffset: [Point](#point) 设置、获取当前滚动位置

    ```typescript
    contentOffset: Point = {x: 0, y: 0}
    ```

* 使用 setContentOffset 方法，可以动画缓动方式滚动至指定位置。

    ```typescript
    setContentOffset(value: Point, animated: boolean): void
    ```

* 使用 scrollRectToVisible 方法，使得指定位置的内容可见（通过滚动的方式）。

    ```typescript
    scrollRectToVisible(rect: Rect, animated: boolean): void
    ```

* 使用 contentSize: [Size](#size) 设置可滚动区域宽高

    ```typescript
    contentSize: Size = {width: 0, height: 0}
    ```

* 使用 contentInset: [Insets](#insets) 设置边界可滚动区域大小

    ```typescript
    contentInset: Insets = {top: 0, left: 0, bottom: 0, right: 0}
    ```

* 使用 isPagingEnabled 设置是否允许分页滚动

    ```typescript
    isPagingEnabled: boolean = false
    ```

* 使用 isDirectionalLockEnabled 设置是否只允许在单个方向上滚动

    ```typescript
    isDirectionalLockEnabled: boolean = true
    ```

* 使用 isScrollEnabled 设置是否允许滚动

    ```typescript
    isScrollEnabled: boolean = true
    ```

* 使用 bounces 设置是否允许回弹（仅 iOS 有效）

    ```typescript
    bounces: boolean = true
    ```

* 使用 alwaysBounceVertical 设置是否允许总在竖向上回弹（即使内容高度小于视图高度）

    ```typescript
    alwaysBounceVertical: boolean = false
    ```

* 使用 alwaysBounceHorizontal 设置是否允许总在横向上回弹（即使内容宽度小于视图宽度）

    ```typescript
    alwaysBounceHorizontal: boolean = false
    ```

* 使用 showsHorizontalScrollIndicator 和 showsVerticalScrollIndicator 控制滚动条的显示与否

    ```typescript
    showsHorizontalScrollIndicator: boolean = true
    showsVerticalScrollIndicator: boolean = true
    ```

* 给予 onScroll 赋值，可以在视图滚动的同时得到回调。

    ```typescript
    onScroll?: (sender: this) => void
    ```

## ListView

ListView 继承 [ScrollView](#scrollview)，是一个可滚动的列表视图。

* 给予 listHeaderView: [View](#view) 赋值，可以定义一个头部视图。

    ```typescript
    listHeaderView?: View = undefined
    ```

* 给予 listFooterView: [View](#view) 赋值，可以定义一个底部视图。

    ```typescript
    listFooterView?: View = undefined
    ```

* 给予 items: ([ListItem](#listitem) | [ListSection](#listsection))[] 赋值，定义数据源。

    ```typescript
    items: (ListItem | ListSection)[] = []
    ```

* 给予 renderItem 赋值，当某一行需要渲染时，会得到回调。

    ```typescript
    renderItem?: (cell: ListCell, item: ListItem) => void = undefined
    ```

* 使用 register 注册一个可复用的 ListCell

    ```typescript
    register(clazz: typeof ListCell, reuseIdentifier: string, context?: any): void
    ```

* 在修改数据源后，使用 reloadData 刷新 ListView。

    ```typescript
    reloadData(): void
    ```

* 给予 refreshControl 属性一个 [RefreshControl](#refreshcontrol) 实例，激活下拉刷新功能。

    ```typescript
    refreshControl?: RefreshControl = undefined
    ```

* 给予 loadMoreControl 属性一个 [LoadMoreControl](#loadmorecontrol) 实例，激活加载更多功能。

    ```typescript
    loadMoreControl?: LoadMoreControl = undefined
    ```

### ListItem

ListItem 是一个结构体，你也可以通过继承 ListEntity 的方式创建一个子类。

```typescript
interface ListItem {
    [key: string]: any,
    reuseIdentifier: string
    rowHeight: (width: number) => number
}
```

### ListSection

ListSection 类用于展示一个章节的列表，章节可以拥有自己的头部和底部视图。

* 给予 headerView: [View](#view) 赋值定义一个章节头部视图

    ```typescript
    headerView?: View = undefined
    ```

* 给予 footerView: [View](#view) 赋值定义一个章节底部视图

    ```typescript
    footerView?: View
    ```

* 给予 items: [ListItem](#listitem)[] 赋值定义该章节的数据集合

    ```typescript
    items: ListItem[] = [];
    ```

### ListCell

ListCell 继承 [View](#view)，用于显示 [ListView](#listview) 一行内容。

* 使用 currentItem: [ListItem](#listitem) 获取当前行数据

    ```typescript
    readonly currentItem?: ListItem = undefined
    ```

* 使用 selectionView: [View](#view) 修改高亮时的样式

    ```typescript
    readonly selectionView: View
    ```

* 你应该始终将子视图添加至 contentView: [View](#view) 中

    ```typescript
    readonly contentView: View
    ```

* 使用 context 属性获取在 [ListView](#listview) ```register``` 时传入的 context 参数。

    ```typescript
    readonly context?: any = undefined
    ```

* 设置 selectionStyle: [ListSelectionStyle](#listselectionstyle) 属性可控制 Cell 选中时是否高亮

    ```typescript
    selectionStyle: ListSelectionStyle
    ```

* 设置 bottomVisible 属性控制分隔线隐藏与否

    ```typescript
    bottomVisible: boolean = true
    ```

* bottomLineInsets: [Insets](#insets) 属性控制分隔线的左右边距

    ```typescript
    bottomLineInsets: Insets = {top: 0, left: 0, bottom: 0, right: 0}
    ```

* 重写 didHighlighted 方法以响应高亮状态变化

    ```typescript
    didHighlighted(highlighted: boolean): void
    ```

* 重写 didSelected 方法以响应 Cell 被选中后的事件

    ```typescript
    didSelected(): void
    ```

* 重写 didRender 方法以响应 Cell 被设置新的 currentItem 数据的事件

    ```typescript
    didRender(): void
    ```

#### ListSelectionStyle

* ListSelectionStyle 描述 ListCell 高亮时的样式

    ```typescript
    enum ListSelectionStyle {
        None,
        Gray,
    }
    ```

### RefreshControl

RefreshControl 用于 [ListView](#listview) 下拉刷新功能。

* 使用 enabled 属性设置当前 RefreshControl 是否可用

    ```typescript
    enabled: boolean = true
    ```

* 使用 color: [Color](#color) 属性设置 Loading 颜色

    ```typescript
    color: Color
    ```

* 使用 isRefreshing 属性获知当前刷新状态

    ```typescript
    readonly isRefreshing: boolean
    ```

* 使用 endRefreshing 方法结束刷新状态

    ```typescript
    endRefreshing(): void
    ```

* 给予 onRefresh 属性赋值，响应下拉刷新触发。

    ```typescript
    onRefresh?: (sender: this) => void
    ```

### LoadMoreControl

LoadMoreControl  用于 [ListView](#listview) 加载更多功能。

* 使用 enabled 属性设置当前 LoadMoreControl 是否可用

    ```typescript
    enabled: boolean = true
    ```

* 使用 color: [Color](#color) 属性设置 Loading 颜色

    ```typescript
    color: Color
    ```

* 使用 isLoading 属性获知当前加载状态

    ```typescript
    readonly isLoading: boolean
    ```

* 使用 endLoading 方法结束加载状态

    ```typescript
    endLoading(): void
    ```

* 给予 onLoad 属性赋值，响应加载更多事件触发。

    ```typescript
    onLoad?: (sender: this) => void
    ```

## CanvasView

CanvasView 继承 [View](#view)，用于在视图上绘制图案。

* 使用 globalAlpha 设定绘制透明度

    ```typescript
    globalAlpha: number = 1.0
    ```

* 使用 fillStyle: [Color](#color) 设定填充颜色

    ```typescript
    fillStyle: Color = Color.clearColor
    ```

* 使用 strokeStyle: [Color](#color) 设定描边颜色

    ```typescript
    strokeStyle: Color = Color.clearColor
    ```

* 使用 lineCap 设定线端末端样式

    ```typescript
    lineCap: "butt" | "round" | "square" = "butt"
    ```

* 使用 lineJoin 设定线端交汇边角样式

    ```typescript
    lineJoin: "bevel" | "round" | "miter" = "bevel"
    ```

* 使用 lineWidth 设定线宽

    ```typescript
    lineWidth: number = 1.0
    ```

* 使用 miterLimit 设定最大斜接长度

    ```typescript
    miterLimit: number = 0.0
    ```

* 调用 rect 方法绘制一个方形

    ```typescript
    rect(x: number, y: number, width: number, height: number): void
    ```

* 调用 fillRect 方法绘制一个方形并填充颜色

    ```typescript
    fillRect(x: number, y: number, width: number, height: number): void
    ```

* 调用 strokeRect 方法绘制一个方形并描边

    ```typescript
    strokeRect(x: number, y: number, width: number, height: number): void
    ```

* 调用 fill 为当前形状填充颜色

    ```typescript
    fill(): void
    ```

* 调用 stroke 为当前形状描边

    ```typescript
    stroke(): void
    ```

* 调用 beginPath 清空上一次绘制路径，并开始新一次的路径绘制。

    ```typescript
    beginPath(): void
    ```

* 调用 move，把路径移动到画布中的指定点，不创建线条。

    ```typescript
    moveTo(x: number, y: number): void
    ```

* 调用 closePath，创建从当前点回到起始点的路径。

    ```typescript
    closePath(): void
    ```

* 调用 lineTo，添加一个新点，然后在画布中创建从该点到最后指定点的线条。

    ```typescript
    lineTo(x: number, y: number): void
    ```

* 调用 quadraticCurveTo，创建二次贝塞尔曲线。

    ```typescript
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void
    ```

* 调用 bezierCurveTo，创建三次方贝塞尔曲线。

    ```typescript
    bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void
    ```

* 调用 arc，创建弧/曲线（用于创建圆形或部分圆）。

    ```typescript
    arc(x: number, y: number, r: number, sAngle: number, eAngle: number, counterclockwise?: boolean): void
    ```

* 调用 isPointInPath，检测指定的点是否位于当前绘制路径中。

    ```typescript
    isPointInPath(x: number, y: number): boolean
    ```

* 调用 postScale，缩放当前绘图至更大或更小。

    ```typescript
    postScale(x: number, y: number): void
    ```

* 调用 postRotate，旋转当前绘图。

    ```typescript
    postRotate(angle: number): void
    ```

* 调用 postTranslate，位移当前绘图。

    ```typescript
    postTranslate(x: number, y: number): void
    ```

* 调用 postTransform，合并一个变换矩阵到当前绘图上。

    ```typescript
    postTransform(a: number, b: number, c: number, d: number, tx: number, ty: number): void
    ```

* 调用 setTransform，重置当前绘图为目标变换矩阵。

    ```typescript
    setTransform(a: number, b: number, c: number, d: number, tx: number, ty: number): void
    ```

* 调用 save，保存当前环境的状态。

    ```typescript
    save(): void
    ```

* 调用 restore，返回之前保存过的路径状态和属性。

    ```typescript
    restore(): void
    ```

* 调用 clear，清空画布，并清空所有状态。

    ```typescript
    clear(): void
    ```

## TextField

TextField 继承 [View](#view)，是单行文本输入框。

* 使用 text 属性设置、获取当前文本

    ```typescript
    text: string = ""
    ```

* 使用 font 属性设置文本样式

    ```typescript
    font: Font = Font.systemFontOfSize(14.0)
    ```

* 使用 textColor 属性设置文字颜色

    ```typescript
    textColor: Color = Color.blackColor
    ```

* 使用 textAlignment: [TextAlignment](#textalignment) 属性设置文本对齐方式

    ```typescript
    textAlignment: TextAlignment
    ```

* 使用 placeholder 属性设置占位文本

    ```typescript
    placeholder: string;
    ```

* 使用 placeholderColor: [Color](#color) 属性设置占位文字颜色

    ```typescript
    placeholderColor: Color
    ```

* 使用 clearsOnBeginEditing 属性设置当编辑开始时是否需要清空之前的输入

    ```typescript
    clearsOnBeginEditing: Boolean = false
    ```

* 通过 editing 属性获取当前是否正在编辑

    ```typescript
    readonly editing: Boolean
    ```

* 使用 clearButtonMode: [TextFieldViewMode](#textfieldviewmode) 属性设置清除按钮的出现时机

    ```typescript
    clearButtonMode: TextFieldViewMode = TextFieldViewMode.Never
    ```

* 使用 leftView: [View](#view) 属性设置左侧附加视图

    ```typescript
    leftView?: View = undefined
    ```

* 使用 leftViewMode: [TextFieldViewMode](#textfieldviewmode) 属性设置左侧视图的出现时机

    ```typescript
    leftViewMode: TextFieldViewMode = TextFieldViewMode.Never
    ```

* 使用 rightView: [View](#view) 属性设置左侧附加视图

    ```typescript
    rightView?: View = undefined
    ```

* 使用 rightViewMode: [TextFieldViewMode](#textfieldviewmode) 属性设置左侧视图的出现时机

    ```typescript
    rightViewMode: TextFieldViewMode = TextFieldViewMode.Never
    ```

* 使用 allowAutocapitalization 设置是否允许自动首字母大写行为

    ```typescript
    allowAutocapitalization: Boolean = false
    ```

* 使用 allowAutocorrection 设置是否允许语法纠正行为

    ```typescript
    allowAutocorrection: Boolean = false
    ```

* 使用 allowSpellChecking 设置是否允许拼写检查行为

    ```typescript
    allowSpellChecking: Boolean = false
    ```

* 使用 keyboardType: [KeyboardType](#keyboardtype) 属性设置键盘类型

    ```typescript
    keyboardType: KeyboardType
    ```

* 使用 returnKeyType: [ReturnKeyType](#returnkeytype) 属性设置 Return 键的显示类型

    ```typescript
    returnKeyType: ReturnKeyType
    ```

* 使用 enablesReturnKeyAutomatically 属性设置 Return 键是否允许自动激活（仅 iOS 可用）

    ```typescript
    enablesReturnKeyAutomatically: Boolean = true
    ```

* 使用 secureTextEntry 属性设置该 TextField 是否为密码输入框（会使用掩码替代明文）

    ```typescript
    secureTextEntry: Boolean = false
    ```

* 你可以通过设置以下属性，获取 TextField 的各种事件回调。

    ```typescript
    /**
     * 是否允许开始编辑
     */
    shouldBeginEditing?: () => Boolean
    /**
     * 当开始编辑时
     */
    didBeginEditing?: () => void
    /**
     * 是否允许结束编辑
     */
    shouldEndEditing?: () => Boolean
    /**
     * 当结束编辑时
     */
    didEndEditing?: () => void
    /**
     * 是否允许字符变更
     */
    shouldChange?: (inRange: { location: number, length: number }, replacementString: string) => Boolean
    /**
     * 是否允许清空
     */
    shouldClear?: () => Boolean
    /**
     * 是否允许 Return 行为，一般使用这个回调检测用户是否按下了 Return 键
     */
    shouldReturn?: () => Boolean
    ```

* 使用 focus 方法获得焦点并开始编辑

    ```typescript
    focus(): void
    ```

* 使用 blur 方法失去焦点并结束编辑

    ```typescript
    blur(): void
    ```

### TextFieldViewMode

* TextFieldViewMode 描述 TextField 附加视图的出现时机

    ```typescript
    enum TextFieldViewMode {
        /**
         * 从不显示
         */
        Never,
        /**
         * 当 TextField 正在编辑时出现
         */
        WhileEditing,
        /**
         * 当 TextField 不在编辑状态时出现
         */
        UnlessEditing,
        /**
         * 一直显示
         */
        Always,
    }
    ```

### KeyboardType

* KeyboardType 描述键盘类型

    ```typescript
    enum KeyboardType {
        /**
         * 默认键盘
         */
        Default = 0,
        /**
         * ASCII 字符键盘
         */
        ASCIICapable = 1,
        /**
         * 数字、标点键盘
         */
        NumbersAndPunctuation = 2,
    }
    ```

### ReturnKeyType

* ReturnKeyType 描述 ReturnKey 显示类型

    ```typescript
    enum ReturnKeyType {
        Default = 0,
        Go = 1,
        Next = 4,
        Search = 6,
        Send = 7,
        Done = 9,
    }
    ```

## TextView

TextView 继承 [View](#view)，是多行文本输入框，具体 API 与 [TextField](#textfield) 一致。

## TextMeasurer

TextMeasurer 用于计算文本占位大小

* 使用 measureText 方法计算文本占位大小

    ```typescript
    static measureText(text: string, params: TextMeasureParams): Rect
    ```

### TextMeasureParams

* 使用 TextMeasureParams 结构体传入文本布局参数，参数含义可参照 (Label)[#label] 相关属性。

    ```typescript
    interface TextMeasureParams {
        font: Font;
        inRect: Rect;
        numberOfLines?: number
        letterSpace?: number
        lineSpace?: number
    }
    ```

## HRView

HRView 继承 [View](#view)，用于显示 ** 一像素 ** 宽的直线。

* 使用 position: [HRViewPosition](#hrviewposition) 控制直线渲染的位置。

    ```typescript
    position: HRViewPosition = HRViewPosition.Top
    ```

* 使用 color: (Color)[#color] 控制直线的颜色。

    ```typescript
    color: Color = Color.clearColor
    ```

### HRViewPosition

* HRViewPosition 描述直线的渲染位置

    ```typescript
    enum HRViewPosition {
        Top, /** 水平直线、视图顶部 */
        Middle, /** 水平直线、视图中部 */
        Bottom, /** 水平直线、视图底部 */
        Left, /** 垂直直线、视图左部 */
        VMiddle, /** 垂直直线、视图中部 */
        Right, /** 垂直直线、视图右部 */
    }
    ```

## WebView

WebView 继承 [View](#view)，用于显示一个网页。

* 使用 load 方法加载页面

    ```typescript
    load(URLString: string): void
    ```

* 给以下属性设值可以监听 WebView 事件

    ```typescript
    onStart?: () => void
    onFinish?: () => void
    onFail?: (error: Error) => void
    ```

## Switch

Switch 继承 [View](#view)，用于显示一个开关按钮。

* 使用 on 属性和 setOn 方法设置 Switch 的开关状态

    ```typescript
    on: boolean = false
    setOn(value: boolean, animated: boolean): void
    ```

* 给 onValueChanged 属性设值监听 Switch 开关状态变化

    ```typescript
    onValueChanged?: (sender: this) => void
    ```

## Slider

Slider 继承 [View](#view)，用于显示一个滑杆。

* 使用 value 属性和 setValue 方法设置 Slider 的值

    ```typescript
    value: number = 0.5
    setValue(value: number, animated: boolean): void
    ```

* 给 onValueChanged 属性设值监听 Switch 开关状态变化

    ```typescript
    onValueChanged?: (sender: this) => void
    ```

## ActivityIndicatorView

ActivityIndicatorView 继承 [View](#view)，用于显示一个加载指示器。

* 使用 style 属性设置加载指示器的样式

    ```typescript
    style: ActivityIndicatorViewStyle = ActivityIndicatorViewStyle.Regular
    ```

* 使用 animating 属性获取当前动画状态

    ```typescript
    readonly animating: boolean
    ```

* 使用 hidesWhenStopped 属性设置动画停止时是否隐藏指示器

    ```typescript
    hidesWhenStopped: boolean = true
    ```

* 使用 startAnimating 使指示器开始工作，其中 delay 参数表示指示器在 N 秒后开始动画。

    ```typescript
    startAnimating(delay?: number): void
    ```

* 使用 stopAnimating 使指示器停止工作

    ```typescript
    stopAnimating(): void
    ```

### ActivityIndicatorViewStyle

* ActivityIndicatorViewStyle 描述加载指示器的样式

    ```typescript
    enum ActivityIndicatorViewStyle {
        Regular,
        Large,
    }
    ```

## Alert

使用 Alert 弹出一个提示框。

* 创建一个 Alert

    ```typescript
    constructor(message: string)
    ```

* 使用 buttonTitle 属性设置按钮标题

    ```typescript
    buttonTitle: string
    ```

* 使用 show 方法弹出模态窗口并接收回调

    ```typescript
    show(callback?: () => void): void
    ```

## Confirm

使用 Confirm 弹出一个确认框

* 创建一个 Confirm

    ```typescript
    constructor(message: string)
    ```

* 使用 confirmTitle 属性设置确认按钮标题

    ```typescript
    confirmTitle: string
    ```

* 使用 cancelTitle 属性设置取消按钮标题

    ```typescript
    cancelTitle: string
    ```

* 使用 show 方法弹出模态窗口并接收回调（resolve 表示确认，reject 表示取消）

    ```typescript
    show(resolve: () => void, reject: () => void): void
    ```

## Prompt

使用 Prompt 弹出一个模态输入框

* 创建一个 Prompt

    ```typescript
    constructor(message: string)
    ```

* 使用 confirmTitle 属性设置确认按钮标题

    ```typescript
    confirmTitle: string
    ```

* 使用 cancelTitle 属性设置取消按钮标题

    ```typescript
    cancelTitle: string
    ```

* 使用 placeholder 属性设置输入框占位文本

    ```typescript
    placeholder: string
    ```

* 使用 defaultValue 属性设置输入框默认文本

    ```typescript
    defaultValue: string
    ```

* 使用 show 方法弹出模态窗口并接收回调（resolve 表示确认，reject 表示取消）

    ```typescript
    show(resolve: () => void, reject: () => void): void
    ```

## ViewController

ViewController，是一个用于控制 View 的类。

* 重写 loadView 方法可以加载一个自定义的 View 作为顶级视图

    ```typescript
    loadView(): void
    ```

* 使用 view 属性获取顶级视图

    ```typescript
    readonly view: View
    ```

* 以下方法会在适当的时候被调用，你可以重写这些方法。

    ```typescript
    viewDidLoad(): void
    viewWillAppear(): void
    viewDidAppear(): void
    viewWillDisappear(): void
    viewDidDisappear(): void
    viewWillLayoutSubviews(): void
    viewDidLayoutSubviews(): void
    ```

* 使用 title 属性设定 ViewController 的标题，标题将显示在 NavigationBar 中。

    ```typescript
    title: string = ""
    ```

* 使用 layoutOptions 属性设置系统元素风格（当前只对 Android 有效）

    ```typescript
    layoutOptions: ViewControllerLayoutOptions[] = [ViewControllerLayoutOptions.AndroidDark]
    ```

* 使用 safeAreaInsets: [Insets](#insets) 获取安全边界，避免系统元素遮挡视图元素。

    ```typescript
    readonly safeAreaInsets: Insets
    ```

* 使用 addChildViewController 和 removeFromParentViewController 方法添加子 ViewController 或将本 ViewController 从父 ViewController 中移除。

    ```typescript
    addChildViewController(childController: ViewController): void
    removeFromParentViewController(): void
    ```

* 使用 parentViewController 和 childViewControllers 属性获取父、子 ViewController。

    ```typescript
    readonly parentViewController?: ViewController
    childViewControllers: ViewController[]
    ```

* 以下方法会在适当的时候被调用，你可以重写这些方法。

    ```typescript
    willMoveToParentViewController(parent?: ViewController): void
    didMoveToParentViewController(parent?: ViewController): void
    ```

* 使用 presentViewController 和 dismissViewController 方法使用模态的方式显示、隐藏视图。

    ```typescript
    presentViewController(viewController: ViewController, animated?: boolean): void
    dismissViewController(animated?: boolean): void
    ```

* 重写 keyboardAvoidingMode keyboardWillShow keyboardWillHide 方法，以避免输入内容被软键盘遮挡。

    ```typescript
    keyboardAvoidingMode(): KeyboardAvoidingMode
    keyboardWillShow(frame: Rect, duration: number): void
    keyboardWillHide(duration: number): void
    ```

* 给 supportOrientations: [DeviceOrientation](#deviceorientation)[] 赋值锁定界面支持的旋转方向

    ```typescript
    supportOrientations: DeviceOrientation[] = [DeviceOrientation.Portrait]
    ```

* 使用 navigationController 属性获取当前附着的 NavigationController

    ```typescript
    readonly navigationController?: NavigationController
    ```

* 使用 navigationBar: [NavigationBar](#navigationbar) 属性获取导航栏，使用 showNavigationBar 和 hideNavigationBar 控制导航栏显示或隐藏。

    ```typescript
    readonly navigationBar: NavigationBar
    showNavigationBar(animated?: boolean): void
    hideNavigationBar(animated?: boolean): void
    ```

### ViewControllerLayoutOptions

    ```typescript
    enum ViewControllerLayoutOptions {
        None,
        AndroidLight,
        AndroidDark,
    }
    ```

### NavigationBar

NavigationBar 继承 [View](#view)，依附于 ViewController 上，用于显示导航栏，同时也可使用 NavigationBar 控制系统状态栏的样式。

* 使用 title 属性设置导航栏的标题

    ```typescript
    title: string = ""
    ```

* 使用 translucent 属性设置导航栏是否透明

    ```typescript
    translucent: boolean = false
    ```

* 使用 lightContent 属性设置导航栏以及状态栏的文字、图标颜色

    ```typescript
    lightContent: boolean = false
    ```

* 使用以下方法设置导航栏的左侧、右侧图标

    ```typescript
    setLeftBarButtonItem(navigationItem?: NavigationBarButtonItem): void
    setLeftBarButtonItems(navigationItems: NavigationBarButtonItem[]): void
    setRightBarButtonItem(navigationItem?: NavigationBarButtonItem): void
    setRightBarButtonItems(navigationItems: NavigationBarButtonItem[]): void
    ```

#### NavigationBarButtonItem

NavigationBarButtonItem 表示一个导航栏的按钮。

* 使用 image 属性设置图标或使用 title 属性设置标题

    ```typescript
    image?: Image
    title?: string
    ```

* 使用 customView: [View](#view) 属性设定一个自定义的视图    

    ```typescript
    customView?: View = undefined
    ```

* 给 onTouchUpInside 设值以响应按钮点按事件

    ```typescript
    onTouchUpInside?: () => void = undefined
    ```

## NavigationController

NavigationController 继承 [ViewController](#viewcontroller)，用于控制多个场景间的切换。

* 初始化

    ```typescript
    constructor(rootViewController?: ViewController)
    ```

* 使用以下方法推入、移出视图

    ```typescript
    pushViewController(viewController: ViewController, animated?: boolean): void
    popViewController(animated?: boolean): ViewController | undefined
    popToViewController(viewController: ViewController, animated?: boolean): ViewController[]
    popToRootViewController(animated?: boolean): ViewController[]
    ```

## Screen

使用 Screen 类获取当前屏幕信息

* 使用单例

    ```typescript
    static mainScreen: Screen
    ```

* 获取宽、高、倍率

    ```typescript
    readonly width: number;
    readonly height: number;
    readonly scale: number;
    bounds(): Rect
    ```

## Device

使用 Device 类获取当前机器信息

* 使用单例

    ```typescript
    static current: Device
    ```

* 获取信息

    ```typescript
    /**
     * 机器名称
     */
    name: string
    /**
     * 系统名称
     */
    systemName: string
    /**
     * 系统版本号
     */
    systemVersion: string
    /**
     * 机器型号
     */
    model: string
    ```

## Others

### Rect

* Rect 结构体用描述位置和大小

    ```typescript
    interface Rect {
        readonly x: number;
        readonly y: number;
        readonly width: number;
        readonly height: number;
    }
    ```

* 使用以下方法操作 Rect 结构数据

    ```typescript
    function RectMake(x: number, y: number, width: number, height: number): Rect
    const RectZero: Rect
    function RectEqual(rect1: Rect, rect2: Rect): boolean
    function RectInside(rect1: Rect, rect2: Rect): boolean
    ```

### Point

* Point 结构体用于描述坐标

    ```typescript
    interface Point {
        readonly x: number;
        readonly y: number;
    }
    ```

* 使用以下方法操作 Point 结构数据

    ```typescript
    function PointMake(x: number, y: number): Point
    function PointEqual(point1: Point, point2: Point): boolean
    const PointZero: Point
    ```

### Size

* Size 结构体用于描述大小

    ```typescript
    interface Size {
        readonly width: number;
        readonly height: number;
    }
    ```

* 使用以下方法操作 Size 结构数据

    ```typescript
    function SizeMake(width: number, height: number): Size
    function SizeEqual(size1: Size, size2: Size): boolean
    const SizeZero: Size
    ```

### Insets

* Insets 结构体用于描述边界大小 

    ```typescript
    interface Insets {
        readonly top: number;
        readonly left: number;
        readonly bottom: number;
        readonly right: number;
    }
    ```

* 使用以下方法操作 Insets 结构数据

    ```typescript
    function InsetsMake(top: number, left: number, bottom: number, right: number): Insets
    ```

### TransformMatrix

* TransformMatrix 类用于描述 2D 形变

    ```typescript
    class TransformMatrix {
        readonly a: number;
        readonly b: number;
        readonly c: number;
        readonly d: number;
        readonly tx: number;
        readonly ty: number;
        constructor(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number)
        isIdentity(): boolean
    }
    ```

* TransformMatrix 类可使用静态方法计算下一个形变值

    ```typescript
    static unmatrix(matrix: TransformMatrix): { scale: { x: number, y: number }, degree: number, translate: { x: number, y: number } }
    static isIdentity(matrix: TransformMatrix): boolean
    static postScale(matrix: TransformMatrix, x?: number, y?: number): TransformMatrix
    static postTranslate(matrix: TransformMatrix, x?: number, y?: number): TransformMatrix
    static postRotate(matrix: TransformMatrix, angle: number): TransformMatrix
    static concat(preMatrix: TransformMatrix, postMatrix: TransformMatrix): TransformMatrix
    ```

* TransformMatrix 也可以使用成员方法计算下一个形变值

    ```typescript
    postScale(x?: number, y?: number): TransformMatrix
    postTranslate(x?: number, y?: number): TransformMatrix
    postRotate(angle: number): TransformMatrix
    concat(postMatrix: TransformMatrix): TransformMatrix
    ```

### Color

* Color 类用于描述颜色

    ```typescript
    readonly r: number;
    readonly g: number;
    readonly b: number;
    readonly a: number;
    constructor(r: number, g: number, b: number, a?: number)
    ```

* 使用预设值

    ```typescript
    static whiteColor: Color
    static blackColor: Color
    static clearColor: Color
    static redColor: Color
    static yellowColor: Color
    static greenColor: Color
    static blueColor: Color
    static brownColor: Color
    static cyanColor: Color
    static darkGrayColor: Color
    static grayColor: Color
    static lightGrayColor: Color
    static magentaColor: Color
    static orangeColor: Color
    static purpleColor: Color
    ```

* 使用灰度

    ```typescript
    static colorWithWhite(white: number, alpha: number): Color
    ```

* 使用 Hex 值

    ```typescript
    static colorWithHex(hex: string): Color
    ```

* 对比颜色是否一致

    ```typescript
    equals(toColor: Color | undefined): boolean
    ```

### Font

* Font 类用于描述字体样式

    ```typescript
    /**
     * 字体家族
     */
    readonly familyName?: string;
    /**
     * 字体大小
     */
    readonly pointSize: number;
    /**
     * 字体粗细，可选值（100, 200, 300, 400, 500, 600, 700, 800, 900）
     */
    readonly fontWeight: string;
    /**
     * 字体样式，可选 normal italic bold
     */
    readonly fontStyle: string;
    constructor(pointSize: number, fontWeight?: string, fontStyle?: string, familyName?: string)
    ```

* 使用预设值

    ```typescript
    /**
     * 返回系统正常字体 
     */
    static systemFontOfSize(pointSize: number, weight?: string): Font
    /**
     * 返回系统粗体 
     */
    static boldSystemFontOfSize(pointSize: number): Font
    /**
     * 返回系统斜体 
     */
    static italicSystemFontOfSize(pointSize: number): Font
    ```

### ExtView

使用 ExtView 扩展一个原生界面，用于 UI 扩展。

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