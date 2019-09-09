(function (window, document) {
	'use strict';

	// Set the configuration values on object creation.

	var KssSearch = function (config) {
		this.inputID = config.inputID || 'kss-search-field';
		this.searchButtonID = config.searchButtonID || 'kss-search-button';
		this.searchAreaClass= config.searchAreaClass || "id-kss-nav-menu";
		this.init();
	};

	var markInstance;

	var $items = $('.id-kss-nav-menu-child-section .id-kss-nav-name');

	// Initialize
	KssSearch.prototype.init = function () {

		var self = this;
		var searchField = document.getElementById( this.inputID );
		var searchButton = document.getElementById( this.searchButtonID );

		if(!searchField) {
			return false;
		}

		markInstance = new Mark( this.searchAreaClass );

		// setup an event listener on the search field
		searchField.addEventListener('input', function(event) {
			console.log(event.target.value);
			self.mark( event.target.value );

			if ( '' !== event.target.value ) {
				$('.id-kss-nav-menu').addClass( 'search-on' );
			} else {
				$('.id-kss-nav-menu').removeClass( 'search-on' );
			}
		});
		searchField.addEventListener('change', function(event) {
			console.log(event.target.value);
			self.mark( event.target.value );
		});

		searchButton.addEventListener('click', function(event) {
			console.log(event.target.value);
			event.preventDefault();
			self.mark( searchField.value );
		});
	};

	KssSearch.prototype.mark = function( text ) {

		markInstance.unmark({
			done: function() {
				//$( '.id-kss-nav-menu-item, .id-kss-section-toggle' ).show();
				$( '#search-results' ).replaceWith( '<li class="empty">No results found.</li>' );

				if ( text ) {
					markInstance.mark( text );
					// $( '.id-kss-section-toggle' ).hide();
					// $( '.id-kss-nav-menu-depth-2' ).has( 'mark' );
					// $( '.id-kss-nav-menu-depth-2' ).not( ":has(mark)" ).hide();
					$( '.id-kss-nav-menu-depth-2' ).has( 'mark' ).appendTo( '#search-results' );
				}
			}
		});


	};


	// Export to DOM global space.
	window.KssSearch = KssSearch;

})(window, document);
