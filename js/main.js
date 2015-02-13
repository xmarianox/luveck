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

	// Tabs initial
	(function(){
		$('.content').css('display', 'none');
		var active = $('.tabs').find('a.active');
		var elem = active.attr('href');
		$(elem).css('display', 'block');		
	})();
	
	// Custom tabs
	$('.tabs a').click(function(event) {
		event.preventDefault();
		$('.content').css('display', 'none');
		$('.content').removeClass('animate fadeInRightBig');
		
		$('.tabs a').removeClass('active');
		$(this).toggleClass('active');

		var elementActive = $(this).attr('class');
		var tab = $(this).attr('href');

		//console.log($(this)[0], elementActive);
		//$(tab).addClass('animate fadeInRightBig')
		$(tab).css({
			display: 'block',
			width: '-81%'
		}).animate({
			width: '81%'
		}, 1000);
	});


});