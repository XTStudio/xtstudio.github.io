// Sample By Pony
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var HelloViewController = /** @class */ (function (_super) {
    __extends(HelloViewController, _super);
    function HelloViewController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fooLabel = new UI.Label;
        return _this;
    }
    HelloViewController.prototype.viewDidLoad = function () {
        _super.prototype.viewDidLoad.call(this);
        this.fooLabel.font = UI.Font.systemFontOfSize(16);
        this.fooLabel.textColor = UI.Color.blackColor;
        this.fooLabel.text = "\u6B22\u805A\u65F6\u4EE3\u6210\u7ACB\u4E8E2005\u5E744\u6708\uFF0C\u56FD\u5185\u9996\u5BB6\u5BCC\u96C6\u901A\u8BAF\u4E1A\u52A1\u8FD0\u8425\u5546\uFF0C\u81F4\u529B\u4E8E\u6253\u9020\u6700\u9177\u7684\u7F51\u7EDC\u76F4\u64AD\u516C\u53F8\uFF0C\u4E3A\u5168\u7403\u7528\u6237\u63D0\u4F9B\u56E2\u961F\u8BED\u97F3\u670D\u52A1\uFF0C\u662F\u5F53\u524D\u56FD\u5185\u9886\u5148\u7684\u4E92\u8054\u7F51\u8BED\u97F3\u89C6\u9891\u5E73\u53F0\u63D0\u4F9B\u5546\u4E4B\u4E00\u3002\u6B22\u805A\u65F6\u4EE3\u6000\u63E3\u7740\u5E74\u8F7B\u7684\u6FC0\u60C5\uFF0C\u8FD0\u7528\u521B\u65B0\u7684\u6280\u672F\uFF0C\u7F14\u9020\u8986\u76D6\u5168\u7403\u7684\u5BCC\u96C6\u901A\u8BAF\u670D\u52A1\u3002";
        this.fooLabel.numberOfLines = 0;
        this.view.addSubview(this.fooLabel);
        this.setupConstraint();
    };
    HelloViewController.prototype.setupConstraint = function () {
        this.view.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat("C:fooLabel.centerX(_).centerY(_).width(_.width/2)", this));
    };
    return HelloViewController;
}(UI.ViewController));
var AppDelegate = /** @class */ (function (_super) {
    __extends(AppDelegate, _super);
    function AppDelegate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AppDelegate.prototype.applicationDidFinishLaunchingWithOptions = function () {
        this.window = new UI.Window();
        this.window.rootViewController = new UI.NavigationController(new HelloViewController());
        this.window.makeKeyAndVisible();
    };
    return AppDelegate;
}(UI.ApplicationDelegate));
var application = new UI.Application(undefined, new AppDelegate());
