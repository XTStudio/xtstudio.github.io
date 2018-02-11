class HelloViewController extends UI.ViewController {

	viewDidLoad() {
		super.viewDidLoad()
		const redView = new UI.View
		redView.backgroundColor = UI.Color.redColor
        redView.frame = UI.RectMake(0, 0, 44, 44)
		redView.onTap = () => {
			UI.View.animationWithBouncinessAndSpeed(10.0, 24.0, () => {
				redView.frame = UI.RectMake(100, 100, 88, 88)
				redView.alpha = 0.5
				redView.backgroundColor = UI.Color.purpleColor
			}, () => {
				console.log("Done")
			})
		}
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