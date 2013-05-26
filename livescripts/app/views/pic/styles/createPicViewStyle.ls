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
	tool-bar-view:
		bottom: "0px"
		height: "120px"
		border-width: 1
		border-color: "gray"
	submit-btn:
		text: "提交"
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
}