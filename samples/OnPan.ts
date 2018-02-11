class HelloViewController extends UI.ViewController {

	viewDidLoad() {
		super.viewDidLoad()
		const redView = new UI.View
		redView.backgroundColor = UI.Color.redColor
        redView.frame = UI.RectMake(120, 120, 66, 66)
		redView.onPan = (state, viewLocation, absLocation, velocity, translation) => {
			if (state == UI.InteractionState.Began) {
				redView.backgroundColor = UI.Color.yellowColor
			}
            else if (state == UI.InteractionState.Changed) {
                if (translation) {
                    redView.transform = new UI.TransformMatrix(1.0, 0.0, 0.0, 1.0, translation.x, translation.y)
                }
            }
            else if (state == UI.InteractionState.Ended) {
				redView.backgroundColor = UI.Color.redColor
                redView.transform = new UI.TransformMatrix(1.0, 0.0, 0.0, 1.0, 0.0, 0.0)
            }
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