/**
 *@info style for taskView 
 */
require! ["colors"]
module.exports = {
	page: {
		height: "100%"
		width: "100%"
		background-color: colors.bg-white
		background-gradient: {}
		background-image: ""
	}
	common-margin:{
		bottom: "2px"
		top: "2px"
		left: "2px"
		right: "2px"
	}
	common-font:{
		font-size: "30px"
	}
	#******************************
	#task-text-area-view
	#******************************
	task-text-area-view:{
		top: "0px"
		height: "400px"
		width: "100%"
		background-color: colors.bg-white
		layout: "vertical"
	}
	task-text-label:{
		top: "0px"
		bottom: "0px"
		color: colors.deep-dark-blue
		font: {font-size: "30px", font-weight: "bold"}
	}
	#******************************
	#task-info-view
	#******************************
	task-info-view:{
		top: "400px"
		bottom: "120px"
		background-color: colors.brown
		width: "100%"
		layout: "vertical"
	}
	rest-time-view:{
		height: "120px"
		width: "100%"
		border-color: colors.border-gray
		background-color: colors.orange
		border-width: 1
	}
	rest-time-label:{
		text: "已经做了 3小时22分钟14秒"
		color:  "white"
		font: {font-size: "30px"}
	}
	/*****************************
	 * rest-time-tool
	 *****************************/
	rest-time-tool-wrapper-view: {
		height: "100%"
		width: "100%"
		left: "90%"
	}
	rest-time-tool-toggle: {
		left: "0px"
		height: "100%"
		width: "10%"
		background-color: colors.orange
	}
	rest-time-tool-nav-view:{
		left: "10%"
		right: "0px"
		height: "100%"
		scroll-type: "horizontal"
		background-color:  colors.deep-dark-blue
	}
	rest-time-tool-btn: { 
		font:{font-size: "30px"}
		color: colors.deep-dark-blue
		background-color: "white"
		height: "80%"
		text-align: TUI.TEXT_ALIGNMENT_CENTER
	}
	#advices view
	advices-view: {
		height: "280px"
		background-color: colors.babyblue
		width: "100%"
	}
	advices-label: {
		font: {
			font-size: "30px"
			font-weight: "bold"
		}
		width: "90%"
		height: "90%"
		color: "gray"
	}
	#start btn
	start-count-btn: {
		width: "180px"
		height: "180px"
		top: "120px"
		background-color: "white"
		border-width: 14
		border-radius:  180
		border-color: colors.dark-brown
		font: {
			font-size: "30px"
			font-weight: "bold"
		}
		color: colors.orange
		text-align: TUI.TEXT_ALIGNMENT_CENTER
		text: "开始计时"
	}
	#******************************
	#bottom-bar-view
	#******************************
	bottom-bar-view: {
		bottom: "-400px"
		height: "520px"
		width: "100%"
		background-color: colors.brown
	}
	bottom-bar-bar: {
		height: "120px"
		top: "0px"
		background-color: colors.dark-brown
	}
	bottom-bar-tool-nav-view: {
		width: "100%"
		height: "400px"
		top: "120px"
		background-color: "gray"
	}
	nav-btn:{
		height: "100%"
		color: "white"
		font: {font-size: "30px"}
		text-align: TUI.TEXT_ALIGNMENT_CENTER
	}
	#setting tools view
	setting-tools-view: {
		width: "100%"
		height: "400px"
		top: "120px"
		scroll-type: "horizontal"
		background-color: colors.brown
	}
}