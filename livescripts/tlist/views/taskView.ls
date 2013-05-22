/**
 *task-view-ccontroller
 */
require! ["styles/taskViewStyle"]
task-view = YTI.View["taskView"] || YTI.View.create!

#记录所有的孩子view
task-view.Els = {
	task-text-area-view: null
	task-info-view: null
	bottom-bar-view: null
}
#数据
task-view.Data = {
	#当前task的记录
	record: null
	#是否开始计时
	started-count: false
	last-time: null
	t: 0
}
#样式
task-view.Style = task-view-style
task-view.added-to-window = false
/**
 *@private
 */
get-time = (delta)->
	time = {
		hours: Math.floor((delta/(1000*60*60)))
		minutes: Math.floor(((delta / (1000*60)) % 60 ))
		seconds: Math.floor((delta/1000) % 60)
	}
get-date-str = (date)->
	str = ""
	str += date.get-full-year! + "-"
	str += (date.get-month! - 0 + 1) + "-"
	str += date.get-date! + "\n"
	str += date.get-hours! + ":"
	str += date.get-minutes!
	str

/**
 *@method get-task-view
 */
task-view.get-page-view =  ->
	log \create-task-view
	if @Els["pageView"]
		return @Els["pageView"]
	else
		view = @create-task-view!
		view	
/**
 *@create create-task-view
 */	
task-view.create-task-view = ->
	view = @Els["pageView"] = TUI.create-view @Style.page
	view.add @Els["taskTextAreaView"] = @create-task-text-area-view!   
	view.add @Els["taskInfoView"] = @create-task-info-view!
	view.add @Els["bottomBarView"] = @create-bottom-bar-view!
	view
/**
 *@create create-task-text-area-view
 */
task-view.create-task-text-area-view = ->
	log \create-text-area-view
	view = TUI.create-view @Style.task-text-area-view
	#task-text-label
	task-text-label = @Els["taskTextLabel"] = TUI.create-label @Style.task-text-label
	task-text-label.text = "什么都没有！"
	view.add task-text-label
	view
/**
 *@create create-task-info-view
 */
task-view.create-task-info-view =  ->
	log \create-task-info-view
	that = @
	view = TUI.create-view @Style.task-info-view

	/*******************************
	 *task 任务执行时间视图
	 *******************************/
	rest-time-view = TUI.create-view that.Style.rest-time-view
	rest-time-label = @Els["restTimeLabel"] = TUI.create-label that.Style.rest-time-label
	rest-time-label.text = "888"
	rest-time-view.add rest-time-label 
	rest-time-view.add @create-time-tools-nav-view!		
	view.add rest-time-view
	#建议信息
	view.add  @create-task-advices-view!
	/*******************************
	 *count-btn
	 *******************************/
	start-count-btn = @Els["startCountBtn"] = TUI.create-label @Style.start-count-btn
	do
		<-! start-count-btn.add-event-listener \click, _
		that.trigger \start-count
	view.add start-count-btn
	view
	#task 任务离截止时间还有多久
	#task 将在多少时间开始
/**
 *@create create-task-list-view
 */
task-view.create-task-advices-view = ->
	_this = @
	advices-view = TUI.create-view @.Style.advices-view
	advices-label = TUI.create-label @.Style.advices-label
	advices-label.text = "建议: \n 1：haha！ \n 2: hehe! \n 3: 好了！"
	# advices-view.add advices-label
	create-item = (img-src, attrs, ev)->
		# chenxuejia
		item-container = TUI.create-view({
			height: "120px"
			width: "50%"
			background-color: "white"
			})
		item-container <<< attrs
		item-img =  TUI.create-view({
			background-image: "/assets/#{img-src}"
			height: "100%"
			width: "120px"
			top: "0px"
			left: "0px"
		})
		do
			<-! item-img.add-event-listener \click
			_this.trigger ev
		item-container.add item-img
		item-content = TUI.create-view({
			height: "100%"
			left: "120px"
			top: "0px"
			right: "0px"
			})
		item-label = TUI.create-label({
			font:{font-size: "30px"}
			color: "gray"
			text: "2011-11-13 14:23"
			})
		item-content.add item-label
		item-container.add item-content
		item-container.set-content = !(str)->
			item-label.text = str
		item-container

	advices-view.add @Els.start-time-view = create-item("tool1.png", {left:"0px", top: "20px"}, "set-start-time")
	advices-view.add @Els.end-time-view = create-item("tool2.png", {left: "50%", top: "20px"}, "set-finish-time")
	advices-view.add @Els.dead-line-view = create-item("tool3.png", {left: "0px", top: "140px"}, "set-dead-line")
	advices-view.add @Els.last-time-view = create-item("tool4.png", {left: "50%", top: "140px"}, "set-last-time")

	advices-view
