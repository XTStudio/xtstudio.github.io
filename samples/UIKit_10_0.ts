// Sample By Pony

class HelloViewController extends UI.ViewController {

	fooCanvasView = new UI.CanvasView()

	viewDidLoad() {
		super.viewDidLoad()
		this.fooCanvasView.frame = UI.RectMake(0, 0, 300, 300)
		this.fooCanvasView.backgroundColor = UI.Color.lightGrayColor
		this.draw()
		this.view.addSubview(this.fooCanvasView)
	}

	draw() {
		this.fooCanvasView.fillStyle = UI.Color.blueColor
		this.fooCanvasView.fillRect(44, 44, 88, 88)
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