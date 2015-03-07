/* 
* main.mobile.js
*/

// loader
function loader() {
	'use strict';
	$('#preloader .logo').addClass('animated fadeOut');
	$("#status").addClass('animated fadeOut');
	$("#preloader").delay(900).fadeOut("slow");
	$("body").delay(900).css({overflow:"visible"})
}

// Tabs initial
function tabInit() {
	'use strict';
	$('.content').css('display', 'none');
	var active = $('#drawer').find('a.active');
	var elem = active.attr('href');
	$(elem).css('display', 'block');
}

// Google maps api.
function initialize() {
	'use strict';

	var infowindow = new google.maps.InfoWindow();
	var pointer = { url: '/luveck.com/images/map-pin.png', size: new google.maps.Size(39,56)};
	var marker, i, contentString;

	var locations = [
		['Luveck Medical Corporation', 25.8713186, -80.1997791, 1,'95 NW 105th Ave. Miami, Florida 33172. USA'],	
		['Dromeinter Honduras', 13.80868, -87.2613573, 2, 'Barrio sabanagrande, Tegucigalpa, Honduras.'],
		['Dromeinter Guatemala', 14.6028638, -90.5549395, 3, 'Calle "A" 22-01, Zona, 11 Residenciales San Jorge, Guatemala']	
	]
	
	var mapOptions = {
		zoom: 4,
		center: new google.maps.LatLng(25.8713186, -80.1997791),
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

	$('.sucursales').click(function(event) {
    	event.preventDefault();
    	$('.sucursales').removeClass('active');
    	// elemento.
    	$(this).addClass('active');
    	var sucursal = $(this).attr('data-rel');
    	//
    	var location;
    	//
    	switch(sucursal) {
    		case 'usa':
    			location = new google.maps.LatLng(25.8713186,-80.1997791);
    			break;
    		case 'honduras':
    			location = new google.maps.LatLng(13.80868,-87.2613573);
    			break;
    		case 'guatemala':
    			location = new google.maps.LatLng(14.6028638,-90.5549395);
    			break
    	}
    	map.setCenter(location);
    	map.setZoom(16);
    });
}

$(window).load(loader());

$(document).ready(function() {

	tabInit();

	$('.openTab').click(function(event) {
		event.preventDefault();
		$('.content').css('display', 'none');
		$('.dropdown').removeClass('open');
		$('.tabs a').removeClass('active');
		$(this).toggleClass('active');

		var elementActive = $(this).attr('class');
		var tab = $(this).attr('href');
		if (tab == '#servicioClientes') {
			initialize();
		}
		$(tab).css('display', 'block');
	});

	// Slider Home
	$('.bxslider').bxSlider({
		mode: 'horizontal',
  		captions: true,
  		controls: false
	});

});