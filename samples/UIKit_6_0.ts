// Sample By Pony

class HelloViewController extends UI.ViewController {

	viewDidLoad() {
		super.viewDidLoad()
		const fooImageView = new UI.ImageView()
		fooImageView.frame = UI.RectMake(44, 44, 100, 100)
		UI.Image.fromURL("http://www.httpbin.org/image/png", (image) => {
			fooImageView.image = image
		})
		this.view.addSubview(fooImageView)
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