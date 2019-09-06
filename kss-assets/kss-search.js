(function (window, document) {
	'use strict';

	// Set the configuration values on object creation.

	var KssSearch = function (config) {
		this.inputID = config.inputID || 'kss-search-field';
		this.searchButtonID = config.searchButtonID || 'kss-search-button';
		this.searchAreaClass= config.searchAreaClass || ".id-kss-nav-menu";
		this.init();
	};

	var markInstance;

	// Initialize
	KssSearch.prototype.init = function () {

		var self = this;
		var searchField = document.getElementById( this.inputID );
		var searchButton = document.getElementById( this.searchButtonID );

		if(!searchField) {
			return false;
		}

		var options = {
		  fuzzySearch: {
			    searchClass: searchField,
			    location: 0,
			    distance: 100,
			    threshold: 0.4,
			    multiSearch: true
			  }
		};

		markInstance = new Mark( this.searchAreaClass );
		listInstance = new List( this.searchAreaClass, options );


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
				markInstance.mark( text );
			}
		});


	};


	// Export to DOM global space.
	window.KssSearch = KssSearch;

})(window, document);
