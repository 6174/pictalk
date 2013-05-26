require! ["/app/styles/colors"]
base-font = {
	font-size: "30px"
}
module.exports = {
	page-view:
		height: "100%"
		width: "100%"
		background-color: "yellow"
		# background-color: colors.light-gray
	#scroll-container	
	scroll-container-view:
		top: "120px"
		bottom: "0px"
		width: '100%'
		scroll-type: "vertical"
		background-color: "gray"
	talk-item-view:
		height: "600px"
		left: "20px"
		right: "20px"
		border-width: 1
		border-color: "gray"
	#card info bar
	card-user-info-bar:
		top: "0px"
		height: "120px"
		width: "100%"
		background-color: "white"
	card-info-bar-date:
		right: "20px"
		font: base-font
		color: "gray"
	pic-card-view:
		top: "120px"
		height: "400px"
		background-color: "\#121212"
	pic-card-footer:
		top: "520px"
		height: "80px"
	#reply button
	reply-button:
		title: "回复"
		font: 
			font-size: "40px"
			font-weight: "bold"
		bottom: "0px"
}