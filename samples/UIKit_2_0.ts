class HelloViewController extends UI.ViewController {

	viewDidLoad() {
        super.viewDidLoad()
		const redView = new UI.View
		redView.frame = UI.RectMake(88, 88, 88, 88)
		redView.backgroundColor = UI.Color.redColor
		redView.transform = new UI.TransformMatrix().postRotate(45 * Math.PI / 180)
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