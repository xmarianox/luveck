<?php
$locations  = get_nav_menu_locations();
$menu_meta  = wp_get_nav_menu_object($locations['main']);
$menu_items = wp_get_nav_menu_items($menu_meta->term_id, array(
  'update_post_term_cache' => FALSE
));

$contents = array();

foreach ($menu_items as $item) {
  if ($item->menu_item_parent == 0) {
    $contents[$item->ID] = $item;

    continue;
  }

  if (!isset($contents[$item->menu_item_parent]->subitems)) {
    $contents[$item->menu_item_parent]->subitems = [];
  }

  $contents[$item->menu_item_parent]->subitems[] = $item;
}
?><!doctype html>
<html class="no-js" <?php language_attributes(); ?>>
  <head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">

    <title><?php wp_title('|', TRUE, 'right'); ?></title>

    <!-- Favicon -->
    <link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/favicon.png">
    <!-- Apple Icons -->
    <link rel="apple-touch-icon" sizes="57x57" href="<?php echo get_template_directory_uri(); ?>/assets/images/apple-touch-icon.png">
    <link rel="apple-touch-icon" sizes="72x72" href="<?php echo get_template_directory_uri(); ?>/assets/images/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="114x114" href="<?php echo get_template_directory_uri(); ?>/assets/images/apple-touch-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="180x180" href="<?php echo get_template_directory_uri(); ?>/assets/images/apple-touch-icon-retina-180x180.png">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-mobile-web-app-title" content="Luveck">
    <!-- Format detection -->
    <meta name="format-detection" content="telephone=no">
    <meta http-equiv="x-rim-auto-match" content="none">
    <!-- Chrome app -->
    <meta name="mobile-web-app-capable" content="yes">
    <link rel="icon" sizes="196x196" href="<?php echo get_template_directory_uri(); ?>/assets/images/chrome-touch-icon-196x196.png">
    <!-- MS apps -->
    <meta name="msapplication-TileImage" content="<?php echo get_template_directory_uri(); ?>/assets/images/ms-touch-icon-144x144-precomposed.png">
    <meta name="msapplication-TileColor" content="#FFF">
    <!-- Google Tags -->
    <meta name="description" content="">
    <meta name="keywords" content="">
    <meta name="author" content="http://funka.la">
    <!-- Facebook Tags -->
    <meta property="og:title" content="Luveck">
    <meta property="og:site_name" content="Luveck">
    <meta property="og:url" content="">
    <meta property="og:type" content="website">
    <meta property="og:description" content="">
    <meta property="og:locale " content="es_ES">
    <!-- Twitter Tags -->
    <meta name="twitter:card" content="summary">
    <meta name="twitter:site" content="">
    <meta name="twitter:creator" content="http://funka.la">

    <?php wp_head(); ?>

    <script>
      var LUVECK_MAP_MARKER = '<?php echo get_template_directory_uri(); ?>/assets/images/map-pin.png';
    </script>
  </head>

  <body <?php body_class(); ?>>
    <!--[if lt IE 10]>
      <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->

    <div class="site-loader">
      <div class="spinner">
        <img class="logo" src="<?php echo get_template_directory_uri(); ?>/assets/images/logo-<?php echo qtranxf_getLanguage(); ?>.png" alt="Luveck">
        <img src="<?php echo get_template_directory_uri(); ?>/assets/images/loader.gif" alt="loading">
      </div>
    </div>

    <header class="site-header">
      <a class="header-logo" href="<?php echo esc_url(home_url('/')); ?>" title="<?php _e('Go to home page', 'luveck'); ?>">
        <img src="<?php echo get_template_directory_uri(); ?>/assets/images/logo-<?php echo qtranxf_getLanguage(); ?>.png" alt="Luveck">

        <h1>Luveck es vida</h1>
      </a>

      <a class="header-menu-button" href="#menu" data-action="open-menu">
        <?php _e('Menu', 'luveck'); ?>
        <i class="icon fa fa-bars"></i>
      </a>
    </header>

    <nav class="site-navigation">
      <a class="site-navigation-logo" href="<?php echo esc_url(home_url('/')); ?>" title="<?php _e('Go to home page', 'luveck'); ?>">
        <img src="<?php echo get_template_directory_uri(); ?>/assets/images/logo-<?php echo qtranxf_getLanguage(); ?>.png" alt="Luveck">

        <h1>Luveck es vida</h1>
      </a>

      <?php
      wp_nav_menu(array(
        'theme_location' => 'main',
        'container'      => '',
        'menu_class'     => 'menu menu-sections'
      ));
      ?>

      <div class="menu-secondary">
        <ul class="menu menu-contacts">
          <li><a href="mailto:info@luveck.com" title="Mail"><i class="fa fa-envelope"></i> <span>Email de contacto</span></a></li>
        </ul>

        <ul class="menu menu-languages">
          <?php foreach (qtranxf_getSortedLanguages() as $lang) : ?>
          <li>
            <a href="<?php echo qtranxf_convertURL('', $lang, false, true); ?>">
              <?php echo qtranxf_getLanguageName($lang); ?>
              <img src="<?php echo get_template_directory_uri(); ?>/assets/images/<?php echo $lang; ?>.png">
            </a>
          </li>
          <?php endforeach; ?>
        </ul>
      </div>
    </nav>
    <div class="site-navigation-overlay"></div>

<?php
foreach ($contents as $content) :
  $post = get_post($content->object_id);
  setup_postdata($post);

  include get_page_template();
endforeach;
?>

    <?php wp_footer(); ?>

    <script>
    (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
    function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
    e=o.createElement(i);r=o.getElementsByTagName(i)[0];
    e.src='https://www.google-analytics.com/analytics.js';
    r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
    ga('create','UA-64239432-1','auto');ga('send','pageview');
    </script>
  </body>
</html>
