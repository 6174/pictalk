require! "YTI/YTI"
#views
require! ["app/views/index/homeView"]
require! ["app/views/index/topBarView"]
require! ["app/views/index/infoListView"]
require! ["app/views/index/navBarView"]
main-window = YTI.APP.main-window = YTI.View.create-app-window!
main-window.open!
# YTI.Model.extend({
# 	task-model
# 	})

#index-view
YTI.View.extend({
	home-view 
	top-bar-view
	info-list-view
	nav-bar-view
	})

main-window.add home-view.get-page-view!
