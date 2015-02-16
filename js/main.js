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
// Initialize Maps
/*function initialize() {
	'use strict';
    var o = {
        url: "images/map-pin.png",
        size: new google.maps.Size(32, 46)
    }, e = {
        zoom: 17,
        center: new google.maps.LatLng(19.438238, - 99.188666),
        disableDefaultUI: !0
    };
    map = new google.maps.Map(document.getElementById("map-canvas"), e);
    var a = new google.maps.Marker({
        map: map,
        icon: o,
        position: map.getCenter()
    }), t = '<div id="content"><h2>Latitud Polanco</h2><ul><li>Av Ejército Nacional</li><li>Granada, Miguel Hidalgo</li><li>11520 Ciudad de México, Distrito Federal, México</li></ul></div>', r = new google.maps.InfoWindow({
        content: t
    });
    google.maps.event.addListener(a, "click", function() {
        r.open(map, a)
    })
}*/
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
$(window).load(calcutaleHeight('.slide'), calcutaleHeight('.slider-menu'), tabInit(), initialize());
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
		$(tab).css('display', 'block');
		/*$(tab).css({
			display: 'block',
			width: '-81%'
		}).animate({
			width: '81%'
		}, 1000);*/
	});

	// Init Google Maps
	//initialize();

});