require! ["/app/styles/colors"]
base-font = {
	font-size: "30px"
}
module.exports = {
	page-view:
		height: "100%"
		width: "100%"
		background-color: colors.light-gray
	edit-pic-view:
		top: "120px"
		bottom: "120px"
		background-color: "\#eefe79"
	pic-container:
		height: "1000px"
		width: "1000px"
		top: "0px"
		left: "0px"
		background-color: "white"
	tool-bar-view:
		bottom: "0px"
		height: "120px"
		border-width: 1
		border-color: "gray"
	submit-btn:
		text: "提交"
		text-align: "center"
		width: "20%"
		height: "100%"
		left: "0px"
		top: "0px"
		color: "white"
		background-color: "\#1133ee"
		font: 
			font-size: "30px"
			font-weight: "bold"
	tools-container:
		width: "80%"
		right: "0px"
		background-color: "white" 
		scroll-type: "horizontal"
	tool-item:
		text-align: "center"
		border-width: 1
		border-color: "gray"
		height: "100%"
		font: 
			font-size: "30px"
		color: "gray"
}