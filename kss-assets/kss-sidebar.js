(function (window, document) {
  'use strict';

  // Set the configuration values on object creation.

  var KssSidebar = function (config) {
    this.bodyClass = config.bodyClass || 'kss-sidebar-open';
    this.init();
  };

  // Initialize the page to see if the sidebar should be immediately
  // turned on.
  KssSidebar.prototype.init = function () {


    var self = this;
    // Initialize sidebar button.
    var checkbox = document.querySelectorAll('.id-kss-sidebar-control input')[0];
    if(!checkbox) {
      //toolbar/sidebar not present
      return false;
    }
    //set the sidebar class
    self.toggleSidebar( checkbox.checked );

    // setup an event listener on the checkbox
    checkbox.addEventListener('change', function(event) {
      console.log(event.target.checked);
      self.toggleSidebar( event.target.checked );
    });

  };

  KssSidebar.prototype.toggleSidebar = function( status ) {

    if ( status == false ) {
      //not checked so hide sidebar
      document.body.classList.remove( this.bodyClass );

    } else {
      //assume checked and sidebar visible
      document.body.classList.add( this.bodyClass );
    }
  };

  // Export to DOM global space.
  window.KssSidebar = KssSidebar;

})(window, document);

jQuery.ajax({
   url: 'index.html',
   type:'GET',
   success: function(data){
       $('#id-kss-sidebar').html($(data).find('#id-homepage-nav').html());

       var currentSection = $('#id-kss-current-section').text().toLowerCase();
      $('.section-' + currentSection).addClass('active');
   }
});

$('.id-kss-section-toggle').click(function() {
  $('.active').removeClass('active');
  $('.section-' + $(this).data('section')).addClass('active');
});