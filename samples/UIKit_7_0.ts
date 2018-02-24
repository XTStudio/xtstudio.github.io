// Sample By Pony

class HelloViewController extends UI.ViewController {

	scrollView = new UI.ScrollView()

	viewDidLoad() {
		super.viewDidLoad()
		const yellowView = new UI.View
		yellowView.frame = UI.RectMake(0, 0, 300, 300)
		yellowView.backgroundColor = UI.Color.yellowColor
		this.scrollView.addSubview(yellowView)
		const redView = new UI.View
		redView.frame = UI.RectMake(0, 600, 300, 300)
		redView.backgroundColor = UI.Color.redColor
		this.scrollView.addSubview(redView)
		this.scrollView.contentSize = UI.SizeMake(0, 900)
		this.view.addSubview(this.scrollView)
	}

	viewWillLayoutSubviews() {
		super.viewWillLayoutSubviews()
		this.scrollView.frame = this.view.bounds
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