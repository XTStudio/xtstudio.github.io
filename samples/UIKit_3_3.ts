// Sample By Pony

class HelloViewController extends UI.ViewController {

	yellowView = new UI.View()
	grayView = new UI.View()

	viewDidLoad() {
		super.viewDidLoad()
		this.yellowView.backgroundColor = UI.Color.yellowColor
		this.grayView.backgroundColor = UI.Color.grayColor
		this.view.addSubview(this.yellowView)
		this.view.addSubview(this.grayView)
		this.view.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"H:[yellowView(50%),grayView(100)]", this
		))
		this.view.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"V:|-100-[yellowView(44)]-44-[grayView(22)]", this
		))
		this.view.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"C:yellowView.centerX(_)", this
		))
		this.view.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"C:grayView.centerX(yellowView)", this
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