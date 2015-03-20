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
      <h1 class="animated fadeInUp">Productos</h1>

<?php
$i = 0;

while ($products->have_posts()) :
  $products->the_post();
?>
      <div id="product-<?php the_ID(); ?>" class="content-prod <?php echo (++$i === 1) ? 'active' : NULL; ?>">
        <h2 class="animated fadeInUp"><?php the_title(); ?></h2>

        <div class="animated fadeInUp"><?php the_content(); ?></div>

        <div class="presentaciones animated fadeInUp">
          <h2>Presentaciones</h2>

          <ul>
            <li>Amlodipen 2.5mg</li>
            <li>Amlodipen 5mg</li>
            <li>Amlodipen D</li>
          </ul>
        </div>
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
