( function( window, $, undefined ) {
	'use strict';
	
	// Add toggles to menus
	$( 'nav' ).before( '<div class="menu-toggle"><span></span></div>' );
	// Add toggles to sub menus
	$( 'nav .sub-menu' ).before( '<div class="sub-menu-toggle"></div>' );

	// Show/hide the navigation
	$( '.menu-toggle, .sub-menu-toggle' ).on( 'click', function() {
		var $this = $( this );
		$this.toggleClass( 'active' );
		$this.next( 'nav, .sub-menu' ).slideToggle( 'slow' );
	});

})( this, jQuery );