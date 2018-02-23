class HelloViewController extends UI.ViewController {

	viewDidLoad() {
        super.viewDidLoad()
        const redView = new UI.View
        redView.frame = UI.RectMake(0, 0, 88, 88)
        redView.backgroundColor = UI.Color.redColor
        const yellowView = new UI.View
        yellowView.frame = UI.RectMake(22, 22, 44, 44)
        yellowView.backgroundColor = UI.Color.yellowColor
        redView.addSubview(yellowView)
        redView.subviews.forEach((it => {
            it.backgroundColor = UI.Color.blueColor
        }))
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