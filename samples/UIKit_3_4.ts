// Sample By Pony

class HelloViewController extends UI.ViewController {

	yellowView = new UI.View()

	viewDidLoad() {
		super.viewDidLoad()
		this.yellowView.backgroundColor = UI.Color.yellowColor
		this.view.addSubview(this.yellowView)
		this.view.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"H:|-15-[yellowView(50%)]", this
		))
		this.view.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"V:|-100-[yellowView(yellowView.width*1.5)]", this
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