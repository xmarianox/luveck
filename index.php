<!doctype html>
<html class="no-js" <?php language_attributes(); ?>>
  <head>
    <meta charset="utf-8">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">

    <title><?php wp_title('|', TRUE, 'right'); ?></title>

    <!-- Favicon -->
    <link rel="shortcut icon" href="images/favicon.png">
    <!-- Apple Icons -->
    <link rel="apple-touch-icon" sizes="57x57" href="images/apple-touch-icon.png">
    <link rel="apple-touch-icon" sizes="72x72" href="images/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="114x114" href="images/apple-touch-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="180x180" href="images/apple-touch-icon-retina-180x180.png">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-mobile-web-app-title" content="Luveck">
    <!-- Format detection -->
    <meta name="format-detection" content="telephone=no">
    <meta http-equiv="x-rim-auto-match" content="none">
    <!-- Chrome app -->
    <meta name="mobile-web-app-capable" content="yes">
    <link rel="icon" sizes="196x196" href="images/chrome-touch-icon-196x196.png">
    <!-- MS apps -->
    <meta name="msapplication-TileImage" content="images/ms-touch-icon-144x144-precomposed.png">
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

    <script>
    (function() {
        (function(i){var e=/iPhone/i,n=/iPod/i,o=/iPad/i,t=/(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,r=/Android/i,d=/BlackBerry/i,s=/Opera Mini/i,a=/IEMobile/i,b=/(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,h=RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)","i"),c=function(i,e){return i.test(e)},l=function(i){var l=i||navigator.userAgent;this.apple={phone:c(e,l),ipod:c(n,l),tablet:c(o,l),device:c(e,l)||c(n,l)||c(o,l)},this.android={phone:c(t,l),tablet:!c(t,l)&&c(r,l),device:c(t,l)||c(r,l)},this.other={blackberry:c(d,l),opera:c(s,l),windows:c(a,l),firefox:c(b,l),device:c(d,l)||c(s,l)||c(a,l)||c(b,l)},this.seven_inch=c(h,l),this.any=this.apple.device||this.android.device||this.other.device||this.seven_inch},v=i.isMobile=new l;v.Class=l})(window);

        var MOBILE_SITE = 'mobile/', // site to redirect to
            NO_REDIRECT = 'noredirect'; // cookie to prevent redirect

        // I only want to redirect iPhones, Android phones and a handful of 7" devices
        if (isMobile.apple.phone || isMobile.android.phone || isMobile.seven_inch) {
            // Only redirect if the user didn't previously choose
            // to explicitly view the full site. This is validated
            // by checking if a "noredirect" cookie exists
            if ( document.cookie.indexOf(NO_REDIRECT) === -1 ) {
                document.location = MOBILE_SITE;
            }
        }
    })();
    </script>

    <?php wp_head(); ?>
  </head>

  <body <?php body_class(); ?>>
    <!--[if lt IE 10]>
      <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->

    <div id="preloader">
      <div id="status">
        <img src="<?php echo get_template_directory_uri(); ?>/assets/images/logo.png" height="52" width="151" alt="Luveck" class="logo">
        <img src="<?php echo get_template_directory_uri(); ?>/assets/images/bx_loader.gif" height="32" width="32" alt="" class="loader">
      </div>
    </div>

    <main>
      <aside>
        <h1 class="brand_logo">Luveck</h1>

        <?php
        wp_nav_menu(array(
          'theme_location' => 'main',
          'container'      => 'nav',
          'menu_class'     => 'tabs'
        ));
        ?>

        <ul class="contactos">
          <li><a href="" title="Mail"><i class="fa fa-envelope"></i></a></li>
          <li><a href="" title="Facebook"><i class="fa fa-facebook"></i></a></li>
          <li><a href="" title="Twitter"><i class="fa fa-twitter"></i></a></li>
        </ul><!-- .contactos -->
      </aside>

<?php
$locations  = get_nav_menu_locations();
$menu_meta  = wp_get_nav_menu_object($locations['main']);
$menu_items = wp_get_nav_menu_items($menu_meta->term_id, array(
  'update_post_term_cache' => FALSE
));

$menu = array();

foreach ($menu_items as $item) {
  if ($item->menu_item_parent == 0) {
    $menu[$item->ID] = $item;

    continue;
  }

  if (!isset($menu[$item->menu_item_parent]->subitems)) {
    $menu[$item->menu_item_parent]->subitems = [];
  }

  $menu[$item->menu_item_parent]->subitems[] = $item;
}
?>

<?php
foreach ($menu as $item) :
  $post = get_post($item->object_id);
  setup_postdata($post);

  $template = get_page_template();
?>
<div class="content" id="content-<?php echo $item->object_id; ?>">
  <?php if (is_file($template)) include $template; ?>
</div>
<?php endforeach; ?>
    </main>

    <?php wp_footer(); ?>
  </body>
</html>
