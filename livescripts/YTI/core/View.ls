Ti.include "common/common.js"
Ti.include "views/common.js"
# Ti-view-proto
require! ["common/util/Event","common/Class" ]
require! ["views/radioView"] 
require! ["views/styles/base"]
/**
 *扩展Ti的View类， 增加更多新的方法
*/
View = Class.create!
View.extend Event
View.include Event

View.extend({
	create-radio-view: radioView
	})

#create main window
View.create-app-window = (conf)->
	conf = conf || base.default-style
	win = TUI.create-window({
		navBarHidden: true
		title: ""
		background-color: "white"
		})
	win <<< conf
	win
View.open-page = (page-name,win, callback) ->
	page = @[page-name]
	if page 

		#hide current
		if @_current-page
			@_current-page.get-page-view.hide!
		@_current-page = page 

		#show page-view
		page-view = page.get-page-view!	
		page-view.show!
		win.add  page-view
	else
		false
module.exports = View

 

