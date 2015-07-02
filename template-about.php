<?php
/**
 * Template name: About
 */
?>
<section id="content-<?php the_ID(); ?>" class="item fadeIn item-about has-sub-pages">
    <header class="item-header">
      <h1><?php the_title(); ?></h1>
    </header>

<?php
foreach ($content->subitems as $subitem) :
  $post = get_post($subitem->object_id);
  setup_postdata($post);

  $mobile_image = get_field('featured_image_mobile');

  if (empty($mobile_image)) {
    $mobile_image = get_content_image(get_the_ID(), 'large');
  }
?>
    <article id="sub-content-<?php the_ID(); ?>" class="item sub-item has-featured-image">
      <div class="item-image"><img src="<?php echo get_content_image(get_the_ID(), 'large'); ?>"></div>

      <div class="item-content">
        <div class="scroller">
          <div class="nano">
            <div class="nano-content">
              <div class="scroller-content">
                <header>
                  <h2 class="h1"><?php the_title(); ?></h2>
                </header>

                <div class="item-image item-image-mobile"><img src="<?php echo $mobile_image; ?>"></div>

                <?php the_content(); ?>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
<?php endforeach; ?>
</section>
