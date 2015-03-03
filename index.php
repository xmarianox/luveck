<!doctype html>
<html class="no-js" lang="">
  <head>
    <meta charset="utf-8">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <title>Luveck</title>
    
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
    <!-- Styles -->

    <!-- Dependencias -->
    <link rel="stylesheet" href="css/font-awesome.min.css">
    <link rel="stylesheet" href="css/animate.min.css">

    <!-- Layout -->
    <link rel="stylesheet" href="css/main.min.css">

    <script async src="js/modernizr.js"></script>
  </head>
  <body>
    <!--[if lt IE 10]>
      <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->
    
    <div id="preloader">
      <div id="status">
        <img src="images/logo.png" height="52" width="151" alt="Luveck" class="logo">
        <img src="images/bx_loader.gif" height="32" width="32" alt="" class="loader">
      </div>
    </div>

    <main>
      <?php require 'nav.php'; ?>
      
      <div class="content" id="home">
        <?php require 'views/com-tab-home.php'; ?>
      </div><!-- home -->

      <div class="content" id="sobreLuveck">
        <?php require 'views/com-tab-sobreLuveck.php'; ?>
      </div><!-- sobreLuveck -->

      <div class="content" id="productos">
        <?php require 'views/com-tab-productos.php'; ?>
      </div><!-- productos -->

      <div class="content" id="certificaciones">
        <?php require 'views/com-tab-certificaciones.php'; ?>
      </div><!-- certificaciones -->

      <div class="content" id="investigacion">
        <?php require 'views/com-tab-investigacion.php'; ?>
      </div><!-- investigacion -->
      <div class="content" id="servicioClientes">
        <?php require 'views/com-tab-contacto.php'; ?>
      </div><!-- #servicioClientes -->

    </main>
    <!-- scripts -->
    <script src="js/jquery.min.js"></script>
    <script src="js/jquery.tinycarousel.min.js"></script>
    <script src="js/jquery.scrollTo.min.js"></script>
    <script src="js/jquery.nanoscroller.min.js"></script>
    <!-- google maps api -->
    <script src="http://maps.googleapis.com/maps/api/js?v=3"></script>
    <!-- main -->
    <script src="js/main.min.js"></script>
</body>
</html>