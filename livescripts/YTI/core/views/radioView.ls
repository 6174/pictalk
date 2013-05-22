#资源路径
assets-path = "../../assets/images/"
radio-on-src = assets-path + "radio_on.png"
radio-off-src = assets-path + "radio_off.png"
#alias
TUI = Ti.UI
#configures
default-conf = {
	width: "70px"
	height: "70px"
}

#radio-group
radio-group = {}
create-radio-view = (conf) ->
	container = TUI.create-view default-conf
	container <<< conf || {}

	#add to the radio-group
	class-name = conf["class"] || "default"
	radio-group[class-name] = radio-group[class-name] || []
	radio-group[class-name]["current"] = {value: "-1"}
	radio-group[class-name].push container

	container.state = "off"
	container.selected = false

	image = TUI.create-image-view default-conf
	image.image = radio-off-src
	image <<< {
		top: "0px"
		left: "0px"
	}
	container.add image
	#turn off
	container.off = turn-off = !->
		image.image = radio-off-src
		container.state = "off"
		container.selected = false
	#tun on
	container.on = turn-on = !->
		image.image = radio-off-src
		container.state = "on"
		container.selected = true
	#get radio group
	container.get-group = get-group = ->
		radio-group[class-name]
	#切换switch的状态
	container.toggle = toggle-state = !->
		log \clicked
		src = image.image 
		switch src
		case radio-off-src
			log \turn-on
			#获取当前的radio
			radio-group[class-name].current = container
			image.image = radio-on-src
			container.state = "on"
			container.selected = true
		case radio-on-src
			log \turn-off
			radio-group[class-name].current = {value: -1}
			image.image = radio-off-src
			container.state = "off"
			container.selected = false
		#turn of the other radio in the same group
		for item in radio-group[class-name]
			if item != container
				item.off!


	#添加点击事件
	do
		ev <- container.add-event-listener \click, _
		toggle-state!
	container
module.exports = create-radio-view