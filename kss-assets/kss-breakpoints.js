(function (window, document) {
  'use strict';

  var KssBreakpoints = function (config) {
    this.bodyClass = config.bodyClass || 'kss-breakpoints-mode';

    var defaultBreakpoints = {
      min: '320',
      xs: '500',
      sm: '768',
      md: '992',
      lg: '1200',
    }

    this.allowedBreakpoints = config.allowedBreakpoints || defaultBreakpoints;

    this.init();
  };

  KssBreakpoints.prototype.init = function () {
    var self = this,
        breakpointsControlContainer = document.getElementById('id-kss-breakpoints-control');

    self.createBreakpointsControl(self, breakpointsControlContainer);

    // Initialize all guides toggle buttons.
    var elementList = document.getElementsByClassName('id-kss-breakpoints-control-button');
    elementList[0].classList.add('id-kss-breakpoints-control-active');
    elementList[0].childNodes.checked = true;

    for (var button of elementList) {
      button.onclick = self.updateBreakpoints.bind(self);
    }
  };

  // Create breakpoint controls
  KssBreakpoints.prototype.createBreakpointsControl = function (self, container) {
    container.innerHTML += '<span class="id-kss-toolbar-label">View examples as:</span>';

    for (var breakpoint in self.allowedBreakpoints) {
      container.innerHTML += '<label class="id-kss-breakpoints-control-button id-kss-breakpoints-control-' + breakpoint + '"><input type="radio" name="breakpoint" value="' + self.allowedBreakpoints[breakpoint] + '"> ' + breakpoint + '</label>';
    }
  };

  // Toggle the guides mode.
  KssBreakpoints.prototype.updateBreakpoints = function (self) {
    document.getElementsByTagName('body')[0].classList.toggle(this.bodyClass);

    var active = document.getElementsByClassName('id-kss-breakpoints-control-active');

    for (var button of active) {
      button.classList.remove('id-kss-breakpoints-control-active')
    }

    self.explicitOriginalTarget.classList.add('id-kss-breakpoints-control-active');

    // Update iframes to appropriate width
    var examples = document.getElementsByClassName('id-kss-example-wrapper');

    for (var example of examples) {
      example.style.width = self.target.value + 'px';
    }
  };

  // Export to DOM global space.
  window.KssBreakpoints = KssBreakpoints;

})(window, document);
