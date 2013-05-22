
util = {}
platform = Ti.Platform.name

#判断是否是iphone平台
util.is-iphone = ->
	platform == 'iPhone OS': true ? false

#判断是否是android平台
util.is-android = ->
	platform == 'android' : true ? false

#平台相应的dp转为px
util.dp2px = (density-pixels) ->
	if  @is-iphone
		return density-pixels
	density-pixels * Ti.platform.display-caps.dpi/160

#log
util.log = !(msg)->
	Ti.API.info msg

#ajax call
util.getJSON = (args) ->
	url = args.url
	data = args.data
	method = args.method
	call-back = args.success || ->
	error-back = args.error || ->
	context = args.context || {}
	xhr = Ti.Network.createHTTPClient!
	xhr.onload = !->
		response-text = @response-text
		try
			data = JSON.parse response-text
			call-back.call context, data
		catch
			alert response-text
	xhr.onerror = !->
		error-back.call context
	xhr.open method, url
	xhr.send data
module.exports = util


