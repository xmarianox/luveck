<?php

require_once __DIR__ . '/includes/advanced-custom-fields/acf.php';
require_once __DIR__ . '/includes/acf-repeater/acf-repeater.php';

add_action('after_setup_theme', function(){
  // Products
  $labels = array(
    'name'          => __('Productos', 'luveck'),
    'singular_name' => __('Producto', 'luveck'),
    'add_new'       => _x('Añadir producto', 'product', 'luveck'),
    'add_new_item'  => __('Añadir producto', 'luveck')
  );

  register_post_type('product', array(
    'label'       => __('Productos', 'luveck'),
    'labels'      => $labels,
    'public'      => TRUE,
    'has_archive' => TRUE,
    'supports'    => array('title', 'editor', 'thumbnail'),
    'rewrite'     => array(
      'slug'       => 'productos',
      'with_front' => FALSE,
      'feeds'      => FALSE,
      'pages'      => FALSE
    )
  ));

  // Certifications
  $labels = array(
    'name'          => __('Certificaciones', 'luveck'),
    'singular_name' => __('Certificación', 'luveck'),
    'add_new'       => _x('Añadir certificación', 'certification', 'luveck'),
    'add_new_item'  => __('Añadir certificación', 'luveck')
  );

  register_post_type('certification', array(
    'label'       => __('Certificaciones', 'luveck'),
    'labels'      => $labels,
    'public'      => TRUE,
    'has_archive' => TRUE,
    'supports'    => array('title', 'editor', 'thumbnail'),
    'rewrite'     => array(
      'slug'       => 'certificationes',
      'with_front' => FALSE,
      'feeds'      => FALSE,
      'pages'      => FALSE
    )
  ));
});

/**
 * Adding required WP features and needed image sizes
 */
add_action('after_setup_theme', function(){
  // Let WordPress manage the document title.
  add_theme_support('title-tag');

  // Enable support for Post Thumbnails on posts and pages.
  add_theme_support('post-thumbnails');

  // Menus
  add_theme_support('menus');

  register_nav_menus(array(
    'main' => __('Main menu', 'luveck')
  ));

  // Switch default core markup for search form, comment form, and comments
  // to output valid HTML5.
  add_theme_support('html5', array(
    'comment-list', 'comment-form', 'search-form',
    'gallery', 'caption', 'widgets'
  ));
});

/**
 * Enqueue scripts and styles.
 */
add_action('wp_enqueue_scripts', function(){
  // FontAwesome
  $uri = get_template_directory_uri() . '/assets/css/font-awesome.min.css';
  wp_enqueue_style('luveck-fontawesome', $uri, array(), '4.3.0');

  // Animate.css
  $uri = get_template_directory_uri() . '/assets/css/animate.min.css';
  wp_enqueue_style('luveck-animate', $uri, array(), '3.2.3');

  // Main CSS
  $file    = '/assets/css/main.min.css';
  $deps    = array('luveck-fontawesome', 'luveck-animate');
  $version = filemtime(get_template_directory() . $file);

  wp_enqueue_style('luveck-main', get_template_directory_uri() . $file, $deps, $version);

  wp_enqueue_script('google-maps', 'https://maps.googleapis.com/maps/api/js?v=3', array(), '3', FALSE);

  // Modernizer
  $uri = '/assets/js/modernizr.js';
  wp_enqueue_script('luveck-modernizr', get_template_directory_uri() . $uri, array(), '2.8.3', FALSE);

  // jQuery tinycarousel
  $uri = '/assets/js/jquery.tinycarousel.min.js';
  wp_enqueue_script('luveck-tinycarousel', get_template_directory_uri() . $uri, array('jquery'), '2.1.7', TRUE);

  // jQuery scrollTo
  $uri = '/assets/js/jquery.scrollTo.min.js';
  wp_enqueue_script('luveck-scrollto', get_template_directory_uri() . $uri, array('jquery'), '1.4.14', TRUE);

  // jQuery scrollTo
  $uri = '/assets/js/jquery.nanoscroller.min.js';
  wp_enqueue_script('luveck-nanoscroller', get_template_directory_uri() . $uri, array('jquery'), '0.8.4', TRUE);

  // Main JS
  $file    = '/assets/js/main.js';
  $deps    = array('google-maps', 'jquery', 'luveck-tinycarousel', 'luveck-scrollto', 'luveck-nanoscroller');
  $version = filemtime(get_template_directory() . $file);

  wp_enqueue_script('luveck-mainjs', get_template_directory_uri() . $file, $deps, $version, TRUE);
});

