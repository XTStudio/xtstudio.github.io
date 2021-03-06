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
        var redView = new UI.View;
        redView.backgroundColor = UI.Color.redColor;
        redView.frame = UI.RectMake(120, 120, 66, 66);
        redView.onLongPress = function (state) {
            if (state == UI.InteractionState.Began) {
                redView.backgroundColor = UI.Color.yellowColor;
            }
            else if (state == UI.InteractionState.Changed) {
                redView.backgroundColor = UI.Color.greenColor;
            }
            else if (state == UI.InteractionState.Ended) {
                redView.backgroundColor = UI.Color.redColor;
            }
        };
        this.view.addSubview(redView);
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
