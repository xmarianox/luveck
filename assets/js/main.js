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

function loader() {
	$('#preloader .logo').addClass('animated fadeOut');
	$("#status").addClass('animated fadeOut');
	$("#preloader").delay(900).fadeOut("slow");
	$("body").delay(900).css({overflow:"visible"})
}

// Load
$(window).load(
	loader(), 
	tabInit(),
	calcutaleHeight('.nano, .list-cert, .list-prod, .list-info')
);

// Ready
$(document).ready(function() {
	'use strict';

	// Resize
	$(window).resize(calcutaleHeight('.nano, .list-cert, .list-prod, list-info'));

	/*
	*	Custom tabs
	*/
	$('.openTab').click(function(event) {
		event.preventDefault();
		$('.content').css('display', 'none');
		//$('.content').removeClass('animate fadeInRightBig');
		$('.dropdown').removeClass('open');
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

	$('.openDrop').click(function(event) {
		event.preventDefault();
		var element = $(this).attr('data-rel');
		$(element).toggleClass('open');
	});

	$('#drop-prod a').click(function(event) {
		event.preventDefault();
		$('.content-prod').removeClass('active');
		$('.list-prod a').removeClass('currentProd');

		var prod = $(this).attr('href');
		$(prod).addClass('active');
		var lista = $('.list-prod');

		var currentItem = lista.find('a[href='+ prod +']');
		currentItem.addClass('currentProd');
		
		lista.scrollTo(currentItem, 1000);
	});

	$('.presentaciones a').click(function(event) {
		event.preventDefault();
		$('.content-prod').removeClass('active');
		$('.list-prod a').removeClass('currentProd');

		var prod = $(this).attr('href');
		$(prod).addClass('active');
		var lista = $('.list-prod');

		var currentItem = lista.find('a[href='+ prod +']');
		currentItem.addClass('currentProd');
		
		lista.scrollTo(currentItem, 1000);
	});

	/*
	*	Scripts HOME
	*/
	$('#sliderHome').tinycarousel({
        axis: "y",
        animationTime: 800,
        infinite: false,
    });

    var slideMarkers = $('.goToSlide');
    var sliderHome = $('#sliderHome').data('plugin_tinycarousel');
    var activeSlide = sliderHome.slideCurrent;
    // Goto Slide
    $('.goToSlide').click(function(event) {
    	event.preventDefault();
    	$('.goToSlide').removeClass('currentSlide');

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

    	$(this).addClass('currentSlide');

    	return null;
    });

    /*
    *	Scripts Sobre luveck
    */
    $('#drop-sobre a').click(function(event) {
		event.preventDefault();
		$('#drop-sobre a').removeClass('active');
		$('.bullet').removeClass('active');
		var element = $(this).attr('href');
		$(this).addClass('active');
		var lista = $('.list-info');
		var bulletsList = $('.bullets');
		var currentBullet = bulletsList.find('a[href='+ element +']');
		currentBullet.addClass('active');
		lista.scrollTo(element, 1000);
	});

	$('.bullets a').click(function(event) {
		event.preventDefault();

		$('.bullet').removeClass('active');
		var element = $(this).attr('href');
		$(this).addClass('active');
		var lista = $('.list-info');
		lista.scrollTo(element, 1000);		
	});

    // Scrollbar
    $(".nano").nanoScroller();
    /*
	*	Scripts Productos
    */
    $('.list-prod a').click(function(event) {
    	event.preventDefault();
    	$('.content-prod').removeClass('active');
    	$('.list-prod a').removeClass('currentProd');
    	var producto = $(this).attr('href');
    	$(this).addClass('currentProd')
    	$(producto).addClass('active');
    });

    $('.arrow-prod').click(function(event) {
    	event.preventDefault();
    	$('.list-prod').scrollTo('#selector_soprapen', 1000);
    });

    /*
	*	Scripts Certificados
    */
    $('.list-cert a').click(function(event) {
    	event.preventDefault();
    	$('.content-cert').removeClass('active');
    	$('.list-cert a').removeClass('currentCert');
    	var certificacion = $(this).attr('href');
    	$(this).addClass('currentCert')
    	$(certificacion).addClass('active');
    });

    $('.arrow-cert').click(function(event) {
    	event.preventDefault();
    	$('.list-cert').scrollTo('#selector_iso', 1000);
    });

});