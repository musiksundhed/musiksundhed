/*
* Name: Color Scroll
* Author: Amir R Muntasser
* Description: Change background color CSS property of body as you scroll.
* Dependencies: jQuery 1.4.2+
* License: MIT License
*/

var colors = $("#colorScroll").data("colors");
var colors_array = colors.split(":");
var numcolors = colors_array.length;

var RGBs = [];
for(var i = 0; i < numcolors; i++) {
	RGBs[i] = [];
	var c = colors_array[i].split(",");
	
	RGBs[i][0] = c[0];
	RGBs[i][1] = c[1];
	RGBs[i][2] = c[2];
}

var dRGBs = [];
for(var i = 0; i < (numcolors - 1); i++) {
	dRGBs[i] = [];
	
	dRGBs[i][0] = RGBs[i][0] - RGBs[i+1][0];
	dRGBs[i][1] = RGBs[i][1] - RGBs[i+1][1];
	dRGBs[i][2] = RGBs[i][2] - RGBs[i+1][2];
}

$(window).scroll(function() {
	var position = $(this).scrollTop();
	var view = $(this).height();
	var height = $(document).height();

	var travel = height - view;
	var percent = position / travel;
	var level = Math.floor(percent * (numcolors - 1));
	var plevel = percent * (numcolors - 1);
	
	var dlevel = Math.floor(level);
	if(Math.floor(level) == (numcolors - 1)) {
		dlevel = Math.floor(level) - 1;
	}
	
	if(plevel > 1) {
		plevel = plevel - dlevel;
	}
	
	var nRed = (RGBs[dlevel][0] - Math.round(dRGBs[dlevel][0] * plevel));
	var nGreen = (RGBs[dlevel][1] - Math.round(dRGBs[dlevel][1] * plevel));
	var nBlue = (RGBs[dlevel][2] - Math.round(dRGBs[dlevel][2] * plevel));
	
	$("body").css("background-color", "rgb(" + nRed + "," + nGreen + "," + nBlue + ")");
});
