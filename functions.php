<?php

// We don't need the ACF UI
define('ACF_LITE', TRUE);

// Default country code
define('LUVECK_DEFAULT_COUNTRY', 'HN');

/**
 * Register needed post types
 */
add_action('after_setup_theme', function(){
  // Products
  $labels = array(
    'name'           => _x('Products', 'post type general name', 'luveck'),
    'singular_name'  => _x('Product', 'post type singular name', 'luveck'),
    'name_admin_bar' => _x('Products', 'add new on admin bar', 'luveck'),
    'add_new'        => _x('Add product', 'product', 'luveck'),
    'add_new_item'   => __('Add product', 'luveck')
  );

  register_post_type('product', array(
    'label'       => __('Products', 'luveck'),
    'labels'      => $labels,
    'public'      => TRUE,
    'has_archive' => TRUE,
    'supports'    => array('title', 'editor', 'thumbnail', 'page-attributes'),
    'rewrite'     => array(
      'slug'       => 'productos',
      'with_front' => FALSE,
      'feeds'      => FALSE,
      'pages'      => FALSE
    )
  ));

  register_taxonomy('product_category', 'product', array(
    'hierarchical' => TRUE
  ));

  // Certifications
  $labels = array(
    'name'           => _x('Certificates', 'post type general name', 'luveck'),
    'singular_name'  => _x('Certification', 'post type singular name', 'luveck'),
    'name_admin_bar' => _x('Certificates', 'add new on admin bar', 'luveck'),
    'add_new'        => _x('Add certification', 'product', 'luveck'),
    'add_new_item'   => __('Add certification', 'luveck')
  );

  register_post_type('certification', array(
    'label'       => __('Certificates', 'luveck'),
    'labels'      => $labels,
    'public'      => TRUE,
    'has_archive' => TRUE,
    'supports'    => array('title', 'editor', 'thumbnail', 'page-attributes'),
    'rewrite'     => array(
      'slug'       => 'certificationes',
      'with_front' => FALSE,
      'feeds'      => FALSE,
      'pages'      => FALSE
    )
  ));

  // Contact
  $labels = array(
    'name'          => _x('Contact', 'post type general name', 'luveck'),
    'singular_name' => _x('Contact', 'post type singular name', 'luveck')
  );

  register_post_type('contact', array(
    'label'    => __('Contact', 'luveck'),
    'labels'   => $labels,
    'public'   => FALSE,
    'show_ui'  => TRUE,
    'supports' => array('title', 'editor', 'thumbnail')
  ));
});

/**
 * Adding required WP features and needed image sizes
 */
add_action('after_setup_theme', function(){
  // Make the theme available for translation.
  load_theme_textdomain('luveck', get_template_directory() . '/languages');

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
  // Google deps
  wp_enqueue_style('google-roboto', 'https://fonts.googleapis.com/css?family=Roboto:400,500,300,700', array(), NULL);
  wp_enqueue_script('google-maps', 'https://maps.googleapis.com/maps/api/js?v=3', array(), '3', FALSE);

  // FontAwesome
  $uri = get_template_directory_uri() . '/assets/css/font-awesome.min.css';
  wp_enqueue_style('luveck-fontawesome', $uri, array(), '4.3.0');

  // Animate.css
  $uri = get_template_directory_uri() . '/assets/css/animate.min.css';
  wp_enqueue_style('luveck-animate', $uri, array(), '3.2.3');

  // Modernizer
  $uri = '/assets/js/modernizr.js';
  wp_enqueue_script('luveck-modernizr', get_template_directory_uri() . $uri, array(), '2.8.3', FALSE);

  // Shitty hack
  if (get_page_template() === realpath(__DIR__ . '/template-mobile.php')) :
    $css = array(
      array(
        'name' => 'luveck-bxslider',
        'file' => '/assets/css/jquery.bxslider.min.css',
        'deps' => array(),
        'ver'  => '4.1.2'
      ),
      array(
        'name' => 'luveck-main-mobile',
        'file' => '/assets/css/main.mobile.css',
        'deps' => array('luveck-fontawesome', 'luveck-animate', 'luveck-bxslider'),
        'ver'  => filemtime(get_template_directory() . '/assets/css/main.mobile.css')
      )
    );

    $js = array(
      array(
        'name' => 'luveck-bxslider',
        'file' => '/assets/js/jquery.bxslider.min.js',
        'deps' => array('jquery'),
        'ver'  => '4.1.2'
      ),
      array(
        'name' => 'luveck-main-mobile',
        'file' => '/assets/js/main.mobile.js',
        'deps' => array('jquery', 'luveck-bxslider'),
        'ver'  => filemtime(get_template_directory() . '/assets/js/main.mobile.js')
      )
    );
  else :
    $css = array(
      array(
        'name' => 'luveck-main',
        'file' => '/assets/css/compiled.min.css',
        'deps' => array('luveck-fontawesome', 'luveck-animate'),
        'ver'  => filemtime(get_template_directory() . '/assets/css/compiled.min.css')
      )
    );

    $js = array(
      array(
        'name' => 'luveck-main',
        'file' => '/assets/js/compiled.min.js',
        'deps' => array('google-maps', 'jquery'),
        'ver'  => filemtime(get_template_directory() . '/assets/js/compiled.min.js')
      )
    );
  endif;

  foreach ($css as $file) {
    wp_enqueue_style($file['name'], get_template_directory_uri() . $file['file'], $file['deps'], $file['ver']);
  }

  foreach ($js as $file) {
    wp_enqueue_script($file['name'], get_template_directory_uri() . $file['file'], $file['deps'], $file['ver'], TRUE);
  }
});

