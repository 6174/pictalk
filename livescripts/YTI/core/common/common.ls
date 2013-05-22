/**
 *common method of the whole app
 *any module can use these alias and methods
 */
#alias
@TUI = Ti.UI
@TFS = Ti.Filesystem
@log = !(info) ->
	Ti.API.info info

@inspect2 = (obj) ->
	hasown = {}.has-own-property
	log \------------inspect2---------------
	for attr of obj
		if hasown.call obj, attr
			log attr
		else
			log "proto-#{attr}"
	log \-----------------------------------
# @inspect = (obj)-> 
# 	str = JSON.stringify obj
# 	split-line-start = "\n*********inspect*********\n"
# 	split-line = "\n******************\n" 
# 	Ti.API.info split-line-start + str + split-line 
@inspect = (obj, tabSize) -> 
	tabs = tabSize || 0
	str = ""
	tab-str = ""
	tab = "  "
	tostr = {}.to-string
	hasown = {}.has-own-property
	stringify = JSON.stringify
	i = tabs
	#
	type = tostr.call obj
	if type == "[object Function]"
		Ti.API.info "Function\n"
		return
	if (type != "[object Array]")  &&  (type != "[object Object]")
		Ti.API.info stringify obj
		return
	#generate tabs
	while i--
		tab-str += tab
	#inspect attrs
	for attr of obj
		if  hasown.call obj, attr 
			val = obj[attr]
			type = tostr.call obj[attr]
			switch type
			case "[object Object]"
				str = tab-str + attr + ":\n"
				Ti.API.info str 
				@inspect val, tabs + 1
				break
			case "[object Array]"
				str = tab-str + attr + ": Array(\n"
				Ti.API.info str
				@inspect val, tabs + 1
				Ti.API.info tab-str + " )\n"
				break
			case "[object Function]"
				str = tab-str + attr + ": "
				str += "[Function]"
				Ti.API.info str
			default
				str = tab-str + attr + ": "
				str += val
				Ti.API.info str