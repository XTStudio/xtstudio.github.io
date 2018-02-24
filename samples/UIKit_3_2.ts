// Sample By Pony

class HelloViewController extends UI.ViewController {

	yellowView = new UI.View()

	viewDidLoad() {
		super.viewDidLoad()
		this.yellowView.backgroundColor = UI.Color.yellowColor
		this.view.addSubview(this.yellowView)
		this.view.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"H:[yellowView(50%)]", this
		))
		this.view.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"C:yellowView.centerX(_)", this
		))
		this.view.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"V:|-0-[yellowView]-0-|", this
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