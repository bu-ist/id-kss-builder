(function (window, document) {
  'use strict';

  // Set the configuration values on object creation.
  // - idPrefix: The string that uniquely prefixes the ID of all elements that
  //   can receive the fullscreen focus.
  // - bodyClass: The class that is set on the body element when the fullscreen
  //   mode is toggled on.
  // - elementClass: the class that is set on the element that is receiving the
  //   fullscreen focus.
  var KssSidebar = function (config) {
    this.idPrefix = config.idPrefix || 'kss-sidebar-';
    this.bodyClass = config.bodyClass || 'kss-sidebar-open';
    this.elementClass = config.elementClass || 'has-sidebar';

    this.init();
  };

  // Initialize the page to see if the fullscreen mode should be immediately
  // turned on.
  KssSidebar.prototype.init = function () {
    // Check the location hash to see if it matches the idPrefix.
    // if (window.location.hash.slice(0, this.idPrefix.length + 1) === '#' + this.idPrefix) {
    //   this.setFocus(window.location.hash.slice(1 + this.idPrefix.length));
    // }

    var self = this;
    // Initialize sidebar button.
    var checkbox = document.querySelectorAll('.id-kss-sidebar-control input')[0];

    //set the sidebar class
    self.toggleSidebar( checkbox.checked );

    if (checkbox.checked == true) {
      console.log("true");

    } else {
      console.log("not checked");
    }

    // setup an event listener on the checkbox
    checkbox.addEventListener('change', function(event) {
      console.log(event.target.checked);
      self.toggleSidebar( event.target.checked );
    });

  };

  // Activation function that takes the ID of the element that will receive
  // fullscreen focus.
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