/**
 *@create create times-tool-nav-view
 */
task-view.create-time-tools-nav-view = ->
	_this = @
	wrapper-view = TUI.create-view @Style.rest-time-tool-wrapper-view

	tool-nav-view = TUI.create-scroll-view @Style.rest-time-tool-nav-view
	toggle = TUI.create-view @Style.rest-time-tool-toggle

	wrapper-view.add toggle
	wrapper-view.add tool-nav-view
	#一些调整时间的小工具
	tools = [ 
	{ title: "重置", name: "resetTimeBtn", ev: "resetTime"}
	{ title: "减少", name: "minusTimeBtn", ev: "minusTime"}
	{ title: "减5分钟", name: "minusFiveBtn", ev: "minusFiveTime"}
	{ title: "减10分钟", name: "minusTenBtn", ev: "minusTenTime"}
	{ title: "减30分钟", name: "minusThirtyBtn" ev: "minusThiryTime"}
	]
	pos-x = 30
	width = 160
	margin-x = 20
	for it in tools
		tool-btn = TUI.create-label @Style.rest-time-tool-btn
		tool-btn <<< {
			left: "#{pos-x}"
			width: width
			text: it.title
		}
		closure = !(btn, item) ->
			do
				<-! btn.add-event-listener \click, _
				log \clicked + item.title
				_this.trigger item.ev
		closure tool-btn, it	 
		pos-x += width + margin-x
		tool-nav-view.add tool-btn
	#添加点击事件监听， 显示或者隐藏 tool-nav
	wrapper-view.toggle = "off"
	do 
		<-! toggle.add-event-listener \click, _
		animation = TUI.create-animation!
		animation.duration = 300;
		if wrapper-view.toggle == "off"
			wrapper-view.toggle = "on"
			animation.left = "0%"
			wrapper-view.animate animation
		else
			wrapper-view.toggle = "off" 
			animation.left = "90%"
			wrapper-view.animate animation
	wrapper-view
/**
 *@create create bottom-bar-view
 */
