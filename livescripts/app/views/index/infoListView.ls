require! ["styles/infoListViewStyle"]

#create-info-list-view
info-list-view = YTI.View.info-list-view || YTI.View.create!
info-list-view.extend({
	Els: {}
	Data: {}
	Style: info-list-view-style
	})
/*=========================View==========================*/
/**
 *@method get-page-view
 */
info-list-view.get-page-view = ->
	if @Els["pageView"] 
		return @Els["pageView"]
	else
		view = @create-page-view!
		view

/**
 *@method create-info-list-view
 */
info-list-view.create-page-view = ->
	log \create-info-list-view
	View = @Els.page-view = TUI.create-view @Style.info-list-view
	View.add @create-scroll-container-view!
	View

/**
 *@method create-scroll-container-view
 */
info-list-view.create-scroll-container-view = ->
	scroll-container = @Els.scroll-container = TUI.create-scroll-view @Style.scroll-container-view
	@update-info-list!
	scroll-container

/**
 *@method create-info-item-view
 */
info-list-view.create-info-item-view = (data)->
	info-item = TUI.create-view @Style.info-item-view
	info-item <<< data.style

	#create-label
	label = TUI.create-label({
		text: "in item"
		font: {font-size: "30px", font-weight: "bold"}
		})
	info-item.add label
	info-item
/**
 *@method update-info-list
 */
info-list-view.update-info-list = !(info-list)->
	#mock
	scroll-container = @Els.scroll-container 

	top = 0
	height = 160
	margin-top = 2

	for i from 0 to 10 by 1
		data = {
			style:
				top: top + "px"
				height: height
		}
		item = @create-info-item-view data
		top += height + margin-top
		scroll-container.add item

/*================================control===========================*/
module.exports = info-list-view





