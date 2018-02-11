class HelloViewController extends UI.ViewController {

	viewDidLoad() {
		super.viewDidLoad()
		const redView = new UI.View
		redView.backgroundColor = UI.Color.redColor
        redView.frame = UI.RectMake(120, 120, 66, 66)
		redView.onLongPress = (state) => {
			if (state == UI.InteractionState.Began) {
				redView.backgroundColor = UI.Color.yellowColor
			}
            else if (state == UI.InteractionState.Changed) {
                redView.backgroundColor = UI.Color.greenColor
            }
            else if (state == UI.InteractionState.Ended) {
				redView.backgroundColor = UI.Color.redColor
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