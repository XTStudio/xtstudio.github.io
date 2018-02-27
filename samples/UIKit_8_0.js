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
var UserCell = /** @class */ (function (_super) {
    __extends(UserCell, _super);
    function UserCell() {
        var _this = _super.call(this) || this;
        _this.iconImageView = new UI.ImageView;
        _this.nicknameLabel = new UI.Label;
        _this.iconImageView.cornerRadius = 4;
        _this.iconImageView.clipsToBounds = true;
        _this.iconImageView.backgroundColor = UI.Color.lightGrayColor;
        _this.addSubview(_this.iconImageView);
        _this.nicknameLabel.font = UI.Font.systemFontOfSize(15);
        _this.nicknameLabel.text = "#nickname";
        _this.addSubview(_this.nicknameLabel);
        _this.setupLayout();
        return _this;
    }
    UserCell.prototype.setupLayout = function () {
        this.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat("H:|-15-[iconImageView(44)]-8-[nicknameLabel]-15-|", this));
        this.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat("V:[iconImageView(44)]", this));
        this.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat("C:iconImageView.centerY(_)", this));
        this.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat("V:[nicknameLabel(44)]", this));
        this.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat("C:nicknameLabel.centerY(_)", this));
        this.layoutIfNeeded();
    };
    return UserCell;
}(UI.ListCell));
var HelloViewController = /** @class */ (function (_super) {
    __extends(HelloViewController, _super);
    function HelloViewController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.listView = new UI.ListView;
        return _this;
    }
    HelloViewController.prototype.viewDidLoad = function () {
        _super.prototype.viewDidLoad.call(this);
        this.listView.register(UserCell, "Cell", this);
        this.view.addSubview(this.listView);
        this.view.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat("HV:|-0-[listView]-0-|", this));
        this.view.layoutIfNeeded();
        this.loadData();
    };
    HelloViewController.prototype.loadData = function () {
        this.listView.items = [
            {
                reuseIdentifier: "Cell",
                rowHeight: function () { return 70; }
            },
            {
                reuseIdentifier: "Cell",
                rowHeight: function () { return 70; }
            },
            {
                reuseIdentifier: "Cell",
                rowHeight: function () { return 70; }
            },
            {
                reuseIdentifier: "Cell",
                rowHeight: function () { return 70; }
            }
        ];
        this.listView.reloadData();
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
