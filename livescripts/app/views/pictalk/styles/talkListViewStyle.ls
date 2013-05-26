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
		bottom: "120px"
		width: '100%'
		scroll-type: "vertical"
		background-color: "gray"
	talk-item-view:
		height: "400px"
		left: "20px"
		right: "20px"
		border-width: 1
		border-color: "gray"
	#card info bar
	card-user-info-bar:
		height: "60px"
		width: "100%"
		background-color: "\#123412"
	card-info-bar-date:
		right: "20px"
		font: base-font
		color: "gray"
	pic-card-view:
		height: "340px"
		background-color: "white"
}