task-view.create-bottom-bar-view = ->
	log \create-bottom-bar-view
	that = @
	# inspect2 that
	# 底栏的包装view
	view = TUI.create-view @Style.bottom-bar-view
	# 底栏工具条
	bar-view = TUI.create-view @Style.bottom-bar-bar
	# 底栏隐藏工具包装器
	tool-nav-view = TUI.create-view @Style.bottom-bar-tool-nav-view
	view.add bar-view
	view.add tool-nav-view
	/**********************************
	 *create bottom bar view elements
	 **********************************/
	do !->
		pos-x = 0
		width = 140

		#返回按钮
		back-btn = that.Els.back-btn = TUI.create-label that.Style.nav-btn
		back-btn <<< {
			text: "返回"
			left: "#{pos-x}px"
			width: "#{width}px"
		}
		bar-view.add back-btn	
		do
			<-! back-btn.add-event-listener \click, _
			that.trigger \go-to-home



		#编辑按钮
		pos-x += width 
		edit-btn = that.Els.detail-btn = TUI.create-label that.Style.nav-btn
		edit-btn <<< {
			text: "编辑"
			left: "#{pos-x}px"
			width: "#{width}px"
		}
		bar-view.add edit-btn
		do
			<-!  edit-btn.add-event-listener \click, _
			that.trigger \edit-task


		#详情按钮
		pos-x += width 
		detail-btn = that.Els.edit-btn = TUI.create-label that.Style.nav-btn
		detail-btn <<< {
			text: "详情"
			left: "#{pos-x}px"
			width: "#{width}px"
		}
		bar-view.add detail-btn
		do
			<-! detail-btn.add-event-listener \click, _
			that.trigger \task-detail
		


		#删除按钮
		pos-x += width
		delete-btn = that.Els.delete-btn = TUI.create-label that.Style.nav-btn
		delete-btn <<< {
			text: "删除"
			left: "#{pos-x}px"
			width: "#{width}px"
		}
		bar-view.add delete-btn
		do
			<-! delete-btn.add-event-listener \click, _
			that.trigger \delete-task



		#显示工具按钮
		toggle-btn = TUI.create-label that.Style.nav-btn
		toggle-btn <<< {
			text: "设置"
			right: "0px"
		}
		toggle-btn.width = 	width
		toggle-btn.toggle = "off"
		do
			<-! toggle-btn.add-event-listener \click, _
			animation = TUI.create-animation!
			animation.duration = 300
			if  @toggle == "off"
				@toggle = "on"
				animation.bottom = "0px"
				view.animate animation
			else
				@toggle = "off"
				animation.bottom = "-400px"
				view.animate animation 
			# view.animate animation
		bar-view.add toggle-btn 
	/**********************************
	 *add tools elements to tool-nav-view	
	 **********************************/
	view.add @create-setting-tools-view!	
	view
/**
 *@create setting tools-view
 */
task-view.create-setting-tools-view = ->
	_this = @
	container = TUI.create-scroll-view @Style.setting-tools-view
	tools = [
	{title: "开始时间", ev: "set-start-time"}
	{title: "结束时间", ev: "set-finish-time"}
	{title: "完成时间", ev: "set-dead-line"}
	{title: "持续时间", ev: "set-last-time"}
	{title: "重复", ev: "set-repeatment"}
	{title: "分类", ev: "set-class"}
	{title: "重要性", ev: "set-importance"}
	{title: "提醒", ev: "set-remind-time"}
	]
	pos-x = 40
	pos-y = 40
	margin-x = 150
	margin-y = 100
	width = 240
	height = 120
	for it in tools
		info = "#{pos-x}, #{pos-y}"
		view = TUI.create-button({
			top: "#{pos-y}px"
			left: "#{pos-x}px"
			width: "#{width}px"
			height: "#{height}px"
			title: it.title
			})
		closure = !(btn, item)->
			do
				<- btn.add-event-listener \click, _
				log \clicked + item.title + item.ev 
				_this.trigger item.ev
		closure view, it
		if pos-y > 40
			pos-y = 40
			pos-x += width + margin-x
		else
			pos-y += height + margin-y	
		container.add view
	container

/**
 *@render render 
 */
task-view.render-by-record = (record) ->
	@Els.task-text-label.text = record.data.content
	#如果上次已经开始计时， 不过意外结束
	#这里会接着开始计时
	if record.data.last-time != 0
		time = get-time record.data.last-time
		@.Els["restTimeLabel"].text = "#{time.hours}小时 #{time.minutes}分钟 #{time.seconds}秒"
	else
		@.Els["restTimeLabel"].text = "任务艰巨， 赶紧完成啊少年！"
	@render-advices-view record
	if record.meta.started
		@trigger \start-count

/**
 *@render render the time rules
 */
task-view.render-advices-view = !(record) ->
	start-time = get-date-str new Date record.rules.start-time
	end-time = get-date-str new Date record.rules.end-time
	dead-line = get-date-str new Date record.rules.dead-line
	@Els.start-time-view.set-content start-time
	@Els.end-time-view.set-content end-time
	@Els.dead-line-view.set-content dead-line


/************************************************
 *event handlers binding
 ************************************************/
/**
 *@bind show-task
 */
