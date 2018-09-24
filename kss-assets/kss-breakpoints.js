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

    if(!breakpointsControlContainer) {
      //toolbar not present
      return false;
    }

    self.createBreakpointsControl(self, breakpointsControlContainer);

    // Initialize all guides toggle buttons.
    var elementList = document.getElementsByClassName('id-kss-breakpoints-control-button');

    for (var button of elementList) {
      button.onclick = self.updateBreakpoints.bind(self);
    }

    // Simulate click on the first breakpoint control to set defaults.
    elementList[0].classList.add('id-kss-breakpoints-control-active');
    elementList[0].childNodes.checked = true;

    var examples = document.getElementsByClassName('id-kss-example-wrapper');

    for (var example of examples) {
      example.style.width = elementList[0].childNodes[0].value + 'px';
    }
  };

  // Create breakpoint controls
  KssBreakpoints.prototype.createBreakpointsControl = function (self, container) {
    container.innerHTML += '<span class="id-kss-toolbar-label">View examples as:</span>';

    for (var breakpoint in self.allowedBreakpoints) {
      container.innerHTML += '<label class="id-kss-breakpoints-control-button id-kss-breakpoints-control-' + breakpoint + '"><input type="radio" name="breakpoint" value="' + self.allowedBreakpoints[breakpoint] + '"> ' + breakpoint + '</label>';
    }
    // add button for "Full Size"
    container.innerHTML += '<label class="id-kss-breakpoints-control-button id-kss-breakpoints-control-full"><input type="radio" name="breakpoint" value="full">Full</label>';
  };

  // Update breakpoints when button is pressed.
  KssBreakpoints.prototype.updateBreakpoints = function (self) {
    document.getElementsByTagName('body')[0].classList.toggle(this.bodyClass);

    var active = document.getElementsByClassName('id-kss-breakpoints-control-active');

    for (var button of active) {
      button.classList.remove('id-kss-breakpoints-control-active')
    }

    console.log(self);

    self.srcElement.parentElement.classList.add('id-kss-breakpoints-control-active');

    // Update iframes to appropriate width
    var examples = document.getElementsByClassName('id-kss-example-wrapper');

    for (var example of examples) {
      if ( self.target.value == "full" ) {
        example.style.width = '100%';
      } else {
        example.style.width = self.target.value + 'px';
      }

    }
  };

  // Export to DOM global space.
  window.KssBreakpoints = KssBreakpoints;

})(window, document);
