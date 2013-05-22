/**
 *home-view
 */
require! ["styles/homeViewStyle"]
home-view = YTI.View.home-view || YTI.View.create!
home-view.Els = {
	top-bar-view: null
	footer-bar-view: null
	task-list-view: null
}
home-view.Data = {
	list: []
}
#下一次更改将所有的关于样式的全部放在一个叫home-view-Style的模块当中
home-view.Style = home-view-style
/**
 *@method get-page-view
 */
home-view.get-page-view = ->
	if @Els["pageView"]
		return @Els["pageView"]
	else
		view = @create-home-view! 
		view

/**
 *@method create-home-view
 */
home-view.create-home-view = ->
	log \create-home-view
	# main-window.title-control.hide!
	view = @Els.page-view = TUI.create-view @Style.page
	view.add  @create-top-bar-view!
	view.add  @create-task-list-view  YTI.Model.task-model.get-records!
	view.add  @create-footer-bar-view!
	view
/**
 *@method create-top-bar-view
 *
 */
home-view.create-top-bar-view = ->
	view = TUI.create-view @Style.top-bar
	btn-style = @Style.top-bar-btn 
	recent-task-btn = TUI.create-label btn-style
	recent-task-btn <<< @Style.recent-task-btn
	recent-habit-btn = TUI.create-label btn-style
	recent-habit-btn <<< @Style.recent-habit-btn
	view.add recent-task-btn
	view.add recent-habit-btn
	view
/**
 *@method create-task-list-view
 *
 */
home-view.create-task-list-view = (records)-> 
	_this = @
	log \create-task-list-view
	#判断是否存在task-list-view
	#如果存在， 那么清空task-list
	#这种做法不好， 但是先快速开发出原型， 再细化开发
	if @Els.task-list-view
		@Els.task-list-view.remove @Els.task-list-view-container
		View = @Els.task-list-view
	else
		View = @Els.task-list-view = TUI.create-view @Style.task-list-view
	container = @Els.task-list-view-container = TUI.create-scroll-view @Style.task-list-view-container
	View.add container

	size = 0
	for it of records
		size += 1
		item = records[it]
		view = TUI.create-view @Style.list-item-view
		view.record-data = item
		label = TUI.create-label({text: "#{item.data.content}"})
		label <<< @Style.list-item-label
		view.add label

		do
			<-! view.add-event-listener \click, _
			id = @record-data.id
			log id
			_this.trigger \go-to-task, id

		container.add view
	if size == 0
		label = TUI.create-label @Style.task-list-no-record-label
		container.add label
	View

/**
 *@method update-task-list-vew
 */
home-view.update-task-view = !->
	records = YTI.Model.task-model.get-records!
	@create-task-list-view records
		
/**
 *@method create-footer-bar-view
 *
 */
home-view.create-footer-bar-view = ->
	_this = @
	view = TUI.create-view @Style.footer-bar-view
	new-task-btn = TUI.create-label @Style.new-task-btn
	task-text-filed = @Els.task-text-filed = TUI.create-text-field @Style.task-text-filed
	do 
		<-! task-text-filed.add-event-listener \click, _
		@.focus!
	do
		<-! new-task-btn.add-event-listener \click, _
		_this.trigger \new-task
	task-text-filed.blur!
	view.add task-text-filed
	view.add new-task-btn
	view
 
/**
 *
 *@bind new-task
 */
home-view.bind \new-task, !->
	value = @Els.task-text-filed.value.replace(/^\s+/g, "").replace(/\s+$/g, "")
	if value == ""
		alert("不能为空白啊！") 
		return
	@Els.task-text-filed.value = ""
	@Els.task-text-filed.blur!
	#命令模式
	task-data = {
		task-text: value
		created-time: new Date!
	}
	task-model = YTI.Model.task-model
	record = task-model.create-task task-data
	YTI.View.task-view.trigger \show-task, record
	@.update-task-view!

/**
 *@bind go-to-task
 */
home-view.bind \go-to-task, !(id)->
	task-model = YTI.Model.task-model
	record = task-model.get-record-by-id id
	YTI.View.task-view.trigger \show-task, record

#将create-home-view方法暴露出去
module.exports =  home-view