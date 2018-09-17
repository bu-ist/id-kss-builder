(function (window, document) {
  'use strict';

  var KssBreakpoints = function (config) {
    this.bodyClass = config.bodyClass || 'kss-breakpoints-mode';

    this.init();
  };

  KssBreakpoints.prototype.init = function () {
    var self = this;
    // Initialize all guides toggle buttons.
    var elementList = document.getElementsByClassName('id-kss-breakpoints-control-button');
    for (var button of elementList) {
      button.onclick = self.updateBreakpoints.bind(self);
    }
  };

  // Toggle the guides mode.
  KssBreakpoints.prototype.updateBreakpoints = function (self) {
    document.getElementsByTagName('body')[0].classList.toggle(this.bodyClass);

    var active = document.getElementsByClassName('id-kss-breakpoints-control-active');

    for (var button of active) {
      button.classList.remove('id-kss-breakpoints-control-active')
    }

    console.log(self);

    self.explicitOriginalTarget.classList.add('id-kss-breakpoints-control-active');
  };

  // Export to DOM global space.
  window.KssBreakpoints = KssBreakpoints;

})(window, document);
