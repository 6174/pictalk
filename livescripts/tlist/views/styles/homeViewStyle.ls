/**
 *@info style for HomeView 
 */
require! ["colors"]
module.exports = {
	page: {
		height: "100%"
		width: "100%"
		background-color: colors.light-gray
	}
	#************************************
	#top-bar
	#************************************
	top-bar: {
		top: "0px"
		height: "100px"
		width: "100%"
		background-color: colors.orange
	}
	top-bar-btn: {
		width: "30%"
		height: "100px"
		color: "\#fff"
		font: {font-size: "30px"}
		text-align: TUI.TEXT_ALIGNMENT_CENTER
	}
	recent-task-btn: {
		text: "TODO"
		left: "18%"
	}
	recent-habit-btn: {
		text: "习惯"
		right: "18%"
	}
	#************************************
	#task-list
	#************************************
	task-list-no-record-label:{
		top: "30%"
		font:{font-size: "40px"}
		text: "没有任何记录"
	}
	task-list-view: {
		top: "100px"
		height: "100%"
		width: "100%"
		background-color: colors.bg-white
	}
	task-list-view-container:{
		scroll-type: "vertical"
		width:"100%"
		height: "100%"
		background-color: colors.bg-white
		layout:'vertical'
	}
	list-item-view:{
		height: "160px"
		border-color: "gray"
		border-width: 1
	}
	list-item-label:{
		font:
			font-size: "30px"
	}
	#************************************
	#footer-bar
	#************************************
	footer-bar-view:{
		bottom: "0px"
		height: "120px"
		background-color: colors.baby-blue
	}
	new-task-btn: {
		text: "新建任务"
		color: "white"
		height: "100%"
		width: "20%"
		right: "0px"
		background-color: colors.dark-brown
		font: {font-size: "30px"}
		text-align: TUI.TEXT_ALIGNMENT_CENTER
	}
	task-text-filed:{
		width: "80%"
		right: "20%"
		height: "100%"
		background-color: "\#eee"
	}
}