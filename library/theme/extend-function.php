<?php
	
	//
	// FUNCTIONS
	//
	
	function _pr( $a ) {
	  print( '<pre class="dump">' );
	  print_r( $a );
	  print( '</pre>' );
	}

	//
	// FILTERS
	//
	// TO ADD CUSTOM POST TYPES with categories in ARCHIVER LOOP
	function add_custom_types_to_tax( $query ) {
	  if( is_category() || is_tag() && empty( $query->query_vars['suppress_filters'] ) ) {

	    // Get all your post types
	    $post_types = get_post_types();

	    $query->set( 'post_type', $post_types );
	    return $query;
	  }
	}
	add_filter( 'pre_get_posts', 'add_custom_types_to_tax' );



	// ACTIONS

	function pagesize( $query ) {
    if ( is_admin() || ! $query->is_main_query() )
        return;

    // if ( is_home() ) {
    //     // Display only 1 post for the original blog archive
    //     $query->set( 'posts_per_page', 1 );
    //     return;
    // }

    // if ( is_post_type_archive( 'portfolio' ) ) {
    //     // Display 50 posts for a custom post type called 'movie'
    //     $query->set( 'posts_per_page', -1 );
    //     return;
    // }

	}
	//add_action( 'pre_get_posts', 'pagesize', 1 );


 ?>