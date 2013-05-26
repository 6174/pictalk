require! ["styles/createPicViewStyle"]

#create create-pic-view
create-pic-view = YTI.View.create-pic-view || YTI.View.create!
create-pic-view.extend({
	Els: {}
	Data: {}
	Style: create-pic-view-style
	})
#private
added-to-window = false
/*=======================View==========================*/
#base method of view
create-pic-view.extend({
	get-page-view: ->
		if @Els["pageView"]
			return @Els["pageView"]
		else
			view = @create-page-view!
			view
	show: -> 
		page-view = @get-page-view!
		page-view.show!
		if not added-to-window
			added-to-window := true
			YTI.APP.main-window.add page-view
		YTI.View.nav-bar-view.hide!
		page-view
	hide: ->
		page-view = @get-page-view!
		page-view.hide!
		YTI.View.nav-bar-view.show!
		page-view
	})
/**
 *@method create-page-view
 */
create-pic-view.create-page-view = ->
	log \create-create-pic-view
	View = @Els.page-view = TUI.create-view @Style.page-view
	View.add @create-edit-pic-view!
	View.add @create-tool-bar-view!
	View
/**
 *@method create-edit-view
 */
create-pic-view.create-edit-pic-view = ->
	edit-pic-view = TUI.create-view @Style.edit-pic-view
	pic-container = @Els.pic-container = TUI.create-view @Style.pic-container
	edit-pic-view.add pic-container
	edit-pic-view
/**
 *@method create-tool-bar-view
 */
create-pic-view.create-tool-bar-view = ->
	_this = @
	tool-bar-view = TUI.create-view @Style.tool-bar-view
	#create-submit-button
	submit-btn = TUI.create-label @Style.submit-btn
	#tools-container
	tools-container = TUI.create-scroll-view @Style.tools-container
	#creae-tools
	tools = [
		{name:"addvoice", title: "声音", ev: "add-voice"}
		{name:"addtext", title: "文字", ev: "add-text"}
		{name:"camera", title: "相机", ev: "camera"}
		{name:"photogallary", title: "相册", ev: "photo-gallary"}
		{name:"info", title: "info", ev: "add-info"}
		{name:"check", title: "check", ev: "check"}
	]
	create-tool-item = (data)->
		tool-item = TUI.create-label _this.Style.tool-item
		tool-item <<< data.style
		tool-item.add-event-listener \click, ->
			log data.ev
			_this.trigger data.ev
		tool-item
	left = 20
	margin-left = 20
	width = 120
	for tool in tools
		tool <<< {
			style:
				text: tool.title
				left: "#{left}px"
				width: "#{width}px"
		}
		left += margin-left + width
		tools-container.add create-tool-item tool
	tool-bar-view.add submit-btn
	tool-bar-view.add tools-container
	tool-bar-view

/*===========================Control=========================*/
module.exports = create-pic-view 
