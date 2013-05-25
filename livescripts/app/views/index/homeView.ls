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
		view = @create-home-view!
		view

/**
 *@method show
 */
home-view.show = ->
	page-view = @get-page-view!
	page-view.show!
	if not added-to-window
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
home-view.create-home-view = ->
	log \create-home-view
	View = @Els.page-view = TUI.create-view @Style.page-view
	View
/**
 *@method create-header-view 
 */
home-view.create-top-bar-view = ->
	top-bar-view.get-page-view!
/*==========================Control==================================*/

module.exports = home-view


