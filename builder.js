'use strict';

/**
 * This module is used to load the base KSS builder class needed by this builder
 * and to define any custom CLI options or extend any base class methods.
 *
 * Note: this module is optional. If a builder does not export a KssBuilderBase
 * sub-class as a module, then kss-node will assume the builder wants to use
 * the KssBuilderBaseHandlebars class.
 *
 * This file's name should follow standard node.js require() conventions. It
 * should either be named index.js or have its name set in the "main" property
 * of the builder's package.json. See
 * http://nodejs.org/api/modules.html#modules_folders_as_modules
 *
 * @module kss/builder/handlebars
 */

const path = require('path');
const handlebarsWax = require('handlebars-wax');
const fs = require('fs');

// We want to extend kss-node's Handlebars builder so we can add options that
// are used in our templates.
let KssBuilderBaseHandlebars;

try {
  // In order for a builder to be "kss clone"-able, it must use the
  // require('kss/builder/path') syntax.
  KssBuilderBaseHandlebars = require('kss/builder/base/handlebars');
} catch (e) {
  // The above require() line will always work.
  //
  // Unless you are one of the developers of kss-node and are using a git clone
  // of kss-node where this code will not be inside a "node_modules/kss" folder
  // which would allow node.js to find it with require('kss/anything'), forcing
  // you to write a long-winded comment and catch the error and try again using
  // a relative path.
  KssBuilderBaseHandlebars = require('../base/handlebars');
}

/**
 * A kss-node builder that takes input files and builds a style guide using
 * Handlebars templates.
 */
class KssBuilderHandlebars extends KssBuilderBaseHandlebars {
  /**
   * Create a builder object.
   */
  constructor() {
    // First call the constructor of KssBuilderBaseHandlebars.
    super();

    // Then tell kss which Yargs-like options this builder adds.
    this.addOptionDefinitions({
      title: {
        group: 'Style guide:',
        string: true,
        multiple: false,
        describe: 'Title of the style guide',
        default: 'KSS Style Guide'
      },
      colorPrimary: {
        group: 'Builder Colors:',
        string: true,
        multiple: false,
        describe: 'Primary Color for this Styleguide'
      },
      colorSecondary: {
        group: 'Builder Colors:',
        string: true,
        multiple: false,
        describe: 'Secondary Color for this Styleguide'
      },
      gitURL: {
        group: 'Builder Git',
        string: true,
        multiple: false,
        describe: 'A url to the git repo'
      },
      gitURLCSSDEV: {
        group: 'Builder Git',
        string: true,
        multiple: false,
        describe: 'A url to the git repo css-dev folder'
      },
      exampleStylesheetURL: {
        group: 'Example Stylesheet',
        string: true,
        multiple: false,
        describe: 'A url to a stylesheet to include in the example iframmes'
      },
      themes: {
        group: 'Themes',
        string: false,
        multiple: true,
        describe: 'Setup Themes within a styleguide'
      },
      partialsDir: {
        group: 'Partials',
        string: true,
        multiple: false,
        describe: 'Path to look for hbs partials in'
      },
      debug: {
        group: 'Debug Options',
        string: false,
        multiple: false,
        describe: 'If set to "true", debug output of kss data will be printed on each page and stored as a js var'
      }
    });
  }


