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
        _this.scrollView = new UI.ScrollView();
        return _this;
    }
    HelloViewController.prototype.viewDidLoad = function () {
        _super.prototype.viewDidLoad.call(this);
        var yellowView = new UI.View;
        yellowView.frame = UI.RectMake(0, 0, 300, 300);
        yellowView.backgroundColor = UI.Color.yellowColor;
        this.scrollView.addSubview(yellowView);
        var redView = new UI.View;
        redView.frame = UI.RectMake(0, 600, 300, 300);
        redView.backgroundColor = UI.Color.redColor;
        this.scrollView.addSubview(redView);
        this.scrollView.contentSize = UI.SizeMake(0, 900);
        this.view.addSubview(this.scrollView);
    };
    HelloViewController.prototype.viewWillLayoutSubviews = function () {
        _super.prototype.viewWillLayoutSubviews.call(this);
        this.scrollView.frame = this.view.bounds;
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
