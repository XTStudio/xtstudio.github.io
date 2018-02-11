class HelloViewController extends UI.ViewController {

	viewDidLoad() {
		super.viewDidLoad()
		const redView = new UI.View
		redView.backgroundColor = UI.Color.redColor
        redView.frame = UI.RectMake(0, 0, 44, 44)
		redView.onTap = () => {
			if (this.navigationController) {
				this.navigationController.pushViewController(new SecondViewController())
			}
		}
		this.view.addSubview(redView)
	}

}

class SecondViewController extends UI.ViewController {

	viewDidLoad() {
		super.viewDidLoad()
		const yellowView = new UI.View
		yellowView.backgroundColor = UI.Color.grayColor
        yellowView.frame = UI.RectMake(0, 0, 44, 44)
		yellowView.onTap = () => {
			if (this.navigationController) {
				this.navigationController.popViewController()
			}
		}
		this.view.addSubview(yellowView)
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