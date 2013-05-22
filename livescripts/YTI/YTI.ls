/**
 *YTI MVC library
 *facade of YTI
 *
 */
Ti.include "core/common/common.js"
require! ["core/common/util/Event", "core/common/util/util"]
require! ["core/common/util/toolkit" ,"core/common/Class"]
require! ["core/View", "core/APP", "core/Controller", "core/Model"]
require! ["core/lib/color", "core/lib/underscore"]
#create class method 
@YTI = Class.create!

#extend with util and Event 
@YTI.extend util
@YTI.extend toolkit
@YTI.extend Event


#add the main part to YTI
@YTI.extend({
	View
	APP
	Controller
	Model
})
@YTI.Color = color
#underscore
@_ = underscore
module.exports = @YTI





