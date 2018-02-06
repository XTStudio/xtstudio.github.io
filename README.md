# XT Studio

XT Studio 是一个应用开发框架（ 简称 XT ），借助 XT 你可以在多个平台上获得完全一致的应用输出。

目前，XT 可以输出至 iOS / Android / Web 平台，只需要学习一次、编写一次，即可为以上平台输出应用。

## Why XT

### API 一致性

XT 定义了一套跨平台的 API，这套 API 涵盖了界面、逻辑、媒体等，这些 API 在各个平台的上的表现是一致的，并且他们的调用方式也是完全一致的。

更进一步，XT 强制你使用 UIKit 框架进行界面开发，UIKit 包含布局、层级以及渲染等功能。

另外，你还可以使用 Foundation 框架进行逻辑开发，Foundation 包含网络、二进制、文件读写、存储、WebSocket 等功能。

### 性能

不同于其它框架，XT 运行于 UI 线程，无须跨线程即可与 UI 元素进行通信，TypeScript 代码和原生平台之间的所有操作都是同步执行的。因此，你可以在 XT 上做得更多，获得更多。

XT 最终输出的界面是由 Native 层进行渲染的。其中 iOS 使用 UIKit， Android 使用 android.view.*， 而 Web 则使用 SVG。

### 工具链支持

XT 基于 TypeScript 以及 VSCode 开发，借助 VSCode 的跨平台特性（可运行在 Windows / Mac / Linux），你可以轻松地在每台电脑上开发、调试、发布应用。

同时，得益于 TypeScript 良好的代码提示、强类型以及 ES6 / ES7 完整的支持，无须复杂的配置，即可使用高级语言特性。

### 模块化支持

用 XT 开发一个应用，一个模块，一个 View，都可以！

## 开始使用

我们的目标是创建一个 Hello, World! 应用，学习如何配置运行环境，初始化工程，运行应用。

### 必备知识

* TypeScript
* npm

### 预备环境

先安装以下软件

* [VSCode 1.19+](https://code.visualstudio.com)
* [NodeJS 8.9.4+](https://nodejs.org/en/)

你可能需要以下软件，用于运行 Demo 工程。

当然，你可以选择使用 PlayGround 应用或者使用 iPhone Safari / Android Chrome 进行预览。
* [Xcode 9.2+](https://developer.apple.com)
* [Android Studio 3.0+](https://developer.android.com)

### 安装插件

#### webpack & typescript & babel

打开命令行，使用以下命令安装 ```webpack & typescript & babel```

```
npm install -g webpack
npm install -g typescript
npm install -g babel
```

#### vscode-xt-debugger

1. 下载 [VSIX](https://github.com/XTStudio/vscode-xt-debugger/raw/master/vscode-xt-debugger-0.0.1.vsix) 文件
2. 打开 VSCode
3. 在 SideBar 中选择插件，选中 ... 按钮，并选中 Install from VSIX，选择刚刚下载得到的 VSIX 文件。
4. 重启 VSCode

### 创建工程