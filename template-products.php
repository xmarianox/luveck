<?php
/**
 * Template name: Products
 */

$page_image         = get_content_image(get_the_ID(), 'large');
$page_link          = 'content-' . get_the_ID();
$upcoming_products  = get_field('products_upcoming');
$disclaimer_title   = get_field('products_disclaimer_title');
$disclaimer_content = get_field('products_disclaimer_content');

//
// User geolocalization
//

$country = luveck_geolocalize_ip('201.250.161.204');
$country = $country ? $country : LUVECK_DEFAULT_COUNTRY;

//
// Getting available products
//

$content_ids = luveck_query_contents_for_country($country);

if (empty($content_ids)) {
  $country     = LUVECK_DEFAULT_COUNTRY;
  $content_ids = luveck_query_contents_for_country($country);
}

$products = new WP_Query(array(
  'post_type'   => 'product',
  'post_status' => 'publish',
  'post__in'    => $content_ids
));

//
// Getting the contents to show
//

// Making an big array with all the categories and contents for each one
$categories = array();

foreach ($products->posts as $product) {
  $product_terms = wp_get_object_terms($product->ID, 'product_category');

  foreach ($product_terms as $term) {
    if (!isset($categories[$term->slug])) {
      $order = get_field('menu_order', 'product_category_' . $term->term_id);

      $term->menu_order = $order ? $order : 0;
      $term->contents   = array();

      $categories[$term->slug] = $term;
    }

    $categories[$term->slug]->contents[] = $product;
  }
}

//
// Ordering
//

// ordering contents
foreach ($categories as $term) {
  $contents = $term->contents;

  usort($contents, 'luveck_sort_by_menu_order');

  $term->contents = $contents;
}

// ordering terms
usort($categories, 'luveck_sort_by_menu_order');
?>

<?php if ($disclaimer_title AND $disclaimer_content) : ?>
  <div class="modal">
    <div class="modal-inner">
      <h1 class="h4"><?php echo $disclaimer_title ?> <a class="modal-close" href="#"><span class="fa fa-close"></span></a></h1>
      <?php echo wpautop($disclaimer_content); ?>
    </div>
  </div>
<?php endif; ?>

<section id="<?php echo $page_link; ?>" class="item fadeIn has-navigation item-products">
  <div id="product-categories" class="item has-featured-image item-product-categories">
    <div class="item-image">
      <img src="<?php echo $page_image; ?>">
    </div>

    <div class="item-content">
      <div class="scroller">
        <div class="nano">
          <div class="nano-content">
            <div class="scroller-content">
              <header class="item-header">
                <h1><?php the_title(); ?></h1>
              </header>

              <ul class="menu menu-product-categories">
              <?php foreach ($categories as $category) : ?>
                <li><a href="#products-<?php echo $category->slug; ?>"><?php echo $category->name; ?></a></li>
              <?php endforeach; ?>
              </ul>

<?php if (!empty($upcoming_products)) : ?>
              <hr>

              <h2 class="h3"><?php _e('Upcoming products', 'luveck'); ?></h2>
              <?php echo wpautop($upcoming_products); ?>
<?php endif; ?>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <?php foreach ($categories as $category) : ?>
  <div id="products-<?php echo $category->slug; ?>" class="item item-product-category">
    <?php
    foreach ($category->contents as $post) :
      setup_postdata($post);

      $leaflet        = get_field('luveck_product_leaflet');
      $certifications = get_field('luveck_product_certifications');
      $image_context  = get_field('image_context', 'product_category_' . $category->term_id);

      if (isset($certifications['sizes'])) {
        $certifications = $certifications['sizes']['large'];
      } else {
        $certifications = NULL;
      }

      if (isset($image_context['sizes'])) {
        $image_context = $image_context['sizes']['large'];
      } else {
        $image_context = NULL;
      }
    ?>
    <article id="product-<?php echo get_the_slug(); ?>" class="item item-product has-featured-image">
      <div class="item-image product-images">
        <div class="product-image-featured">
          <img src="<?php echo $image_context; ?>">
        </div>

        <div class="product-image">
          <img src="<?php echo get_content_image(get_the_ID(), 'large'); ?>">
        </div>
      </div>

      <div class="item-content">
        <div class="scroller">
          <div class="nano">
            <div class="nano-content">
              <div class="scroller-content">
                <ul class="menu">
                  <li><a href="#product-categories"><span class="fa fa-arrow-circle-o-left"></span> <?php _e('Back to products list', 'luveck'); ?></a></li>
                </ul>

                <h1><?php the_title(); ?></h1>

                <?php the_content(); ?>

                <?php if ($leaflet) : ?>
                <p>
                  <a class="btn" href="<?php echo $leaflet['url']; ?>" class="btn_descargar animated fadeInUp" title="<?php esc_attr_e('Download doctor insert', 'luveck'); ?>">
                    <span class="icon fa fa-file-text-o"></span>
                    <span><?php _e('Download doctor insert', 'luveck'); ?></span>
                  </a>
                </p>
                <?php endif; ?>

                <hr class="space">

                <?php if ($certifications) : ?>
                <h2><?php _e('Product certifications', 'luveck'); ?></h2>

                <img class="img-responsive" src="<?php echo $certifications; ?>">
                <?php endif; ?>

                <hr class="space">

                <h2><?php _e('Presentations', 'luveck'); ?></h2>

                <ul class="inline-list menu menu-products">
                  <?php foreach ($category->contents as $post) : ?>
                  <li>
                    <a class="btn" href="#product-<?php echo $post->post_name; ?>"><?php echo get_the_title($post); ?></a>
                  </li>
                  <?php endforeach; ?>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
    <?php endforeach; ?>
  </div>
  <?php endforeach; ?>
</section>
