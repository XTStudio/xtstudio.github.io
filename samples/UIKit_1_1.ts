class HelloViewController extends UI.ViewController {

	viewDidLoad() {
        super.viewDidLoad()
        const redView = new UI.View
		redView.frame = UI.RectMake(44, 44, 88, 88)
		redView.backgroundColor = UI.Color.redColor
		redView.cornerRadius = 44
		redView.clipsToBounds = true
		const blurView = new UI.View
		blurView.frame = UI.RectMake(44, 44, 44, 44)
		blurView.backgroundColor = UI.Color.blueColor
		redView.addSubview(blurView)
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