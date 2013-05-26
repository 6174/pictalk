require! ["styles/navBarViewStyle"]

#create-nav-bar-view
nav-bar-view = YTI.View.nav-bar-view || YTI.View.create!
nav-bar-view.extend({
	Els: {}
	Data: {}
	Style: nav-bar-view-style
	})
added-to-window = false
/*===========================View=====================/
/**
 *@method get-page-view
 */
nav-bar-view.get-page-view = ->
	if @Els["pageView"] 
		return @Els["pageView"]
	else
		view = @create-page-view!
		view
nav-bar-view.show = ->
	log \show-nav-bar-view
	page-view = @get-page-view!
	page-view.show!
	if not added-to-window
		added-to-window := true
		YTI.APP.main-window.add page-view
	page-view

nav-bar-view.hide = ->
	log \hide-nav-bar-view
	page-view = @get-page-view!
	page-view.set-visible false
	page-view

/**
 *@method create-nav-bar-view 
 */
nav-bar-view.create-page-view = ->
	log \create-nav-bar-view
	View = @Els.page-view = TUI.create-view @Style.nav-bar-view
	View.add @create-nav-group!
	View.hide!
	View
/**
 *@method create-nav-group
 */
nav-bar-view.create-nav-group = ->
	_this = @
	nav-group = @Els.nav-group = TUI.create-view @Style.nav-group
	nav-list = [
		{name: "nav-home", title: "首页", icon: "", ev: "go-to-home"}
		{name: "nav-contactlist", title: "通讯录", icon: "", ev: "go-to-contactlist"}
		{name: "nav-like", title: "收藏", icon: "", ev: "go-to-like"}
		{name: "nav-setting", title: "设置", icon: "", ev: "go-to-setting"}
	]
	create-nav-item = (data)->
		nav-item = TUI.create-view _this.Style.nav-item-view
		#add label
		label = TUI.create-label _this.Style.nav-label
		label.text = data.title
		nav-item.add label
		#add icon
		icon = TUI.create-image-view _this.Style.nav-icon
		icon.image = data.icon
		nav-item.add icon
		#add event
		nav-item.add-event-listener \click, ->
			log data.ev
			_this.trigger data.ev
		#return item
		nav-item
	left = 0
	for item in nav-list
		item-view = create-nav-item item
		item-view.left = left + "%"
		left += 25
		nav-group.add item-view
	nav-group

/*==============================Controller=========================*/
module.exports = nav-bar-view

			



