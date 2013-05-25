require! ["styles/topBarViewStyle"]

#create-top-bar-view
top-bar-view = YTI.View.top-bar-view || YTI.View.create!
top-bar-view.extend({
	Els: {}
	Data: {}
	Style: top-bar-view-style
	})
/*===========================View=====================*/
/**
 *@method get-top-bar-view
 */
top-bar-view.get-page-view = ->
	if @Els["pageView"] 
		return @Els["pageView"]
	else
		view = @create-page-view!
		view
/**
 *@method create-top-bar-view
 */
top-bar-view.create-page-view = ->
	log \create-top-bar-view
	View = @Els.pageView = TUI.create-view @Style.top-bar-view
	View.add @create-title-view!
	View
/**
 *@method create-top-bar-navs
 */
top-bar-view.create-title-view = ->
	log \create-title-view
	title = TUI.create-label @Style.title-view
	title.text = "图吖啊！"
	title
/*===========================Control===================*/
module.exports = top-bar-view
