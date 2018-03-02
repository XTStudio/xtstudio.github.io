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
        _this.fooTextField = new UI.TextField();
        return _this;
    }
    HelloViewController.prototype.viewDidLoad = function () {
        _super.prototype.viewDidLoad.call(this);
        this.fooTextField.borderWidth = 1;
        this.fooTextField.borderColor = UI.Color.grayColor;
        this.fooTextField.cornerRadius = 22;
        this.view.addSubview(this.fooTextField);
        this.setupLayout();
    };
    HelloViewController.prototype.setupLayout = function () {
        this.view.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat("H:[fooTextField(200)]", this));
        this.view.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat("V:[fooTextField(36)]", this));
        this.view.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat("C:fooTextField.centerX(_).centerY(_)", this));
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
