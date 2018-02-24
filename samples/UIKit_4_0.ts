// Sample By Pony

class HelloViewController extends UI.ViewController {

	fooButton = new UI.Button

	viewDidLoad() {
		super.viewDidLoad()
		this.fooButton.frame = UI.RectMake(44, 44, 100, 44)
		this.fooButton.borderWidth = 2
		this.fooButton.borderColor = this.fooButton.tintColor
		this.fooButton.cornerRadius = 22
		this.fooButton.title = "Foo"
		this.fooButton.onTouchUpInside = () => {
			this.fooButton.title = "Bar"
		}
		this.view.addSubview(this.fooButton)
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