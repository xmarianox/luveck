<?php
/**
 * Template name: Contact
 */

$branches = get_field('luveck_branches', get_the_ID());
?>
<section>
  <article>
    <div class="col col-49">
      <div class="nano">
        <div class="nano-content">
          <h1 class="animated fadeInUp">Contáctenos</h1>

<?php foreach ($branches as $i => $branch) : ?>
          <div class="sucursales animated fadeInLeft <?php echo ($i === 0) ? 'active' : NULL; ?>"
  <?php if (isset($branch['location'])) : ?>
               data-coords="<?php echo $branch['location']['lat']; ?>,<?php echo $branch['location']['lng']; ?>"
  <?php endif; ?>>

            <h2><?php echo $branch['name']; ?> <i
                class="fa fa-map-marker animated fadeInDown"></i></h2>

            <p><?php echo $branch['address']; ?>
  <?php if (isset($branch['phone']) AND !empty($branch['phone'])) : ?>
              <br>Tel: <?php echo $branch['phone']; ?>
  <?php endif; ?>

  <?php if (isset($branch['fax']) AND !empty($branch['fax'])) : ?>
                <br>Fax: <?php echo $branch['fax']; ?>
  <?php endif; ?>
          </div>
<?php endforeach; ?>

          <form action="" id="form-contacto" class="animated fadeInLeft">
            <div class="form-control">
              <h2>CONSULTAS</h2>
            </div>

            <div class="form-control form-control-5 left">
              <input type="text" name="nombre-contacto" id="nombre-contacto"
                     placeHolder="Nombre">
            </div>

            <div class="form-control form-control-5 right">
              <input type="email" name="email-contacto" id="email-contacto"
                     placeHolder="Correo electronico">
            </div>

            <div class="form-control">
              <textarea name="mensaje-contacto" id="mensaje-contacto"
                        placeHolder="Mensaje"></textarea>
            </div>

            <div class="form-control">
              <button class="btn">Enviar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- col-4 -->

    <div class="col col-51">
      <div class="content-mapa">
        <div id="map-canvas"></div>
      </div>
    </div>
    <!-- col-6 -->
  </article>
</section>

<script>
  var LVCK_BRANCHES = <?php echo json_encode($branches); ?>;
</script>
