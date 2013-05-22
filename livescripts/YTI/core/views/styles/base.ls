require! "test"
full-screen = {
	width: "100%"
	heght: "100%"
}

default-style = {
	background-color: "white"
	font:{
		font-color: "black"
		font-size: "30px"
	}
}
default-style <<< full-screen

module.exports = {
	default-style
	full-screen
}
 
