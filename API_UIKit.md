# API 文档 - UIKit

> 所有 UIKit 类均以 ```UI.``` 前缀命名。

## Context

Context 是一个可交互应用的入口，你可以通过以下方法创建上下文，其中 ```options``` 参数将传递至 ```AppDelegate:applicationDidFinishLaunchingWithOptions``` 方法中。

* 使用 name 创建（ app.min.js 文件已打包到应用内）

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

* 你可以获取到 keyWindow

    ```typescript
    readonly keyWindow?: Window
    ```

* 相关文档 [Window](#window)

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

* 相关文档 [LayoutAttribute](#layoutattribute) / [LayoutRelation](#layoutrelation)

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
    onTouchDown?: () => void
    /**
     * 在按钮内部拖动时
     */
    onTouchDragInside?: () => void
    /**
     * 在按钮外部拖动时
     */
    onTouchDragOutside?: () => void
    /**
     * 拖动过程中，手指从外部转至内部
     */
    onTouchDragEnter?: () => void
    /**
     * 拖动过程中，手指从内部转至外部
     */
    onTouchDragExit?: () => void
    /**
     * 手指在按钮内部弹起
     */
    onTouchUpInside?: () => void
    /**
     * 手指在按钮外部弹起
     */
    onTouchUpOutside?: () => void
    /**
     * 触摸被取消
     */
    onTouchCancel?: () => void
    /**
     * 高亮变化时
     */
    onHighlighted?: (highligted: boolean) => void
    /**
     * 仅 PC 端有效，鼠标经过（离开）时。
     */
    onHover?: (hovered: boolean) => void
    ```

## Image

Image 用于描述一张图片

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

* 相关文档 [ImageRenderingMode](#imagerenderingmode)

## ImageView

ImageView 继承 [View](#view)，用于渲染一张图片。

* 使用 image 属性设置一张图片

    ```typescript
    image?: Image;
    ```

* 使用 contentMode 控制图片的拉伸方式

    ```typescript
    contentMode: ContentMode;
    ```

* 使用 loadImage 加载一张图片

    ```typescript
    loadImage(url: string, fadeIn?: boolean): void
    ```

* 相关文档 [ContentMode](#contentmode)

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
    onScroll?: (scrollView: ScrollView) => void
    ```

## ListView

## ListSection

## ListCell

## RefreshControl

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
    onRefresh?: () => void
    ```

## LoadMoreControl

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
    onLoad?: () => void
    ```

## Structs

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

### InteractionState

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

### LayoutAttribute

LayoutAttribute 描述约束边界类型

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

LayoutRelation 描述约束数值对比方法

    ```typescript
    enum LayoutRelation {
        Less = -1,
        Equal = 0,
        Greater = 1,
    }
    ```

### ImageRenderingMode

ImageRenderingMode 描述图片的渲染方式

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

ContentMode 描述视图内容的拉伸方式

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