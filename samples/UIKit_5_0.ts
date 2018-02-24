// Sample By Pony

class HelloViewController extends UI.ViewController {

	fooLabel = new UI.Label

	viewDidLoad() {
		super.viewDidLoad()
		this.fooLabel.font = UI.Font.boldSystemFontOfSize(17)
		this.fooLabel.textColor = UI.Color.purpleColor
		this.fooLabel.text = "Hello, World!"
		this.fooLabel.numberOfLines = 1
		this.view.addSubview(this.fooLabel)
		this.setupConstraint()
	}

	setupConstraint() {
		this.view.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"C:fooLabel.centerX(_).centerY(_)", this
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