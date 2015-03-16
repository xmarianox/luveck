<?php
/**
 * Template name: About
 */
?>
<section>
  <article id="sliderSobreLuveck">
    <ul class="list-info">
<?php
foreach ($item->subitems as $subitem) :
  $post = get_post($subitem->object_id);
  setup_postdata($post);
?>
      <li id="content-<?php the_ID(); ?>-1">
        <div class="col col-49">
          <div class="nano">
            <div class="nano-content">
              <h1><?php the_title(); ?></h1>

              <?php the_content(); ?>
            </div>
          </div>

        </div>
        <div class="col col-51">
          <img src="<?php echo get_content_image(get_the_ID()); ?>">
        </div>
      </li>
<?php endforeach; ?>
    </ul>
    <!-- overview -->

    <ul class="bullets">
      <li><a href="#quienes-somos" class="bullet active">1</a></li>
      <li><a href="#nuestra-gente" class="bullet">2</a></li>
      <li><a href="#mision" class="bullet">3</a></li>
      <li><a href="#valores" class="bullet">4</a></li>
    </ul>

  </article>
</section>
