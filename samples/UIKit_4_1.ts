// Sample By Pony

class HelloViewController extends UI.ViewController {

	fooButton = new UI.Button

	viewDidLoad() {
		super.viewDidLoad()
		this.fooButton.borderWidth = 2
		this.fooButton.borderColor = this.fooButton.tintColor
		this.fooButton.cornerRadius = 33
		UI.Image.fromURL("https://cdn.jsdelivr.net/npm/xt-studio@0.0.2/src/Sample/assets/voice%403x.png", (image) => {
			this.fooButton.image = image.imageWithImageRenderingMode(UI.ImageRenderingMode.Template)
		})
		this.fooButton.onTouchUpInside = () => {
			new UI.Alert("You touch me.").show()
		}
		this.view.addSubview(this.fooButton)
		this.setupConstraint()
	}

	setupConstraint() {
		this.view.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"H:[fooButton(66)]", this
		))
		this.view.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"V:[fooButton(66)]", this
		))
		this.view.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"C:fooButton.centerX(_).centerY(_)", this
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