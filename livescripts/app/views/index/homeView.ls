require! ["styles/homeViewStyle"]
#create home-view
home-view = YTI.View.home-view || YTI.View.create!
home-view.Els = {}
home-view.Data = {}
home-view.Style = home-view-style

/**
 *@private_variables
 */
added-to-window = false
/**
 *@private_methods
 */
/*==========================View==================================*/
/**
 *@method get-page-view
 */
home-view.get-page-view = ->
	if @Els["pageView"]
		return @Els["pageView"]
	else
		view = @create-page-view!
		view

/**
 *@method show
 */
home-view.show = ->
	page-view = @get-page-view!
	page-view.show!
	if not added-to-window
		added-to-window := true
		YTI.APP.main-window.add page-view
	page-view

/**
 *@method hide
 */
home-view.hide = ->
	page-view = @get-page-view!
	page-view.hide!
	page-view

/**
 *@method create-home-view 
 */
home-view.create-page-view = ->
	log \create-home-view
	View = @Els.page-view = TUI.create-view @Style.page-view
	# View.add YTI.View.top-bar-view.get-page-view!
	View.add YTI.View.info-list-view.get-page-view!
	# View.add YTI.View.nav-bar-view.get-page-view!
	View
 
	
/*==========================Control==================================*/
module.exports = home-view


