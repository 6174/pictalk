/**
 *date-picker-view
 */
require! ["styles/datePickerViewStyle"]
date-picker-view = YTI.View.create!
date-picker-view.Els = {}
date-picker-view.Data = {}
date-picker-view.Style = datePickerViewStyle
/**
 *@private
 */
added-to-window = false
/**
 *@create picker-view
 */
date-picker-view.get-page-view = (data)->
	if @Els.page-view 
		return @Els.page-view
	else
		view = @create-picker-view  data

/**
 *@create create-picker-view
 */
date-picker-view.create-picker-view = (data) ->
	view = @Els.page-view = TUI.create-view @Style.page-style
	view.add @create-date-picker-view data
	view.add @create-time-picker-view data
	view.add @Els.top-bar-view = @create-top-bar-view!
	view

/**
 *@create create-picker-view
 */
date-picker-view.create-date-picker-view = (data)->
	that = @
	picker = @Els.date-picker-view = TUI.create-picker @Style.date-picker-style
	picker
/**
 *@create create-time-picker-view
 */
date-picker-view.create-time-picker-view = (data)->
	that = @
	picker = @Els.time-picker-view = TUI.create-picker @Style.time-picker-view
	date = new Date!
	date.set-hours 0
	date.set-minutes 0
	picker.value = date
	picker
/**
 *@create top-bar-view
 */
date-picker-view.create-top-bar-view = ->
	that = @
	view = TUI.create-view @Style.top-bar
	btn-style = @Style.top-bar-btn 
	
	cancel-btn = TUI.create-label btn-style
	ok-btn = TUI.create-label btn-style

	cancel-btn <<< @Style.cancel-btn
	ok-btn <<< @Style.ok-btn

	do 
		<-! ok-btn.add-event-listener \click, _
		that.trigger \ok
	do
		<-! cancel-btn.add-event-listener \click, _
		that.trigger \cancel

	view.add cancel-btn
	view.add ok-btn
	view

/**
 *@getter get-date-data
 */
date-picker-view.get-date-data = ->
	date = @Els.date-picker-view.get-value!
	time = @Els.time-picker-view.get-value!
	log date.get-month! + " " + date.get-date!
	log time.get-hours! + " " + time.get-minutes!
	inspect {
		date
		time
	}
	return new Date( date.get-full-year!, date.get-month!,date.get-date!, time.get-hours!, time.get-minutes!)

/**
 *@rigister get-date
 */
date-picker-view.get-date = (context, callback)->
	log \regist-get-date
	_this = @
	_this.show!
	_callback = !->
		#value 
		value =  _this.get-date-data!
		#call callback
		callback.call context, value
		#unbind
		_this.unbind \ok, _callback
		_this.hide!

	@bind \ok, _callback

date-picker-view.hide = ->
	@get-page-view!.hide!

date-picker-view.show = ->
	if added-to-window == false
		log \first-time
		added-to-window := true
		YTI.APP.main-window.add @get-page-view!
	@get-page-view!.show!
# /**
#  *@bind ok
#  */
# date-picker-view.bind \ok, !(data)->
# 	alert \ok
/**
 *@bind cancel
  */
date-picker-view.bind \cancel, !(data)->
	@hide!


module.exports = date-picker-view
