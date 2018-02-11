class HelloViewController extends UI.ViewController {

	viewDidLoad() {
		super.viewDidLoad()
		const redView = new UI.View
        redView.frame = UI.RectMake(0, 0, 44, 44)
		this.view.addSubview(redView)
	}

}

class AppDelegate extends UI.ApplicationDelegate {

	applicationDidFinishLaunchingWithOptions() {
		this.window = new UI.Window()
		this.window.rootViewController = new HelloViewController()
		this.window.makeKeyAndVisible()
	}

}

const application = new UI.Application(undefined, new AppDelegate())