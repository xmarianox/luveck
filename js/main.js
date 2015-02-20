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

// Google maps api.
function initialize() {

	var infowindow = new google.maps.InfoWindow();
	var pointer = { url: 'images/map-pin.png', size: new google.maps.Size(39,56)};
	var marker, i, contentString;

	var locations = [
		['Piso SERT', 41.3893712, 2.1764497, 1,'Pasaje Sert, 10, 1º-1º'],	
		['Piso PALAU ', 41.3889191, 2.1774804, 2, 'Calle St Pere Més Alt, 55, 1º-2º'],
		['Piso PASAJE ', 41.389092, 2.176867, 3, 'Passatge Sert, 6, 1º']	
	]
	
	var mapOptions = {
		zoom: 18,
		center: new google.maps.LatLng(41.3893712, 2.1764497),
		disableDefaultUI: true
	}

	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	for (i = 0; i < locations.length; i++) {
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(locations[i][1], locations[i][2]),
			icon: pointer,
			map: map
		});

		google.maps.event.addListener(marker, 'click', (function(marker, i) {
			return function() {
				infowindow.setContent('<div class="content-string"><h2>'+ locations[i][0] +'</h2><p>' + locations[i][4]+ '</p></div>');
				infowindow.open(map, marker);
			}
		})(marker, i));
	}
}

// Load
$(window).load(tabInit());

// Ready
$(document).ready(function() {
	'use strict';

	// Resize
	//$(window).resize(calcutaleHeight('.aside'), calcutaleHeight('#sliderSobreLuveck .col-49'));
	calcutaleHeight('.nano');
	$(window).resize(calcutaleHeight('.nano'));

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

    // Slider sobre luveck
    $('#sliderSobreLuveck').tinycarousel({
        axis: "y",
        bullets: true
    });

    // Scrollbar
    $(".nano").nanoScroller();

});