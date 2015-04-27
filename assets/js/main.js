(function($){
  'use strict';

  $(window).load(function(){
    $('.site-loader').fadeOut('slow');
  });

  /**
   * Main menu
   */
  $('[data-action=open-menu]').on('click', function(ev){
    ev.preventDefault();

    /*
    $('.main-navigation').addClass('active');
    $('.menu-overlay').addClass('active');

    $('.main-navigation')[0].offsetWidth;
    $('.menu-overlay')[0].offsetWidth;
    */

    $('html').toggleClass('open-menu');
  });

  $(document).on('click', '.menu-overlay', function(ev){
    $('html').toggleClass('open-menu');
  });

  /**
   * Menu handler
   */
  $('.menu:not(.menu-contacts):not(.menu-languages) a').on('click', function(ev){
    ev.preventDefault();

    var $trigger = $(this),
        $target  = $($trigger.attr('href')),
        $targets = $target.siblings(),

        $parent = $trigger.parent('li'),
        $items  = $parent.siblings(),

        $scroller = $target.find('.scroller');

    // if ($parent.hasClass('menu-item-is-open')) {
    //   $parent.removeClass('menu-item-is-open');

    //   return;
    // }

    $targets.removeClass('active animated');

    $target.addClass('active');
    $target[0].offsetWidth;
    $target.addClass('animated');

    $items.removeClass('current-menu-item');
    $items.removeClass('menu-item-is-open');

    $parent.addClass('current-menu-item');

    if ($parent.hasClass('menu-item-has-children')) {
      $parent.addClass('menu-item-is-open');

      var $subitems = $parent.find('.sub-menu a');

      $subitems.removeClass('fadeInLeft');
      $subitems.each(function(){
        this.offsetWidth
        $(this).addClass('fadeInLeft');
      });
    }

    $('html').removeClass('open-menu');

    $scroller.find('.nano').nanoScroller({
      sliderMaxHeight: 11,
      sliderMinHeight: 11
    });

    $(document).trigger('lv.changed_section', [$trigger, $target]);
  });

  $('.menu:not(.menu-contacts):not(.menu-languages):not(.menu-products) li:first-child > a').trigger('click');

  /**
   * Shows the first sub item by default
   */
  $('.item').each(function(){
    $(this).find('.item').first().addClass('active animated');
  });

  /**
   * Main slideshow
   */
  $('.item-home .slider').bxSlider({
    mode: 'vertical',
    infiniteLoop: true,
    controls: false,
    auto: true,
    autoStart: true
  });

  /**
   * Sets images as backgrounds
   */
  $('.item-image:not(.product-images), .product-images div').each(function(){
    var $el  = $(this),
        $img = $el.find('img');

    if (!$img.size()) {
      return;
    }

    $el.css('background-image', 'url(' + $img.attr('src') + ')');
    $img.hide();
  });

  /**
   * Products interaction
   */
  $('body').on('click', '.menu-products a', function(ev){
    var $link  = $(this),
        $menus = $('.menu-products'),
        index  = $link.parent().index();

    $menus.each(function(){
      var $items = $(this).find('li');

      $items.removeClass('current-menu-item');
      $items.eq(index).addClass('current-menu-item');
    });
  });

  /**
   * Contact interactions
   */

  var
    pointer = {url: LUVECK_MAP_MARKER, size: new google.maps.Size(39,56)},

    // Center point
    mapCenter = new google.maps.LatLng(25.8713186, -80.1997791),

    // Map pointers
    mapPoints = new google.maps.LatLngBounds(),

    // Infowindow instance
    mapInfo = new google.maps.InfoWindow(),

    // Map instance
    map = new google.maps.Map(document.getElementById('contact-map'), {
      zoom: 4,
      center: mapCenter,
      panControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false
    });

  // Adding branches pointers
  $('[data-branch]').each(function(){
    var branch = $(this),
        point  = new google.maps.LatLng(branch.data('lat'), branch.data('lng')),
        marker = new google.maps.Marker({
          position: point,
          icon: pointer,
          map: map
        });

    branch.data('marker', marker);

    mapPoints.extend(point);
  });

  // Centering pointers
  map.setCenter(mapPoints.getCenter());

  $('body').on('click', '[data-action=show-branch]', function(ev){
    ev.preventDefault();

    var $trigger = $(this),
        $branch  = $trigger.closest('.branch'),
        data     = $branch.data();

    $branch.siblings().removeClass('active');
    $branch.addClass('active');

    map.setCenter(data.marker.getPosition());
    map.setZoom(16);
  });

  $(document).on('lv.changed_section', function(ev, trigger, target){
    var $trigger = $(trigger),
        $target  = $(target);

    if (!$target.hasClass('item-contact')) {
      return;
    }

    google.maps.event.trigger(map, 'resize');
    map.setCenter(mapPoints.getCenter());
    map.setZoom(4);
  });

  /*
   * Contact form handler
   */
  var $messages = $('.form-feedback');

  $('body').on('submit', '#form-contacto', function(ev){
    ev.preventDefault();

    var $form   = $(this),
      $inputs = $form.find(':input'),
      data    = $form.serialize();

    $inputs.prop('disabled', true);
    $messages.fadeOut().html();

    $.post($form.attr('action'), data, function(response){
      var $text = $('<p />', {
        text: response.message,
        'class': 'feedback ' + response.status
      });

      $messages.html($text).fadeIn();

      $inputs.prop('disabled', false);

      if (response.status == 'success') {
        $form.get(0).reset();
      }
    });
  });

  /**
   * Adds delays to submenus
   */
  $('.sub-menu').each(function(){
    var $menu  = $(this),
        $items = $menu.find('> li a');

    $items
      .addClass('animated fadeInLeft')
      .each(function(i){
        var delay = .2 * i;

        $(this).css('animation-delay', delay + 's');
      });
  });
})(jQuery);
