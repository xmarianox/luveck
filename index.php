<!doctype html>
<html class="no-js" lang="">
  <head>
    <meta charset="utf-8">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>luveck</title>

    <link rel="stylesheet" href="bower_components/animate.css/animate.min.css">

    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/font-awesome.min.css">

    <script async src="js/modernizr.js"></script>
  </head>
  <body>
    <!--[if lt IE 10]>
      <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->
    <main>
      <?php require 'nav.php'; ?>
      
      <div class="content" id="home">
        <section>
          <article class="slider-menu">
            <ul>
              <li><a href="#slide-1">Trabajamos para mejorar la<br> salud de las personas.</a></li>
              <li><a href="#slide-2">Pensando en nuestra<br>comunidad.</a></li>
              <li><a href="#slide-3">Nuevas investigaciones</a></li>
              <li><h2>Encuentro para el<br> desarrollo y la<br> investigación Luveck 2014</h2></li>
            </ul>
          </article>
          <article class="slide" id="slide-1"></article>
          <article class="slide" id="slide-2"></article>
          <article class="slide" id="slide-3"></article>
        </section>
      </div><!-- home -->

      <div class="content" id="sobreLuveck">
        <section>
          <article>
            <h1>Quienes somos</h1>
            <p>Somos una empresa farmacéutica que se encuentra constituida en Estados unidos, nuestra finalidad es la fabricación. promoción, representación y marketing de medicamentos de uso humano. En búsqueda de la excelencia farmacéitucase han desarrollado estándarss de calidad mundial que permite asegurar la efectividad terapéutica de todos nuestros productos. Nuestra motivación principal es brindar una mejor calidad de vida.</p>
          </article>
        </section>
      </div><!-- sobreLuveck -->

      <div class="content" id="productos">
        <section>
          <p>productos</p>
        </section>
      </div><!-- productos -->

      <div class="content" id="certificaciones">
        <section>
          <article>
            <h1>Certificados</h1>

            <h2>OMS</h2>
            <p>Es el organismo de la Organización de las naciones unidas (ONU) especializado en crear, ejecutar y evaluar políticas de prevención, promoción e intervención en salud a nivel mundial. Es labor de la OMS garantizar el acceso a productos farmacéuticos de buena calidad, seguridad y eficacia mediante el programa de pre-evaluación de medicamentos. La OMS pre evalúa los medicamentos de los laboratorios que lo solicitan. El ser una empresa fabricante avalada por tal organismo internacional da a los consumidores una mayor seguridad con respecto a la calidad y eficacia de los productos que dicha organización ofrece.</p>
          </article>
        </section>
      </div><!-- certificaciones -->

      <div class="content" id="investigacion">
        <section>
          <p>investigacion</p>
        </section>
      </div><!-- investigacion -->

      <div class="content" id="servicioClientes">
        <section>
          <article>
            <div class="col col-4">
              <h1 class="animated fadeInUp">Contactenos</h1>

              <div class="sucursales active animated fadeInLeft" data-rel="casa-central">
                <h2>CASA CENTRAL <i class="fa fa-map-marker animated fadeInDown"></i></h2>
                <p>Lorem ipsum 2832, 9C - Tegucigalpa<br>
                (504) 2557-0657 / 2731<br>
                <a href="mailto:Info@luveck.com" title="Info@luveck.com" target="_blank">Info@luveck.com</a></p>
              </div>
              
              <div class="sucursales animated fadeInLeft" data-rel="sucursal-1">
                <h2>SUCURSAL 1 <i class="fa fa-map-marker animated fadeInDown"></i></h2>
                <p>Lorem ipsum 2832, 9C - San Pedro Sula<br>
                (504) 2557-0657 / 2731<br>
                <a href="mailto:infoSP@luveck.com" title="infoSP@luveck.com" target="_blank">infoSP@luveck.com</a></p>
              </div>

              <form action="" id="form-contacto" class="animated fadeInLeft">
                <div class="form-control">
                  <h2>CONSULTAS</h2>
                </div>
                <div class="form-control">
                  <input type="text" name="nombre-contacto" id="nombre-contacto" placeHolder="Nombre">
                </div>

                <div class="form-control">
                  <input type="email" name="email-contacto" id="email-contacto" placeHolder="Correo electronico">
                </div>

                <div class="form-control">
                  <textarea name="mensaje-contacto" id="mensaje-contacto" placeHolder="Mensaje"></textarea>
                </div>

                <div class="form-control">
                  <button class="btn">Enviar</button>
                </div>
              </form>
            </div><!-- col-4 -->

            <div class="col col-6">
              <div class="content-mapa animated fadeIn">
                <div id="map-canvas"></div>
              </div>
            </div><!-- col-6 -->
          </article>
        </section>
      </div><!-- #servicioClientes -->

    </main>
    <!-- scripts -->
    <script src="js/jquery.min.js"></script>
    <!-- google maps api -->
    <script src="http://maps.googleapis.com/maps/api/js?v=3"></script>
    <script src="js/main.js"></script>
</body>
</html>