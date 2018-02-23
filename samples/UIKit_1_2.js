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
        _super.prototype.viewDidLoad.call(this);
        var view = new UI.View();
        view.frame = UI.RectMake(44, 44, 44, 44);
        view.cornerRadius = 22;
        view.backgroundColor = UI.Color.yellowColor;
        view.shadowColor = UI.Color.blackColor;
        view.shadowRadius = 8.0;
        view.shadowOpacity = 0.5;
        view.shadowOffset = UI.SizeMake(4.0, 4.0);
        this.view.addSubview(view);
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
