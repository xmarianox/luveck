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

// Initialize Google Maps
function initialize() {
	'use strict';
	var mapOptions = {
	  center: new google.maps.LatLng(-34.397, 150.644),
	  zoom: 8,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("map-canvas"),
	    mapOptions);
}

// Load
$(window).load(calcutaleHeight('aside'), calcutaleHeight('.content'), tabInit());

// Ready
$(document).ready(function() {
	'use strict';

	// Resize
	$(window).resize(calcutaleHeight('.aside'), calcutaleHeight('.content'));

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
		if (tab == '#servicioClientes') {
			initialize();
		}
		$(tab).css('display', 'block');
	});


	// Slider home
	$('#sliderHome').tinycarousel({
        axis: "y"
    });

    var sliderHome = $('#sliderHome').data('plugin_tinycarousel');

    $('.goToSlide').click(function(event) {
    	event.preventDefault();

    	var slide = $(this).attr('href');

    	switch(slide) {
    		case "slide-1":
    			sliderHome.move(0);
    			break;
    		case "slide-2":
    			sliderHome.move(1);
    			break;
    		case "slide-3":
    			sliderHome.move(2);
    			break;
    	}
    	return null;
    });

});