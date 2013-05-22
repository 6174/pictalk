/**
 *Controller 类
 *
 *负责view的事件驱动， model的更改， 以及view的渲染
 */
require! ["common/Class", "common/util/Event"]
Controller = Class.create!
Controller.extend Event

Controller.extend {
	EL: null #container
	els: [] #elements in EL
	events: null # el-func_name groups
}
module.exports = Controller