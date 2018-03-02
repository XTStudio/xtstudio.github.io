// Sample By Pony

class HelloViewController extends UI.ViewController {

	fooTextField = new UI.TextField()

	viewDidLoad() {
		super.viewDidLoad()
		this.fooTextField.borderWidth = 1
		this.fooTextField.borderColor = UI.Color.grayColor
		this.fooTextField.cornerRadius = 22
		this.view.addSubview(this.fooTextField)
		this.setupLayout()
	}

	setupLayout() {
		this.view.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"H:[fooTextField(200)]", this
		))
		this.view.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"V:[fooTextField(36)]", this
		))
		this.view.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"C:fooTextField.centerX(_).centerY(_)", this
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