task-view.bind \show-task, (record)->
	page-view = @get-page-view!
	#判断task-view是否已经添加到了main-window里边去了
	if !@added-to-window
		@added-to-window = true
		YTI.APP.main-window.add page-view
	#hide other page-views
	page-view.show!
	@record = record
	@Data = {}
	@render-by-record record

/**
 *@bind delete-task
 */
task-view.bind \delete-task, !->
	id = @record.id
	task-model = YTI.Model.task-model
	home-view = YTI.View.home-view
	task-model.delete-record-by-id id
	home-view.update-task-view!
	@trigger \go-to-home
	# alert \删除成功
/*
 *@bind start-count 开始计时
 */
task-view.bind \start-count, !->
	log "start-count"
	_this = @
	Data = @.Data
	task-model = YTI.Model.task-model
	start-count = !->
		started-time = _this.Data.started-time
		#获得时间差
		delta = _this.record.data.last-time + (new Date() - started-time) #
		time = get-time delta
		_this.Els["restTimeLabel"].text = "#{time.hours}小时 #{time.minutes}分钟 #{time.seconds}秒"
	# _this.Els.rest-time-label.text = "it is changed"
	if !_this.Data.started-count || _this.Data.started-count == false
		_this.Data.started-count = true

		#如果是意外结束的， 那么开始时间从上次意外结束位置开始计时
		if _this.record.meta.started 
			_this.Data.started-time = _this.record.meta.started-time
		else
			_this.Data.started-time = new Date() - 0
		
		#将开始计时时间保存到record的meta数据当中
		#如果出现意外关闭， 那么可以重meta数据当中获取信息
		_this.record.meta.started = true
		_this.record.meta.started-time = _this.Data.started-time 
		task-model.save!

		_this.Els["startCountBtn"].text = "停止计时"
		_this.Data.t = set-interval(start-count, 1000)
	else
		_this.Data.started-count = false
		end-time = new Date() - 0
		start-time = _this.Data.started-time - 0
		
		_this.Els["startCountBtn"].text = "开始计时"
		
		#保存结束时间， 将记录保存到record的track当中
		#并且改变meta信息
		_this.record.meta.started = false
		_this.record.meta.update-time = end-time
		_this.record.tracks.push [start-time, end-time]
		_this.record.data.last-time +=  end-time - start-time
		task-model.save!

		clear-timeout _this.Data.t	

/**
 *@bind go-to-home 返回到主界面
 */
task-view.bind \go-to-home, ->
	YTI.View.home-view.get-page-view!.show!
	if @Data.started-count == true
		@trigger \start-count
	@Els.page-view.hide! 
task-view.bind \task-detail, ->
	alert \task-detal
task-view.bind \resetTime, !->
	alert \reset-time-clicked
	@trigger \set-finish-time	


/**
 *@bind 设置开始时间
 */
task-view.bind \set-start-time, !->
	#开始时间
	_this = @
	YTI.View.date-picker-view.get-date @, (date)->
		_this.record.rules.start-time = date 
		YTI.Model.task-model.save!
		_this.render-advices-view _this.record
/**
 *@bind 设置完成时间
 */
task-view.bind \set-finish-time, !->
	# log \set-finish-time
	_this = @
	YTI.View.date-picker-view.get-date @, !(date)->
		log \I-am-call-back-and-I-was-called 
		_this.record.rules.end-time = date 
		YTI.Model.task-model.save!
		_this.render-advices-view _this.record
/**
 *@bind 设置dead-line
 */
task-view.bind \set-dead-line, !->
	_this = @
	YTI.View.date-picker-view.get-date @, (date)->
		_this.record.rules.dead-line = date 
		YTI.Model.task-model.save!
		_this.render-advices-view _this.record


module.exports = task-view
# var animation = Titanium.UI.createAnimation();
# animation.backgroundColor = 'black';
# animation.duration = 1000;
# var animationHandler = function() {
#   animation.removeEventListener('complete',animationHandler);
#   animation.backgroundColor = 'orange';
#   view.animate(animation);
# };
# animation.addEventListener('complete',animationHandler);
# view.animate(animation);


