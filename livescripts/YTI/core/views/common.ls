Ti-view-proto = Ti.UI.View.prototype
extend-methods = {
	$add: !(view, attrs) ->
		if typeof attrs == "object"
			view <<< attrs
		view.parent = @
		@add view

	#通过id广度遍历孩子节点找到相应的后代view
	#@return---{object-Ti.UI.View || null}
	$find-by-id: (id) ->
		children = @get-children!
		len = children.length
		if len == 0
			return
		queue = []
		queue.push children[0]
		while queue.length > 0
			c_view = queue.shift 
			if id == c_view.id
				return c_view
			_children = c_view.get-children!
			queue.concat _children
		null

	#通过class name 找到后辈节点
	#@return--{array}
	$find-by-class-name: (class-name) ->
		ret = []
		children = @get-children!
		len = children.length
		if len == 0
			return
		queue = []
		queue.push children[0]
		while queue.length > 0
			c_view = queue.shift 
			class-arr = c_view.class.split(/\s+/)
			if  class-arr.indexOf class-name > -1
				ret.push c_view
			_children = c_view.get-children!
			queue.concat _children
		return ret

	#通过id删除一个元素
	$remove-by-id: (id)->
		_view = @find-by-id$(id)
		if _view != null
			@.remove _view.parent

	#test
	$test: ->
		Ti.API.info("extended method test")
}
Ti-view-proto <<< extend-methods