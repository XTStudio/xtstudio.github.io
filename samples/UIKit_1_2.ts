class HelloViewController extends UI.ViewController {

	viewDidLoad() {
        super.viewDidLoad()
		const view = new UI.View()
        view.frame = UI.RectMake(44, 44, 44, 44)
        view.cornerRadius = 22
        view.backgroundColor = UI.Color.yellowColor
        view.shadowColor = UI.Color.blackColor
        view.shadowRadius = 8.0
        view.shadowOpacity = 0.5
        view.shadowOffset = UI.SizeMake(4.0, 4.0)
		this.view.addSubview(view)
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