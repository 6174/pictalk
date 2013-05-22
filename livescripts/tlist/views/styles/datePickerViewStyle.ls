/**
 *@Info style for date-picker-view
 */
module.exports = {
	page-style: {
		width: "100%"
		background-color: "white"
		# opacity: "0.5"
		z-index: 101
	}
	date-picker-style: {
		top: "200px"
		type:Ti.UI.PICKER_TYPE_DATE
		minDate:new Date(2009,0,1)
		maxDate:new Date(2018,11,31)
		value:new Date()
	}
	time-picker-view: {
		top: "600px"
		type: TUI.PICKER_TYPE_TIME
	}
	#************************************
	#top-bar
	#************************************
	top-bar: {
		top: "0px"
		height: "100px"
		width: "100%"
		background-color: "\#222"
	}
	top-bar-btn: {
		width: "30%"
		height: "100px"
		color: "\#fff"
		font: {font-size: "30px"}
		text-align: TUI.TEXT_ALIGNMENT_CENTER
	}
	cancel-btn: {
		text: "取消"
		left: "18%"
	}
	ok-btn: {
		text: "确定"
		right: "18%"
	}
}