  /**
   * Allow the builder to preform pre-build tasks or modify the KssStyleGuide
   * object.
   *
   * The method can be set by any KssBuilderBase sub-class to do any custom
   * tasks after the KssStyleGuide object is created and before the HTML style
   * guide is built.
   *
   * The builder could also take this opportunity to do tasks like special
   * handling of "custom" properties or running Sass or Bower tasks.
   *
   * The parent class sets up access for this builder to an object containing
   * the options of the requested build (as `this.options`), and the global
   * Handlebars object (as `this.Handlebars`).
   *
   * @param {KssStyleGuide} styleGuide The KSS style guide in object format.
   * @returns {Promise.<KssStyleGuide>} A `Promise` object resolving to a
   *   `KssStyleGuide` object.
   */
  prepare(styleGuide) {
    // First call the prepare() of the parent KssBuilderBaseHandlebars class.
    // Since it returns a Promise, we do our prep work in a then().
    return super.prepare(styleGuide).then(styleGuide => {
      // Load this builder's extra Handlebars helpers.


      // Allow a builder user to override the {{section [reference]}} helper
      // with the --extend setting. Since a user's handlebars helpers are
      // loaded first, we need to check if this helper already exists.
      if (!this.Handlebars.helpers['section']) {
        /**
         * Returns a single section, found by its reference
         * @param  {String} reference The reference to search for.
         */
        this.Handlebars.registerHelper('section', function(reference, options) {
          let section = options.data.root.styleGuide.sections(reference);

          return section.toJSON ? options.fn(section.toJSON()) : options.inverse('');
        });
      }

      // Allow a builder user to override the {{eachSection [query]}} helper
      // with the --extend setting.
      if (!this.Handlebars.helpers['eachSection']) {
        /**
         * Loop over a section query. If a number is supplied, will convert into
         * a query for all children and descendants of that reference.
         * @param  {Mixed} query The section query
         */
        this.Handlebars.registerHelper('eachSection', function(query, options) {
          let styleGuide = options.data.root.styleGuide;

          if (!query.match(/\bx\b|\*/g)) {
            query = query + '.*';
          }
          let sections = styleGuide.sections(query);
          if (!sections.length) {
            return options.inverse('');
          }

          let l = sections.length;
          let buffer = '';
          for (let i = 0; i < l; i += 1) {
            buffer += options.fn(sections[i].toJSON());
          }

          return buffer;
        });
      }



      //
      //
      // Look for partials in directories
      //
      var partialsDir = this.options.extend;
      partialsDir.push( __dirname + '/extend/partials' );

      //add the directory supplied in gruntfile.js from child theme for instance
      //this should be a base directory like 'css-dev' that we want to search for
      //.hbs partial files
      if ( this.options.partialsDir ) {
        partialsDir.push( process.cwd() + '/' + this.options.partialsDir );
      }

      //the Wax module requires the file extension and **/* pattern to be
      //added to the end of each path so lets loop through the array
      //and add it to each directory path
      for(var i=0;i<partialsDir.length;i++){
          partialsDir[i] = partialsDir[i]+"/**/*.hbs";
      }


      var wax = handlebarsWax(this.Handlebars, { bustCache: true })
          // Partials
          .partials(partialsDir, {
              parsePartialName: function(options, file) {
                  // options.handlebars
                  // file.cwd
                  // file.base
                  // file.path
                  // file.exports

                  //instead of using a long partial name that
                  //incorporates the file path, lets set it to
                  //just the filename
                  var filename = file.path.replace(/^.*[\\\/]/, '')
                  filename = filename.split('.')[0];//get filename without extension
                  return filename;
              }
          });




      return Promise.resolve(styleGuide);
    });
  }

  // add builder extend
  prepareExtend(templateEngine) {
    this.options.extend.push(path.resolve(__dirname, 'extend'));

    return super.prepareExtend(templateEngine);
  }

    /***************************************************************************************

  Added Sept 17, 2018:

  Add in custom properties so they don't
  have to be defined in the custom child
  theme gruntfile that this builder and template
  supports.

  Git-Source: url to github
  Status: Current, Planned, Deprecated, Front-End Ready, Back-end Ready, Tested

  ***************************************************************************************/


  normalizeOptions(keys) {
    if (this.options.custom) {
      this.options.custom = Array.from(new Set(this.options.custom.concat([
        'status',
        'hidden',
        'git-source',
        'is-subheader',
        'is-header',
        'template-override'
      ])))
    }

    return super.normalizeOptions(keys)
  }

}

module.exports = KssBuilderHandlebars;
