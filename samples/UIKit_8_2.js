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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var UserCell = /** @class */ (function (_super) {
    __extends(UserCell, _super);
    function UserCell() {
        var _this = _super.call(this) || this;
        _this.iconImageView = new UI.ImageView;
        _this.nicknameLabel = new UI.Label;
        _this.iconImageView.cornerRadius = 4;
        _this.iconImageView.clipsToBounds = true;
        _this.iconImageView.backgroundColor = UI.Color.lightGrayColor;
        // this.iconImageView.frame = UI.RectMake(15, 8, 44, 44)
        _this.addSubview(_this.iconImageView);
        _this.nicknameLabel.font = UI.Font.systemFontOfSize(15);
        _this.nicknameLabel.text = "#nickname";
        // this.nicknameLabel.frame = UI.RectMake(66, 8, 200, 44)
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
    UserCell.prototype.didRender = function () {
        _super.prototype.didRender.call(this);
        if (this.currentItem) {
            this.iconImageView.loadImage(this.currentItem.avatar_url);
            this.nicknameLabel.text = this.currentItem.login;
        }
    };
    return UserCell;
}(UI.ListCell));
var ListViewSample = /** @class */ (function (_super) {
    __extends(ListViewSample, _super);
    function ListViewSample() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.listView = new UI.ListView;
        _this.loadingIndicator = (function () {
            var value = new UI.ActivityIndicatorView();
            value.tintColor = UI.Color.blackColor;
            value.style = UI.ActivityIndicatorViewStyle.Large;
            return value;
        })();
        _this.since = 0;
        _this.dataItems = [];
        return _this;
    }
    ListViewSample.prototype.viewDidLoad = function () {
        var _this = this;
        _super.prototype.viewDidLoad.call(this);
        this.navigationBar.backgroundColor = UI.Color.blackColor;
        this.navigationBar.lightContent = true;
        this.title = "ListView";
        this.showNavigationBar();
        this.listView.register(UserCell, "Cell", this);
        this.setupRefreshControl();
        this.setupLoadMoreControl();
        this.view.addSubview(this.listView);
        this.view.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat("HV:|-0-[listView]-0-|", this));
        this.view.addSubview(this.loadingIndicator);
        this.view.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat("HV:|-0-[loadingIndicator]-0-|", this));
        this.view.layoutIfNeeded();
        this.listView.alpha = 0.0;
        this.loadingIndicator.startAnimating(0.3);
        this.loadData(function () {
            _this.loadingIndicator.stopAnimating();
            UI.View.animationWithDuration(0.3, function () {
                _this.listView.alpha = 1.0;
            });
        });
    };
    ListViewSample.prototype.setupRefreshControl = function () {
        var _this = this;
        this.listView.refreshControl = new UI.RefreshControl();
        this.listView.refreshControl.onRefresh = function () {
            _this.since = 0;
            _this.dataItems = [];
            _this.loadData(function () {
                _this.listView.refreshControl && _this.listView.refreshControl.endRefreshing();
                if (_this.listView.loadMoreControl) {
                    _this.listView.loadMoreControl.enabled = true;
                }
            });
        };
    };
    ListViewSample.prototype.setupLoadMoreControl = function () {
        var _this = this;
        this.listView.loadMoreControl = new UI.LoadMoreControl();
        this.listView.loadMoreControl.enabled = true;
        this.listView.loadMoreControl.onLoad = function () {
            _this.loadData(function () {
                if (_this.listView.loadMoreControl) {
                    _this.listView.loadMoreControl.enabled = _this.since < 300;
                    _this.listView.loadMoreControl.endLoading();
                }
            });
        };
    };
    ListViewSample.prototype.loadData = function (complete) {
        var _this = this;
        NS.URLSession.sharedSession.dataTaskWithURL("https://api.github.com/users?since=" + this.since.toString(), function (data) {
            if (data) {
                try {
                    var json = JSON.parse(data.utf8String());
                    json.forEach(function (it) {
                        _this.dataItems.push(__assign({}, it, { reuseIdentifier: "Cell", rowHeight: function () { return 70; } }));
                        _this.since = it["id"];
                    });
                    _this.listView.items = _this.dataItems;
                    _this.listView.reloadData();
                    complete();
                }
                catch (e) {
                    console.log(e.message);
                }
            }
        }).resume();
    };
    return ListViewSample;
}(UI.ViewController));
var AppDelegate = /** @class */ (function (_super) {
    __extends(AppDelegate, _super);
    function AppDelegate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AppDelegate.prototype.applicationDidFinishLaunchingWithOptions = function () {
        this.window = new UI.Window();
        this.window.rootViewController = new UI.NavigationController(new ListViewSample());
        this.window.makeKeyAndVisible();
    };
    return AppDelegate;
}(UI.ApplicationDelegate));
var application = new UI.Application(undefined, new AppDelegate());
