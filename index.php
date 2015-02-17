<!doctype html>
<html class="no-js" lang="">
  <head>
    <meta charset="utf-8">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>luveck</title>

    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/font-awesome.min.css">
    <link rel="stylesheet" href="css/animate.min.css">

    <script async src="js/modernizr.js"></script>
  </head>
  <body>
    <!--[if lt IE 10]>
      <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->
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
    <!-- google maps api -->
    <script src="http://maps.googleapis.com/maps/api/js?v=3"></script>
    <!--  -->
    <script src="js/main.js"></script>
</body>
</html>