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
var RedView = /** @class */ (function (_super) {
    __extends(RedView, _super);
    function RedView() {
        var _this = _super.call(this) || this;
        _this.yellowView = new UI.View;
        _this.backgroundColor = UI.Color.redColor;
        _this.yellowView.backgroundColor = UI.Color.yellowColor;
        _this.addSubview(_this.yellowView);
        return _this;
    }
    RedView.prototype.layoutSubviews = function () {
        _super.prototype.layoutSubviews.call(this);
        this.yellowView.frame = UI.RectMake(20, 0, this.bounds.width - 40, this.bounds.height);
    };
    return RedView;
}(UI.View));
var HelloViewController = /** @class */ (function (_super) {
    __extends(HelloViewController, _super);
    function HelloViewController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.redView = new RedView;
        return _this;
    }
    HelloViewController.prototype.viewDidLoad = function () {
        _super.prototype.viewDidLoad.call(this);
        this.view.addSubview(this.redView);
    };
    HelloViewController.prototype.viewWillLayoutSubviews = function () {
        _super.prototype.viewWillLayoutSubviews.call(this);
        this.redView.frame = UI.RectMake(0, 0, this.view.bounds.width, 44);
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
        this.window.rootViewController = new HelloViewController();
        this.window.makeKeyAndVisible();
    };
    return AppDelegate;
}(UI.ApplicationDelegate));
var application = new UI.Application(undefined, new AppDelegate());