/**
 * Change the menu items href to hashes
 */
add_filter('nav_menu_link_attributes', function($atts, $item, $args, $depth){
  $href = '#content-' . $item->object_id;

  if ($depth) {
    $href .= '-' . $depth;
  }

  $atts['href'] = $href;

  return $atts;
}, 10, 4);

/**
 * Registering custom fields
 */
add_action('after_setup_theme', function(){
  register_field_group(array(
    'id'         => 'acf_branches',
    'title'      => __('Sucursales', 'luveck'),
    'fields'     => array(
      array(
        'key'          => 'field_5507e9cecea1e',
        'label'        => __('Sucursal', 'luveck'),
        'name'         => 'luveck_branches',
        'type'         => 'repeater',
        'sub_fields'   => array(
          array(
            'key'           => 'field_5507ea424428a',
            'label'         => __('Nombre', 'luveck'),
            'name'          => 'name',
            'type'          => 'text',
            'required'      => TRUE,
            'column_width'  => '',
            'default_value' => '',
            'placeholder'   => '',
            'prepend'       => '',
            'append'        => '',
            'formatting'    => 'none',
            'maxlength'     => '',
          ),
          array(
            'key'           => 'field_5507e9e5cea1f',
            'label'         => __('Dirección', 'luveck'),
            'name'          => 'address',
            'type'          => 'text',
            'required'      => TRUE,
            'column_width'  => '',
            'default_value' => '',
            'placeholder'   => '',
            'prepend'       => '',
            'append'        => '',
            'formatting'    => 'none',
            'maxlength'     => '',
          ),
          array(
            'key'           => 'field_5507ea10cea20',
            'label'         => __('Teléfono', 'luveck'),
            'name'          => 'phone',
            'type'          => 'text',
            'column_width'  => '',
            'default_value' => '',
            'placeholder'   => '',
            'prepend'       => '',
            'append'        => '',
            'formatting'    => 'none',
            'maxlength'     => '',
          ),
          array(
            'key'           => 'field_5507ea21cea22',
            'label'         => __('Fax', 'luveck'),
            'name'          => 'fax',
            'type'          => 'text',
            'column_width'  => '',
            'default_value' => '',
            'placeholder'   => '',
            'prepend'       => '',
            'append'        => '',
            'formatting'    => 'none',
            'maxlength'     => '',
          ),
          array(
            'key'          => 'field_5507ea97e7b28',
            'label'        => __('Ubicación', 'luveck'),
            'name'         => 'location',
            'type'         => 'google_map',
            'column_width' => '',
            'center_lat'   => '',
            'center_lng'   => '',
            'zoom'         => '',
            'height'       => '',
          ),
        ),
        'row_min'      => 1,
        'row_limit'    => '',
        'layout'       => 'row',
        'button_label' => __('Agregar sucursal', 'luveck'),
      ),
    ),
    'location'   => array(
      array(
        array(
          'param'    => 'page_template',
          'operator' => '==',
          'value'    => 'template-contact.php',
          'order_no' => 0,
          'group_no' => 0,
        ),
      ),
    ),
    'options'    => array(
      'position'       => 'normal',
      'layout'         => 'default',
      'hide_on_screen' => array(),
    ),
    'menu_order' => 0,
  ));
});

/**
 * Returns the image url for the given post ID
 *
 * @param int $post_id
 * @param string $size
 * @return string
 */
function get_content_image($post_id, $size = 'large') {
  return array_shift(wp_get_attachment_image_src(get_post_thumbnail_id($post_id), $size));
}


