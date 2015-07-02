<?php
/**
 * Template name: Contact
 */

$branches = get_field('luveck_branches', get_the_ID());
?>
<section id="content-<?php the_ID(); ?>" class="item fadeIn has-featured-image item-contact">
  <div class="item-map">
    <div id="contact-map" class="item-map-inner"></div>
  </div>

  <div class="item-content">
    <div class="scroller">
      <div class="nano">
        <div class="nano-content">
          <div class="scroller-content">
            <header class="item-header">
              <h1><?php the_title(); ?></h1>
            </header>

            <div class="item-map item-map-mobile">
              <div id="contact-map-mobile" class="item-map-inner"></div>
            </div>

            <h2><?php _e('Offices', 'luveck'); ?></h2>

<?php foreach ($branches as $i => $branch) : ?>
            <div class="branch" data-branch
              <?php if (isset($branch['location'])) : ?>
                data-lat="<?php echo $branch['location']['lat']; ?>" data-lng="<?php echo $branch['location']['lng']; ?>"
              <?php endif; ?>

              <?php if (isset($branch['name'])) : ?>data-name="<?php echo $branch['name']; ?>"<?php endif; ?>
              <?php if (isset($branch['address'])) : ?>data-address="<?php echo $branch['address']; ?>"<?php endif; ?>
              <?php if (isset($branch['phone'])) : ?>data-phone="<?php echo $branch['phone']; ?>"<?php endif; ?>
              <?php if (isset($branch['fax'])) : ?>data-fax="<?php echo $branch['fax']; ?>"<?php endif; ?>
              >

              <h3><a href="#" data-action="show-branch"><?php echo $branch['name']; ?></a> <i class="fa fa-map-marker"></i></h3>

              <p><?php echo $branch['address']; ?>
                <?php if (isset($branch['phone']) AND !empty($branch['phone'])) : ?>
                  <br>Tel: <?php echo $branch['phone']; ?>
                <?php endif; ?>

                <?php if (isset($branch['fax']) AND !empty($branch['fax'])) : ?>
                  <br>Fax: <?php echo $branch['fax']; ?>
                <?php endif; ?></p>
            </div>
<?php endforeach; ?>

            <hr>

            <form id="form-contacto" action="<?php echo admin_url('admin-ajax.php'); ?>?action=luveck_send_contact" method="post">
              <h2><?php _e('Contact', 'luveck'); ?></h2>

              <div class="form-feedback"></div>

              <div class="row">
                <div class="form-item form-name">
                  <input class="form-control" type="text" name="nombre-contacto" id="nombre-contacto"
                         placeHolder="<?php _e('Name', 'luveck'); ?>">
                </div>

                <div class="form-item form-email">
                  <input class="form-control" type="email" name="email-contacto" id="email-contacto"
                         placeHolder="<?php _e('E-mail', 'luveck'); ?>">
                </div>
              </div>

              <div class="form-item form-message">
                <textarea class="form-control" name="mensaje-contacto" id="mensaje-contacto"
                          placeHolder="<?php _e('Message', 'luveck'); ?>" rows="5"></textarea>
              </div>

              <div class="form-item form-actions">
                <button class="btn">Enviar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<script>
  var LUVECK_BRANCHES = <?php echo json_encode($branches); ?>;
</script>
