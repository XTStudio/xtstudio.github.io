// Sample By Pony

class HelloViewController extends UI.ViewController {

	grayView = new UI.View()
	yellowView = new UI.View()

	viewDidLoad() {
		super.viewDidLoad()
		this.grayView.backgroundColor = UI.Color.grayColor
		this.yellowView.backgroundColor = UI.Color.yellowColor
		this.view.addSubview(this.grayView)
		this.view.addSubview(this.yellowView)
		this.view.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"H:|-0-[grayView(100)]-0-[yellowView]-0-|", this
		))
		this.view.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"V:|-0-[yellowView]-0-|", this
		))
		this.view.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"V:|-0-[grayView]-0-|", this
		))
		this.view.layoutIfNeeded()
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