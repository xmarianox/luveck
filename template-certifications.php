<?php
/**
 * Template name: Certifications
 */

$certs = new WP_Query(array(
  'post_type' => 'certification',
  'nopaging'  => TRUE
));
?>
<section id="content-<?php the_ID(); ?>" class="item fadeIn has-navigation" data-animation="fadeIn">
  <div class="item-content">
    <div class="scroller">
      <div class="nano">
        <div class="nano-content">
          <div class="scroller-content">
            <header class="item-header">
              <h1>Certificaciones</h1>
            </header>

<?php
while ($certs->have_posts()) :
  $certs->the_post();

  $mobile_image = get_field('featured_image_mobile');

  if (empty($mobile_image)) {
    $mobile_image = get_content_image(get_the_ID(), 'large');
  }
?>
            <article id="sub-content-<?php the_ID(); ?>" class="item">
              <div class="item-image"><img src="<?php echo get_content_image(get_the_ID(), 'large'); ?>"></div>

              <div class="item-content">
                <header>
                  <h2><?php the_title(); ?></h2>
                </header>

                <div class="item-image item-image-mobile"><img src="<?php echo $mobile_image; ?>"></div>

                <div><?php the_content(); ?></div>
              </div>
            </article>
<?php
endwhile;
$certs->rewind_posts();
?>
          </div>
        </div>
      </div>
    </div>
  </div>



  <div class="item-navigation">
    <ul class="menu">
<?php
while ($certs->have_posts()) :
  $certs->the_post();
?>
      <li>
        <a href="#sub-content-<?php the_ID(); ?>">
          <img src="<?php echo get_content_image(get_the_ID(), 'large') ?>" alt="<?php the_title(); ?>">
        </a>
      </li>
<?php
endwhile;
$certs->rewind_posts();
?>
    </ul>
  </div>
</section>
