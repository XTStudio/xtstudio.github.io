// Sample By Pony

class UserCell extends UI.ListCell {

	iconImageView = new UI.ImageView
	nicknameLabel = new UI.Label

	constructor() {
		super()
		this.iconImageView.cornerRadius = 4
		this.iconImageView.clipsToBounds = true
		this.iconImageView.backgroundColor = UI.Color.lightGrayColor
		this.addSubview(this.iconImageView)
		this.nicknameLabel.font = UI.Font.systemFontOfSize(15)
		this.nicknameLabel.text = "#nickname"
		this.addSubview(this.nicknameLabel)
		this.setupLayout()
	}

	setupLayout() {
		this.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"H:|-15-[iconImageView(44)]-8-[nicknameLabel]-15-|", this
		))
		this.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"V:[iconImageView(44)]", this
		))
		this.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"C:iconImageView.centerY(_)", this
		))
		this.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"V:[nicknameLabel(44)]", this
		))
		this.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"C:nicknameLabel.centerY(_)", this
		))
		this.layoutIfNeeded()
	}

	didRender() {
		super.didRender()
		if (this.currentItem) {
			this.iconImageView.loadImage(this.currentItem.avatar_url)
			this.nicknameLabel.text = this.currentItem.login
		}
	}

}

class HelloViewController extends UI.ViewController {

	listView = new UI.ListView

	viewDidLoad() {
		super.viewDidLoad()
		this.listView.register(UserCell, "Cell", this)
		this.view.addSubview(this.listView)
		this.view.addConstraints(UI.LayoutConstraint.constraintsWithVisualFormat(
			"HV:|-0-[listView]-0-|", this
		))
		this.view.layoutIfNeeded()
		this.loadData()
	}

	loadData() {
		NS.URLSession.sharedSession.dataTaskWithURL("http://xt-studio.com/GHUser/0.json", (data) => {
			if (data) {
				try {
					const json: any[] = JSON.parse(data.utf8String())
					this.listView.items = json.map(it => {
						return {
							...it,
							reuseIdentifier: "Cell",
							rowHeight: () => 70,
						}
					})
					this.listView.reloadData()
				} catch (e) {}
			}
		}).resume()
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