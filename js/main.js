// Dinamic Height
function calcutaleHeight(element) {
	'use strict';
	var windowHeight = $(window).height();
	var finalHeight = windowHeight;
	$(element).height(finalHeight);
}
// Tabs initial
function tabInit() {
	'use strict';
	$('.content').css('display', 'none');
	var active = $('.tabs').find('a.active');
	var elem = active.attr('href');
	$(elem).css('display', 'block');
}
// Load
$(window).load(calcutaleHeight('.slide'), calcutaleHeight('.slider-menu'), tabInit());
// Ready
$(document).ready(function() {
	'use strict';

	console.log("Hoy vine a flashar ser pobre!");
	// Resize
	$(window).resize(calcutaleHeight('.slide'), calcutaleHeight('.slider-menu'));

	// anchor navigation
	$('a[href*=#]:not([href=#])').click(function() {
	  if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') || location.hostname === this.hostname) {
	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	      if (target.length) {
	          $('html,body').animate({ scrollTop: target.offset().top }, 1000);
	          return false;
	      }
	  }
	});
	
	// Custom tabs
	$('.tabs a').click(function(event) {
		event.preventDefault();
		$('.content').css('display', 'none');
		//$('.content').removeClass('animate fadeInRightBig');
		
		$('.tabs a').removeClass('active');
		$(this).toggleClass('active');

		var elementActive = $(this).attr('class');
		var tab = $(this).attr('href');
		//$(tab).addClass('animate fadeInRightBig')
		$(tab).css({
			display: 'block',
			width: '-81%'
		}).animate({
			width: '81%'
		}, 1000);
	});


});