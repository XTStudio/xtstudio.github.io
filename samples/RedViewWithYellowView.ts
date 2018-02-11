class RedView extends UI.View {

	yellowView = new UI.View

	constructor() {
		super()
		this.backgroundColor = UI.Color.redColor
		this.yellowView.backgroundColor = UI.Color.yellowColor
		this.addSubview(this.yellowView)
	}

	layoutSubviews() {
		super.layoutSubviews()
		this.yellowView.frame = UI.RectMake(20, 0, this.bounds.width - 40, this.bounds.height)
	}

}

class HelloViewController extends UI.ViewController {

    redView = new RedView

	viewDidLoad() {
		super.viewDidLoad()
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