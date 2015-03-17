<?php
/**
 * Template name: Certifications
 */

$certs = new WP_Query(array(
  'post_type' => 'certification',
  'nopaging'  => TRUE
));
?>
<section class="section-certifications">
  <article>
    <div class="col col-49">
      <h1 class="animated fadeInUp">Certificaciones</h1>

<?php
$i = 0;

while ($certs->have_posts()) :
  $certs->the_post();
?>
        <div id="cert-<?php the_ID(); ?>" class="content-cert <?php echo (++$i === 1) ? 'active' : NULL; ?>">
          <div class="animated fadeInLeft">
            <h2><?php the_title(); ?></h2>
            <?php the_content(); ?>
          </div>
        </div>
<?php
endwhile;
$certs->rewind_posts();
?>
    </div>

    <div class="col col-51">
      <ul class="list-cert">
<?php
$i = 0;

while ($certs->have_posts()) :
  $certs->the_post();
?>
        <li>
          <a href="#cert-<?php the_ID(); ?>" class="<?php echo (++$i === 1) ? 'currentProd' : NULL; ?>">
            <figure>
              <img src="<?php echo get_content_image(get_the_ID(), 'nav-thumbnail'); ?>" alt="<?php the_title(); ?>">

              <span class="borderCurrent"></span>
            </figure>
          </a>
        </li>
<?php endwhile; ?>
      </ul>
      <span class="arrow arrow-cert"><i class="fa fa-angle-down"></i></span>
    </div>
  </article>
</section>
