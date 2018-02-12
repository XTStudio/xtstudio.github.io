# 使用 VSCode 开发 XT 应用

> 阅读本章节前，请确认你已经完成了 XT [初级教程](/README)。

在学习完成 XT 初级教程后，是否已经迫不及待地想要开始应用开发呢？

稍等（chotto ma tte）！工欲善其事必先利其器，你不会想在 Playground 中编写一个应用出来吧？

XT 推荐你使用 VSCode 进行应用开发，VSCode 是微软出品的代码编辑器，原生支持 TypeScript，支持各种插件。在 VSCode 上开发 XT，你可以获得更多便利。

## 安装 VSCode

VSCode 可以在 Windows / Mac / Linux 下运行，请到 [VSCode 官网](https://code.visualstudio.com)下载安装。

安装完成 VSCode 后，打开 VSCode，在程序左侧选择扩展（Extension）项，搜索『XT Debugger』，作者是 PonyCui，安装它。

## 安装命令行工具

### NodeJS

NodeJS 是必须安装的，请到 [https://nodejs.org/](https://nodejs.org/en/) 官网，下载 8.x.x 版本并安装。

完成安装后，打开命令行，输入 ```node --version```，如果看到以下输出，说明安装成功。XT 要求 NodeJS 最低的版本是 6.x.x，版本过低会导致编译失败。

```
v8.9.4
```

### cnpm

cnpm 是可选安装的。

npm 是一个依赖管理工具，用于管理、安装 JavaScript 世界的各种库，当你完成 NodeJS 安装时，npm 就已经安装好了。然而，npm 在国内可能因为某些原因，导致依赖安装的过程变得非常缓慢，这个时候，你需要 cnpm 。

打开命令行，输入 ```npm i -g cnpm```，稍等片刻，即会安装成功，以后只需要简单地将 npm 命令替换成 cnpm 即可加速安装过程。

### yo

yo 是必须安装的。

打开命令行，输入 ```npm install -g yo```，稍等片刻，即会安装成功。

## 创建一个工程

1. 你可以在任意地方，创建一个文件夹，文件夹名称随意，这里，我们创建一个 AwesomeProject 的工程。
2. 使用命令行，```cd AwesomeProject```。
3. 使用命令行，输入以下命令 ```yo xt```。
4. 接着，程序会询问你一些信息，直接全部按回车就可以了。
5. 静候安装过程。

** 如果你使用的是 cnpm 可以把第 3 步的命令替换为 ```yo xt --no-install && cnpm i``` **

## 运行工程

1. 使用 VSCode 打开 AwesomeProject 文件夹，最简单的方式是把这个文件夹拖动到 VSCode 图标上。
2. 轻敲键盘 F5 键，稍等片刻，一个 Debug Bar 就会出现在界面。
3. 我们已经成功把工程构建并运行起来了

## 预览应用

预览应用的最佳入口是 [Playground](http://xt-studio.com/XT-Playground-Web/)，打开 Playground，它将自动连接至你的应用。

## 在手机上预览应用

要在手机上预览应用，请安装 [iOS Playground](/Playground?id=ios) 或是 [Android Playground](/Playground?id=android)，或者使用微信扫一扫。

轻触 Playground 右上角，选择『Show QR Code』，使用原生 Playground 或微信扫描二维码，即可在手机上预览应用。

## 触发一次新的构建

请尝试修改 ```src/HelloViewController.ts```，将其中的文本替换为 ```Hello, Pony```。

接着点按 VSCode Debugger Bar 中的刷新按钮（快捷键为 Shift + Command + F5），应用将被重新构建，你无须手动刷新 Playground，Playground 会在构建完成后，自动刷新。

## 设置断点

若要设置断点，只需在对应代码行的行号左侧，单击即可。当代码运行到断点时，程序会暂停，等候你的『Continue』或是『Step』指令。

手动切换到 VSCode Debug 功能块，可以在断点触发时，观察到变量值。

这种断点方式可以运行在所有的 Playground 以及 XT 运行时中。