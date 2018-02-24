// Sample By Pony

class HelloViewController extends UI.ViewController {

	fooLabel = new UI.Label

	viewDidLoad() {
		super.viewDidLoad()
		this.fooLabel.font = UI.Font.systemFontOfSize(16)
		this.fooLabel.textColor = UI.Color.blackColor
		this.fooLabel.text = `欢聚时代成立于2005年4月，国内首家富集通讯业务运营商，致力于打造最酷的网络直播公司，为全球用户提供团队语音服务，是当前国内领先的互联网语音视频平台提供商之一。欢聚时代怀揣着年轻的激情，运用创新的技术，缔造覆盖全球的富集通讯服务。`
		this.fooLabel.numberOfLines = 0
		this.view.addSubview(this.fooLabel)
		this.setupConstraint()
	}

	setupConstraint() {
		this.view.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"C:fooLabel.centerX(_).centerY(_).width(_.width/2)", this
		))
	}

}

class AppDelegate extends UI.ApplicationDelegate {

	applicationDidFinishLaunchingWithOptions() {
		this.window = new UI.Window()
		this.window.rootViewController = new UI.NavigationController(new HelloViewController())
		this.window.makeKeyAndVisible()
	}

}

const application = new UI.Application(undefined, new AppDelegate())