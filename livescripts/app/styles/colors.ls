/**
 *@method rgb
 * 将rgb转化为16进制的rgb格式
 */
Color = YTI.Color
rgb = (r, g, b)->
	to-str = Number.prototype.to-string
	str = "\#" 
	str += to-str.call r, 16
	str += to-str.call g, 16
	str += to-str.call b, 16
	str
module.exports = {
	rgb: rgb
	border-gray: "\#eee"
	light-gray: "\#fef"
	bg-white: "\#fff"
	orange: rgb(255, 151, 112)
	babyblue: rgb(212, 250, 253)
	dark-blue: rgb(173, 204, 206)
	deep-dark-blue: rgb(105, 123, 127)
	brown: rgb(162, 128, 119)
	dark-brown: rgb(155, 121, 112)
}