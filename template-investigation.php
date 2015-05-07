<?php
/**
 * Template name: Investigations
 */
?>
<section id="content-<?php the_ID(); ?>" class="item fadeIn has-featured-image item-research">
  <div class="item-image"><img src="<?php echo get_content_image(get_the_ID(), 'large') ?>"></div>

  <article class="item-content">
    <div class="scroller">
      <div class="nano">
        <div class="nano-content">
          <div class="scroller-content">
            <header class="item-header">
              <h1><?php the_title(); ?></h1>
            </header>

            <div class="item-image item-image-mobile"><img src="<?php echo get_content_image(get_the_ID(), 'large') ?>"></div>

            <?php the_content(); ?>
          </div>
        </div>
      </div>
    </div>
  </article>
</section>
