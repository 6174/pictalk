require! ["styles/createPicViewStyle"]

#create create-pic-view
create-pic-view = YTI.View.create-pic-view || YTI.View.create!
create-pic-view.extend({
	Style: create-pic-view-style
	Els: {}
	Data: 
		#state-code for pic container : 0-> nothing 1-> add-text   2->add-voice   3->move
		state-code:
			free: 0
			add-text: 1
			add-voice: 2
			move-pic: 3
			move-text: 4
			scale-pic: 5
		#current state of pic-container
		state: 0 
		#data of the current editing pic
		pic:
			texts:[]
			voices:[]
			image: ""
			info:""
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
	_this = @
	edit-pic-view = TUI.create-view @Style.edit-pic-view
	edit-pic-view.add-event-listener \click, (ev)->
		_this.trigger \click-edit-pic-view, ev
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
		{name:"addvoice", title: "声音", ev: "add-voice-state"}
		{name:"addtext", title: "文字", ev: "add-text-state"}
		{name:"camera", title: "相机", ev: "camera"}
		{name:"photogallary", title: "相册", ev: "photo-gallery"}
		{name:"info", title: "info", ev: "add-info-state"}
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
/**
 *@bind photo-gallary
 */
create-pic-view.bind \photo-gallery, ->
	_this = @
	log \open-photo-gallery
	Ti.Media.open-photo-gallery({
		success: !(ev)->
			log \success-get-image-event
			bg-img = _this.Els.bg-img = TUI.create-image-view({
				image: ev.media
				top: 0
				left:  0
				width: "500px"
				height: "500px"
				})
			_this.Els.pic-container.add bg-img

			#add touch move handlers
			page-view = _this.get-page-view!
			touch-move-base = {
				set: (ev)->
					@x = ev.x
					@y = ev.y
				cur-x: bg-img.left
				cur-y: bg-img.top
				move-count: 0
			}
			page-view.add-event-listener \touchstart, !(e)->
				# _this.trigger \touch-start-bg-img, e
				log \touch-start
				touch-move-base.set e
				touch-move-base.move-count = 0
			page-view.add-event-listener \touchmove, !(e)->
				touch-move-base.move-count += 1
				if touch-move-base.move-count % 2 != 0
					return
				# log \touch-move
				img = _this.Els.bg-img
				touch-move-base.cur-x += e.x - touch-move-base.x
				touch-move-base.cur-y += e.y - touch-move-base.y			
				img.animate({
					top: touch-move-base.cur-y
					left: touch-move-base.cur-x
					duration: 1
					})
				touch-move-base.set e
			page-view.add-event-listener \touchend, !(e)->
				log \move-count: + touch-move-base.move-count

		})

/**
 *@bind click-edit-pic-view
 */
create-pic-view.bind \click-edit-pic-view, (ev)->
	state = @Data.state
	state-code = @Data.state-code
	switch state
	case state-code.free
		@trigger \nothing, ev
		break
	case state-code.add-text
		@trigger \add-text, ev
		break
	case state-code.add-voice
		@trigger \add-voice, ev
		break
/**
 *@bind add-text-state
 * turn to add-text-state
 */
create-pic-view.bind \add-text-state, !->
	@Data.state = @Data.state-code.add-text #1 
/**
 *@bind add-text
 */
create-pic-view.bind \add-text, !(ev)->
	# alert \add-text + ev.x + ev.y
	pic-container = @Els.pic-container
	text-tip = TUI.create-view @Style.text-tip
	text-tip.center = {
		x: ev.x
		y: ev.y
	}
	text-tip.add-event-listener \longtap, ->
		# ha
	pic-container.add text-tip
/**
 *@bind add-voice-state
 */
create-pic-view.bind \add-voice-state, !->
	@Data.state = @Data.state-code.add-voice
/**
 *@bind add-voice
 */
create-pic-view.bind \add-voice, !(ev)->
	# alert \add-voice + ev.x + ev.y
	pic-container = @Els.pic-container
	voice-tip = TUI.create-view @Style.voice-tip
	voice-tip.center = {
		x: ev.x
		y: ev.y
	}
	pic-container.add voice-tip

module.exports = create-pic-view 


 