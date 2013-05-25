require! "YTI/YTI"
#views
require! ["app/views/homeView"]
require! ["app/views/topBarView"]
# require! ["tlist/views/homeView", "tlist/views/taskView", "tlist/views/datePickerView"]
#models
# require! ["tlist/models/taskModel"]
main-window = YTI.APP.main-window = YTI.View.create-app-window!

main-window.open!
# YTI.Model.extend({
# 	task-model
# 	})
YTI.View.extend({
	home-view 
	top-bar-view
	})
# main-window.add home-view.get-page-view!
# main-window.add date-picker-view.get-page-view!
