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
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HelloViewController.prototype.viewDidLoad = function () {
        var _this = this;
        _super.prototype.viewDidLoad.call(this);
        this.title = "Hello";
        this.navigationBar.backgroundColor = new UI.Color(0xe2 / 0xff, 0xe2 / 0xff, 0xe2 / 0xff);
        this.showNavigationBar();
        var redView = new UI.View;
        redView.backgroundColor = UI.Color.redColor;
        redView.frame = UI.RectMake(0, 0, 44, 44);
        redView.onTap = function () {
            if (_this.navigationController) {
                _this.navigationController.pushViewController(new SecondViewController());
            }
        };
        this.view.addSubview(redView);
    };
    return HelloViewController;
}(UI.ViewController));
var SecondViewController = /** @class */ (function (_super) {
    __extends(SecondViewController, _super);
    function SecondViewController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SecondViewController.prototype.viewDidLoad = function () {
        var _this = this;
        _super.prototype.viewDidLoad.call(this);
        this.title = "Second";
        this.navigationBar.backgroundColor = new UI.Color(0xe2 / 0xff, 0xe2 / 0xff, 0xe2 / 0xff);
        this.showNavigationBar();
        var yellowView = new UI.View;
        yellowView.backgroundColor = UI.Color.grayColor;
        yellowView.frame = UI.RectMake(0, 0, 44, 44);
        yellowView.onTap = function () {
            if (_this.navigationController) {
                _this.navigationController.popViewController();
            }
        };
        this.view.addSubview(yellowView);
    };
    return SecondViewController;
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
