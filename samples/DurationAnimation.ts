class HelloViewController extends UI.ViewController {

	viewDidLoad() {
		super.viewDidLoad()
		const redView = new UI.View
		redView.backgroundColor = UI.Color.redColor
        redView.frame = UI.RectMake(0, 0, 44, 44)
		redView.onTap = () => {
			UI.View.animationWithDuration(0.3, () => {
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
		this.window.rootViewController = new UI.NavigationController(new HelloViewController())
		this.window.makeKeyAndVisible()
	}

}

const application = new UI.Application(undefined, new AppDelegate())