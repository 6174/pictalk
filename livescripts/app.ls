require! "YTI/YTI"
#views - index
require! ["app/views/index/homeView"]
require! ["app/views/index/topBarView"]
require! ["app/views/index/infoListView"]
require! ["app/views/index/navBarView"]
#views - pictalk
require! ["app/views/pictalk/talkListView"]
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
	talk-list-view
	})

#pic-view
# YTI.View.extend({
# 	})
top-bar-view.show!
nav-bar-view.show!
talk-list-view.show!
