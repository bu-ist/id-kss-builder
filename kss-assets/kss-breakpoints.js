(function (window, document) {
  'use strict';

  var KssBreakpoints = function (config) {
    this.bodyClass = config.bodyClass || 'kss-breakpoints-mode';

    this.init();
  };

  KssBreakpoints.prototype.init = function () {
    var self = this;
    // Initialize all guides toggle buttons.
    var elementList = document.querySelectorAll('id-kss-breakpoints-control-button');
    for (var button of elementList) {
      button.onclick = self.updateBreakpoints.bind(self);
    }
  };

  // Toggle the guides mode.
  KssBreakpoints.prototype.updateBreakpoints = function () {
    document.getElementsByTagName('body')[0].classList.toggle(this.bodyClass);
    this.classList.toggle('some-class');
  };

  // Export to DOM global space.
  window.KssBreakpoints = KssBreakpoints;

})(window, document);
