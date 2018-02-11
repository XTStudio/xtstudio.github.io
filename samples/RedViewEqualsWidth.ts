class HelloViewController extends UI.ViewController {

    redView = new UI.View

	viewDidLoad() {
		super.viewDidLoad()
        this.redView.frame = UI.RectMake(0, 0, 44, 44)
		this.redView.backgroundColor = UI.Color.redColor
		this.view.addSubview(this.redView)
    }

	viewWillLayoutSubviews() {
		super.viewWillLayoutSubviews()
		this.redView.frame = UI.RectMake(0, 0, this.view.bounds.width, 44)
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