// Dinamic Height
function calcutaleHeight(element) {
	'use strict';
	var windowHeight = $(window).height();
	var finalHeight = windowHeight;
	$(element).height(finalHeight);
}

// Load
$(window).load(calcutaleHeight('.slide'));

$(document).ready(function() {
	console.log("Hoy vine a flashar ser pobre!");
	// Resize
	$(window).resize(calcutaleHeight('.slide'));

});