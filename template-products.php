<?php
/**
 * Template name: Products
 */

$products = new WP_Query(array(
  'post_type' => 'product',
  'nopaging'  => TRUE
));
?>
<section class="section-products">
  <article>
    <div class="col col-49">
      <h1 class="animated fadeInUp"><?php the_title(); ?></h1>

<?php
$i = 0;

while ($products->have_posts()) :
  $products->the_post();

  $presentations = array_filter(explode("\n", (string) get_field('luveck_product_presentations')));
  $leaflet       = get_field('luveck_product_leaflet');
?>
      <div id="product-<?php the_ID(); ?>" class="content-prod <?php echo (++$i === 1) ? 'active' : NULL; ?>">
        <h2 class="animated fadeInUp"><?php the_title(); ?></h2>

        <div class="animated fadeInUp"><?php the_content(); ?></div>

  <?php if (!empty($presentations)) : ?>
        <div class="presentaciones animated fadeInUp">
          <h2><?php _e('Presentations') ?></h2>

          <ul>
    <?php foreach ($presentations as $presentation) : ?>
            <li><?php echo $presentation; ?></li>
    <?php endforeach; ?>
          </ul>
        </div>
  <?php endif; ?>

  <?php if ($leaflet) : ?>
        <a href="<?php echo $leaflet['url']; ?>" class="btn_descargar animated fadeInUp" title="<?php esc_attr_e('Download doctor insert', 'luveck'); ?>">
          <span><?php _e('Download doctor insert', 'luveck') ?></span>
          <span class="shape"><i class="icon"></i></span>
        </a>
  <?php endif; ?>
      </div>
<?php
endwhile;
$products->rewind_posts();
?>
    </div>
    <!-- col -->

    <div class="col col-51">
      <ul class="list-prod">
<?php
$i = 0;

while ($products->have_posts()) :
$products->the_post();
?>
        <li>
          <a href="#product-<?php the_ID(); ?>" class="<?php echo (++$i === 1) ? 'currentProd' : NULL; ?>">
            <figure>
              <img src="<?php echo get_content_image(get_the_ID(), 'nav-thumbnail'); ?>" alt="<?php the_title(); ?>">
              <span class="borderCurrent"></span>
            </figure>
          </a>
        </li>
<?php endwhile; ?>
      </ul>

      <span class="arrow arrow-prod"><i class="fa fa-angle-down"></i></span>
    </div>
  </article>
</section>
