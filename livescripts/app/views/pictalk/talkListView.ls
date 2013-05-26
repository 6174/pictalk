require! ["styles/talkListViewStyle"]

#create talk-list-view
talk-list-view = YTI.View.talk-list-view || YTI.View.create!
talk-list-view.extend({
	Els: {}
	Data: {}
	Style: talk-list-view-style
	})

/**
 *@private
 */
added-to-window = false
/*================================View struct==================/
/**
 *@method get-page-view
 */
talk-list-view.get-page-view = ->
	if @Els["pageView"]
		return @Els["pageView"]
	else
		view = @create-page-view!
		view
/**
 *@method show
 */
talk-list-view.show = ->
	page-view = @get-page-view!
	page-view.show!
	if not added-to-window
		added-to-window := true
		YTI.APP.main-window.add page-view
	YTI.View.nav-bar-view.hide!
	page-view
/**
 *@method hide
 */
talk-list-view.hide = ->
	page-view = @get-page-view!
	page-view.hide!
	YTI.View.nav-bar-view.show!
	page-view
/**
 *@method create-page-view
 */
talk-list-view.create-page-view = ->
	View = @Els.page-view = TUI.create-view @Style.page-view
	View.add @create-talk-list-view!
	View.add @create-reply-view!
	View
/**
 *@method create-back-button
 */
talk-list-view.create-reply-view = ->
	reply-button = TUI.create-button @Style.reply-button
	reply-button
/**
 *@method create-talk-list-view
 */
talk-list-view.create-talk-list-view = ->
	log \create-talk-list-view
	scroll-container = @Els.scroll-container = TUI.create-scroll-view @Style.scroll-container-view
	@update-talk-list!
	scroll-container
/**
 *@method create-talk-item
 */
talk-list-view.create-talk-item = (data)->
	View = TUI.create-view @Style.talk-item-view
	View <<< data.style
	#pic-user info bar
	card-user-info-bar = TUI.create-view @Style.card-user-info-bar
	label = TUI.create-label @Style.card-info-bar-date
	label.text = "2012/3/15"
	card-user-info-bar.add label
	#pic-card-view
	pic-card-view = TUI.create-view @Style.pic-card-view

	View.add card-user-info-bar
	View.add pic-card-view
	View
/**
 *@method update-talk-list
 */
talk-list-view.update-talk-list = !->
	scroll-container = @Els.scroll-container
	#mock 
	top = 70
	margin-top = 70
	height = 540
	for i from 0 to 10 by 1
		data = {
			style:
				top: "#{top}px"
		}
		top += margin-top + height
		item-view = @create-talk-item data
		scroll-container.add item-view




/*===================================Control=======================*/
module.exports = talk-list-view

