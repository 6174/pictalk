
#YTI app的目录结构是固定的
#--app
#	---resources
#	---common
#	---conf
#
#	---module
#	---controllers
#	---views

#YTI项目的配置信息设置
CONFIG = {
	#项目名字， 相对于YTI所在的目录
	APP_NAME: "app"
}

#设置app-name， 并获取app配置文件放入CONFIG中
set-app-name = !(name)->
	if typeof name == "undefined"
		return false
	conf-path = "/#{name}/conf/configure.js"
	require! conf-path
	CONFIG <<< configure
	CONFIG.APP_NAME = name 

#设置项目信息
set = (name, value)->
	CONFIG[name] = value

#获得配置信息
get = (name) ->
	if name in CONFIG
		return CONFIG[name]
	null

module.exports <<< {
	set-app-name
	set
	get
}


