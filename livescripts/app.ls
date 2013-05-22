require! "YTI/YTI"
#views
require! ["tlist/views/homeView", "tlist/views/taskView", "tlist/views/datePickerView"]
#models
require! ["tlist/models/taskModel"]
main-window = YTI.APP.main-window = YTI.View.create-app-window!
main-window.open!
YTI.Model.extend({
	task-model
	})
YTI.View.extend({
	home-view 
	task-view 
	date-picker-view 
	})
main-window.add home-view.get-page-view!
# main-window.add date-picker-view.get-page-view!