/**
 * Change the menu items href to hashes
 */
add_filter('nav_menu_link_attributes', function($atts, $item, $args, $depth) {
  $href = 'content-' . $item->object_id;

  if ($depth) {
    $href = 'sub-' . $href;
  }

  $atts['href'] = '#' . $href;

  return $atts;
}, 10, 4);

/**
 * Registering custom fields
 */
add_action('after_setup_theme', function(){
  register_field_group(array(
    'id'         => 'acf_product_information',
    'title'      => __('Product information', 'luveck'),
    'fields'     => array(
      array(
        'key'           => 'field_5512479feeb5e',
        'label'         => __('Certifications', 'luveck'),
        'name'          => 'luveck_product_certifications',
        'type'          => 'image',
        'save_format'   => 'object',
        'preview_size'  => 'thumbnail',
        'library'       => 'uploadedTo'
      ),
      array(
        'key'         => 'field_551247e901d46',
        'label'       => __('Medical leaflet', 'luveck'),
        'name'        => 'luveck_product_leaflet',
        'type'        => 'qtranslate_file',
        'save_format' => 'object',
        'library'     => 'uploadedTo',
      ),
    ),
    'location'   => array(
      array(
        array(
          'param'    => 'post_type',
          'operator' => '==',
          'value'    => 'product',
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

  register_field_group(array(
    'id'         => 'acf_branches',
    'title'      => __('Branches', 'luveck'),
    'fields'     => array(
      array(
        'key'          => 'field_5507e9cecea1e',
        'label'        => __('Branch', 'luveck'),
        'name'         => 'luveck_branches',
        'type'         => 'repeater',
        'sub_fields'   => array(
          array(
            'key'           => 'field_5507ea424428a',
            'label'         => __('Name', 'luveck'),
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
            'label'         => __('Address', 'luveck'),
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
            'label'         => __('Phone', 'luveck'),
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
            'label'        => __('Location', 'luveck'),
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
        'button_label' => __('Add item', 'luveck'),
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

  register_field_group(array(
    'id' => 'acf_english-slideshow',
    'title' => __('Slideshow', 'luveck'),
    'fields' => array(
      array(
        'key' => 'field_552f5c89360f7',
        'label' => __('Slideshow images', 'luveck'),
        'name' => 'slideshow_images',
        'type' => 'repeater',
        'sub_fields' => array(
          array(
            'key' => 'field_552f5c9e360f8',
            'label' => __('Images', 'luveck'),
            'name' => 'image',
            'type' => 'image',
            'column_width' => '',
            'save_format' => 'object',
            'preview_size' => 'thumbnail',
            'library' => 'all',
          ),
        ),
        'row_min' => '',
        'row_limit' => '',
        'layout' => 'table',
        'button_label' => __('Add image', 'luveck'),
      ),
    ),
    'location' => array(
      array(
        array(
            'param' => 'page_template',
            'operator' => '==',
            'value' => 'template-home.php',
            'order_no' => 0,
            'group_no' => 0,
        )
      )
    ),
    'options' => array(
      'position' => 'normal',
      'layout' => 'default',
      'hide_on_screen' => array(
      )
    ),
    'menu_order' => 0
  ));

  register_field_group(array(
    'id' => 'acf_product-images',
    'title' => __('Product images', 'luveck'),
    'fields' => array(
      array(
        'key'          => 'field_553e6a4a9bc21',
        'label'        => __('Context image', 'luveck'),
        'name'         => 'image_context',
        'type'         => 'image',
        'save_format'  => 'object',
        'preview_size' => 'thumbnail',
        'library'      => 'uploadedTo'
      ),
      array(
        'key'           => 'field_3vfgse3cyqq6v',
        'label'         => __('Order', 'luveck'),
        'name'          => 'menu_order',
        'type'          => 'text',
        'column_width'  => '',
        'default_value' => '0',
        'placeholder'   => '',
        'prepend'       => '',
        'append'        => '',
        'formatting'    => 'none',
        'maxlength'     => '',
      )
    ),
    'location' => array(
      array(
        array(
          'param' => 'ef_taxonomy',
          'operator' => '==',
          'value' => 'product_category',
          'order_no' => 0,
          'group_no' => 0
        )
      )
    ),
    'options' => array(
      'position' => 'normal',
      'layout' => 'default',
      'hide_on_screen' => array()
    ),
    'menu_order' => 0
  ));

  register_field_group(array(
    'id' => 'acf_countries',
    'title' => __('Product availability', 'luveck'),
    'fields' => array(
      array(
        'key' => 'field_55416c1a24379',
        'label' => __('Product available in this countries', 'luveck'),
        'name' => 'product_availability',
        'type' => 'repeater',
        'sub_fields' => array(
          array(
            'key' => 'field_55416d3e2437a',
            'label' => 'Country',
            'name' => 'country',
            'type' => 'select',
            'column_width' => '',
            'choices' => (array) json_decode(file_get_contents(__DIR__ . '/countries.json')),
            'default_value' => NULL,
            'allow_null' => TRUE,
            'multiple' => FALSE
          )
        ),
        'row_min' => 1,
        'row_limit' => '',
        'layout' => 'table',
        'button_label' => __('Add country', 'luveck')
      )
    ),
    'location' => array(
      array(
        array(
          'param' => 'post_type',
          'operator' => '==',
          'value' => 'product',
          'order_no' => 0,
          'group_no' => 0,
        )
      )
    ),
    'options' => array(
      'position' => 'normal',
      'layout' => 'default',
      'hide_on_screen' => array()
    ),
    'menu_order' => 0
  ));

  register_field_group(array(
    'id' => 'acf_en-upcoming-products',
    'title' => __('Upcoming products', 'luveck'),
    'fields' => array(
      array(
        'key' => 'field_55418f1ebc0aa',
        'label' => 'List of upcoming products',
        'name' => 'products_upcoming',
        'type' => 'qtranslate_textarea',
        'default_value' => '',
        'placeholder' => '',
        'maxlength' => '',
        'rows' => '',
        'formatting' => 'br'
      )
    ),
    'location' => array(
      array(
        array(
        'param' => 'page_template',
        'operator' => '==',
        'value' => 'template-products.php',
        'order_no' => 0,
        'group_no' => 0
        )
      )
    ),
    'options' => array(
      'position' => 'normal',
      'layout' => 'default',
      'hide_on_screen' => array()
    ),
    'menu_order' => 0
  ));

  register_field_group(array(
    'id' => 'acf_en-products-disclaimer',
    'title' => __('Products disclaimer', 'luveck'),
    'fields' => array(
      array(
        'key' => 'field_mres0mca3joho',
        'label' => __('Title', 'luveck'),
        'name' => 'products_disclaimer_title',
        'type' => 'qtranslate_text',
        'default_value' => '',
        'placeholder' => '',
        'maxlength' => '',
        'rows' => ''
      ),
      array(
        'key' => 'field_2n1ff4vlxp2dl',
        'label' => __('Content', 'luveck'),
        'name' => 'products_disclaimer_content',
        'type' => 'qtranslate_textarea',
        'default_value' => '',
        'placeholder' => '',
        'maxlength' => '',
        'rows' => '',
        'formatting' => 'br'
      )
    ),
    'location' => array(
      array(
        array(
        'param' => 'page_template',
        'operator' => '==',
        'value' => 'template-products.php',
        'order_no' => 0,
        'group_no' => 0
        )
      )
    ),
    'options' => array(
      'position' => 'normal',
      'layout' => 'default',
      'hide_on_screen' => array()
    ),
    'menu_order' => 0
  ));

  register_field_group(array(
    'id'     => 'acf_featured_image_mobile',
    'title'  => __('Mobile featured image', 'luvek'),
    'fields' => array(
      array(
        'key'          => 'field_555e70d6aaf4b',
        'label'        => __('Set featured image', 'luveck'),
        'name'         => 'featured_image_mobile',
        'type'         => 'image',
        'save_format'  => 'url',
        'preview_size' => 'thumbnail',
        'library'      => 'uploadedTo',
      ),
    ),
    'location' => array(
      array(
        array(
          'param'    => 'post_type',
          'operator' => '==',
          'value'    => 'post',
          'order_no' => 0,
          'group_no' => 0,
        ),
      ),
      array(
        array(
          'param'    => 'post_type',
          'operator' => '==',
          'value'    => 'page',
          'order_no' => 0,
          'group_no' => 1,
        ),
      ),
      array(
        array(
          'param'    => 'post_type',
          'operator' => '==',
          'value'    => 'product',
          'order_no' => 0,
          'group_no' => 2,
        ),
      ),
      array(
        array(
          'param'    => 'post_type',
          'operator' => '==',
          'value'    => 'certification',
          'order_no' => 0,
          'group_no' => 3,
        ),
      ),
      array(
        array(
          'param'    => 'post_type',
          'operator' => '==',
          'value'    => 'contact',
          'order_no' => 0,
          'group_no' => 4,
        ),
      ),
    ),
    'options' => array(
      'position'       => 'side',
      'layout'         => 'default',
      'hide_on_screen' => array(),
    ),
    'menu_order' => 0,
  ));
});

function luveck_send_contact()
{
  header('Content-Type: application/json');

  $data     = $_POST;
  $response = array(
    'status'  => NULL,
    'message' => NULL
  );

  if (
    (!isset($data['nombre-contacto']) OR empty($data['nombre-contacto'])) OR
    (!isset($data['email-contacto']) OR empty($data['email-contacto'])) OR
    (!isset($data['mensaje-contacto']) OR is_email($data['mensaje-contacto']))
  ) {
    $response['status']  = 'error';
    $response['message'] = __('Please be sure to complete all fields.', 'luveck');

    echo json_encode($response);
    exit;
  }

  $title   = sprintf('Mensaje de %s', $data['email-contacto']);
  $content = htmlspecialchars($data['nombre-contacto']);

  $post_id = wp_insert_post(array(
    'post_title'   => $title,
    'post_content' => $content,
    'post_status'  => 'publish',
    'post_type'    => 'contact',
    'ping_status'  => 'closed'
  ));

  if ($post_id == 0 OR is_wp_error($post_id)) {
    $response['status']  = 'error';
    $response['message'] = __('An error has occurred. Please try again.', 'luveck');
  } else {
    add_post_meta($post_id, 'contact_from_name', $data['nombre-contacto']);
    add_post_meta($post_id, 'contact_from_email', $data['email-contacto']);

    $response['status']  = 'success';
    $response['message'] = __('The message was sent successfully. We will contact you shortly.', 'luveck');
  }

  echo json_encode($response);
  exit;
}

add_action('wp_ajax_luveck_send_contact', 'luveck_send_contact');
add_action('wp_ajax_nopriv_luveck_send_contact', 'luveck_send_contact');

/**
 * Returns the image url for the given post ID
 *
 * @param $post_id
 * @param string $size
 * @return string|null
 */
function get_content_image($post_id, $size = 'large')
{
  $attr = wp_get_attachment_image_src(get_post_thumbnail_id($post_id), $size);

  if (!$attr) {
    return NULL;
  }

  return array_shift($attr);
}

add_filter('show_admin_bar', '__return_false');

/**
 * Returns the current post slug
 *
 * @return  string
 */
if (!function_exists('get_the_slug')) :
  function get_the_slug()
  {
    global $post;

    return $post->post_name;
  }
endif;

/**
 * Sort an array of terms
 *
 * @param  object $a
 * @param  object $b
 * @return bool
 */
function luveck_sort_by_menu_order($a, $b)
{
  if ($a->menu_order == $b->menu_order) {
      return 0;
  }

  return ($a->menu_order < $b->menu_order) ? 1 : -1;
}

/**
 * Find the contents availables for the given country
 *
 * @param  string $country ISO2 country code
 * @return array           array of ids
 */
function luveck_query_contents_for_country($country)
{
  global $wpdb;

  $query = $wpdb->prepare(
    "SELECT m.post_id FROM $wpdb->postmeta m WHERE m.meta_key LIKE %s AND m.meta_value = %s",
    'product_availability_%_country',
    $country
  );

  $results = $wpdb->get_results($query);
  $ids     = [];

  foreach ($results as $row) {
    $ids[] = $row->post_id;
  }

  return $ids;
}

/**
 * Returns the current visitor ip
 *
 * @return string
 */
function luveck_get_user_ip()
{
  return preg_replace('/[^0-9a-fA-F:., ]/', '', $_SERVER['REMOTE_ADDR']);
}

/**
 * Tries to geolocate an IP address using the ipinfo.io service
 *
 * @param  string $ip_addr
 * @return string ISO2 country code
 * @link https://ipinfo.io/developers
 */
function luveck_geolocalize_ip($ip_addr)
{
  $response = wp_remote_get(sprintf('http://ipinfo.io/%s/json', $ip_addr));

  if (is_wp_error($response)) {
    return new stdClass();
  }

  $data = json_decode($response['body']);

  if (!isset($data->country) OR empty($data->country)) {
    return NULL;
  }

  return strtoupper($data->country);
}
