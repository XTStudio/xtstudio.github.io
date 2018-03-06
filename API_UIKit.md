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

## 结构体

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