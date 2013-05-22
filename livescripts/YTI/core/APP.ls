/**
 *APP
 *App 包含应用的当前状态情况， window级别应用事件驱动， 以及配置文件
 *
 */
Ti.include "common/common.js"
require! ["common/Class", "common/util/Event"]
require! ["../Test"]
APP = Class.create!

#赋予APP事件驱动
APP.extend Event

#APP放置应用的配置， 状态， 数据
APP.extend({
	config: null
	status: null
	data: null
})

APP.open = (page_name, animation) ->
	#find the controller of the page
	#find the view of the page
	#find the layout of the page
	#current window add the page
module.exports = APP
