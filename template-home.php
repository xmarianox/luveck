<?php
/**
 * Template name: Home
 */

$images = get_field('slideshow_images');
?>
<section id="content-<?php the_ID(); ?>" class="item item-home fadeIn">
  <ul class="bxslider slider">
<?php
foreach ($images as $image) :
  $image_src = array_shift(wp_get_attachment_image_src($image['image']['id'], 'large'));
?>
    <li><div class="image" style="background-image:url(<?php echo $image_src; ?>);"><img src="<?php echo $image_src; ?>"></div></li>
<?php endforeach; ?>
  </ul>
</section>
