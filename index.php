<?php
/**
 * Main theme index file.
 * Actually it contains the text for content display.
 * 
 * @author acruis
 * @theme Rambotron
 */
?>

<?php get_header(); ?>
    
    <div class="archive-wrapper">
      <?php // Prepare for sidelinks!
      $is_sidelinks_view = false;
      if ( is_category() && ( get_theme_mod( 'category_display_' . get_query_var( 'cat' ) ) === 'sidelinks' ) ) {
        $is_sidelinks_view = true;
        $all_in_cat = get_posts( array( 'posts_per_page' => -1, 'category' => get_query_var( 'cat' ), 'order' => 'asc' ) );
      } 
      ?>
      
      <!-- Title bar -->
      <?php if ( $is_sidelinks_view ): ?>
      <div class="sidelink-title-background container-fluid">
        <div class="sidelink-title-wrapper row">
          <div class="col-sm-9 pull-right">
            <?php $sidelink_title_index = 0;
            foreach( $all_in_cat as $current_category ): ?>
              <h1 id="h<?php echo $sidelink_title_index; ?>" class="sidelink-title <?php if ( !$sidelink_title_index++ ) { echo 'sidelink-title-active'; } else { echo 'sidelink-title-inactive'; } ?>">
                <?php echo $current_category->post_title; ?>
              </h1>
            <?php endforeach; ?>
          </div>
        </div>
      </div>
      <?php else: ?>
      <div class="cards-title-background">
        <h1 class="cards-title">
        <?php
          if ( is_category() ) {
            if ( get_query_var('cat') != '' ) {
              echo get_category( get_query_var('cat') )->cat_name;
            }
          } else if ( is_archive() ) {
            if ( get_query_var('monthnum') !== '' && get_query_var('year') !== '' ) {
              echo DateTime::createFromFormat('m Y' , get_query_var('monthnum') . get_query_var('year'))->format('F Y');
            }
          } else if ( is_search() ) {
            echo 'Search for: ' . get_search_query();
          }
        ?></h1>
      </div>
      <?php endif; ?>
      
      
      <!-- Sort if necessary -->
      <?php
        if ( $_GET['sortby'] === 'Event Date' ) query_posts( $query_string. '&orderby=meta_value&meta_key=Event+Date&order=DESC' );
      ?>
      
      <div class="posts-wrapper">
        <!-- Sidebar -->
        <?php 
        $sidebar_activated = true;
        if ( $is_sidelinks_view ) {
          sidelinks_nav( get_category( get_query_var( 'cat' ) ), $all_in_cat );
          dynamic_sidebar( 'sidelinks_sidebar' );
        } else {
          if ( !dynamic_sidebar( 'card_left_sidebar' ) ) $sidebar_activated = false;
        } ?>
        
        <!-- Post loop -->
        <?php if ($sidebar_activated): ?><div class="col-sm-9"><?php endif; ?>
        
          <!-- Sidelink -->
          <?php if ( $is_sidelinks_view ): ?>
            <!-- Display all post content here for sidelink view -->
            <?php $sidelink_post_index = 0; while( have_posts() ) : the_post(); ?>
              <div id="p<?php echo $sidelink_post_index; ?>" class="<?php if ( !$sidelink_post_index++ ) { echo 'sidelink-post-active'; } else { echo 'sidelink-post-inactive'; }?>">
                <?php if( has_post_thumbnail() ): ?>
                <div class="post-thumbnail-positioning">
                  <div class="post-thumbnail-wrapper">
                    <?php the_post_thumbnail( 'full', array( 'class' => 'post-thumbnail'  )  ); ?>
                    <?php $post_date = get_post_meta( get_the_ID(), 'Event Date', true ); if ( $post_date !== '' ): ?>
                    <div class="post-thumbnail-event-date"><?php echo date( 'd M Y H:i' , strtotime( $post_date ) ); ?></div>
                    <?php endif; ?>
                  </div>
                </div>
                <?php endif; ?>
                <div class="post-content"><p><?php the_content(); ?></p></div>
              </div>
            <?php endwhile; ?>
          <?php else: ?>
          <!-- Cards -->
          <div id="masonry-grid" data-columns>
            <?php while ( have_posts() ) : the_post(); if ( in_category( 'hidden' ) ) continue; ?>
            <div class="card-post-pad">
              <div class="card-post-wrapper">
                <a href="<?php echo get_permalink();?>" class="card-post">
                  <?php the_post_thumbnail( 'full', array( 'class' => 'event-content-thumbnail' ) ); ?>
                  <p class="event-content-title"><?php the_title(); ?></p>
                  <div class="event-content-text">
                    <p><?php the_excerpt(); ?></p>
                  </div>
                </a>
                <?php $post_date = get_post_meta( get_the_ID(), 'Event Date', true ); if ( $post_date !== '' ): ?>
                <div class="event-content-date">
                  <hr class="card-divider">
                  <span class="event-date-string"><?php echo 'On '. date( 'D, d M Y H:i' , strtotime( $post_date ) ); ?></span>
                </div>
                <?php endif; ?>
              </div>
            </div>
            <?php endwhile; ?>
          </div>
          <div class="card-page-nav grid-column size-1of1">
            <?php 
              $previous_link = get_previous_posts_link( '&lsaquo; Previous Page' );
              $next_link = get_next_posts_link( 'Next Page &rsaquo;' );
              if ( $previous_link || $next_link ):
            ?>
            <div class="clearfix">
              <span class="event-prev-page"><?php echo $previous_link; ?></span>
              <span class="event-next-page"><?php echo $next_link; ?></span>
            </div>
            <?php endif; ?>
          </div>
          <?php endif; ?> <!-- ends if( $is_sidelinks_view ) -->
        
        <?php if ($sidebar_activated): ?></div><?php endif; ?>
        
      </div>
      
    </div>
    
<?php get_footer(); ?>