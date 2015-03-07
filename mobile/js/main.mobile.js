/* 
* main.mobile.js
*/

// loader
function loader() {
	$('#preloader .logo').addClass('animated fadeOut');
	$("#status").addClass('animated fadeOut');
	$("#preloader").delay(900).fadeOut("slow");
	$("body").delay(900).css({overflow:"visible"})
}

$(window).load(loader());

$(document).ready(function() {

	// Slider Home
	$('.bxslider').bxSlider({
		mode: 'horizontal',
  		captions: true,
  		controls: false
	});


});