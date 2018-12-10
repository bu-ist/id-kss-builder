//iframify https://github.com/edenspiekermann/iframify
(function (global) {
  var metaViewport = document.querySelector('meta[name="viewport"]');
  var metaCharset = document.querySelector('meta[charset]');
  var metaViewportStr = metaViewport && metaViewport.outerHTML || '';
  var metaCharsetStr = metaCharset && metaCharset.outerHTML || '';
  var queryCache = {};

  /**
   * Get the styling nodes to inject in the head of the embedded document
   *
   * @param  {String} selector
   * @return {String}
   */
  function getStylingNodes (selector) {
    if (typeof queryCache[selector] === 'undefined') {
      queryCache[selector] = Array.prototype.map.call(
        document.querySelectorAll(selector),
        function (stylesheet) {
          return stylesheet.outerHTML;
        }
      ).join('');
    }

    return queryCache[selector];
  }

  /**
   * Get the content for the iframified version of a node.
   *
   * @param  {HTMLElement} node
   * @param  {Object} options
   * @return {String}
   */
  function getIframeContentForNode (node, options) {
    return '<!doctype html>' +
      '<html ' + options.htmlAttr + '>' +
      '<head>' +
        options.metaCharset +
        options.metaViewport +
        options.stylesheets +
        options.headExtra +
      '</head>' +
      '<body ' + options.bodyAttr + '>' +
        node.innerHTML +
        options.bodyExtra +
      '</body>' +
      '</html>';
  }

  /**
   * Format an object of attributes into a HTML string
   *
   * @param  {Object} attrObj
   * @return {String}
   */
  function formatAttributes (attrObj) {
    var attributes = [];

    for (var attribute in attrObj) {
      attributes.push(attribute + '="' + attrObj[attribute] + '"');
    }

    return attributes.join(' ');
  }

  /**
   * Get document height (stackoverflow.com/questions/1145850/)
   *
   * @param  {Document} doc
   * @return {Number}
   */
  function getDocumentHeight (doc) {
    doc = doc || document;
    var body = doc.body;
    var html = doc.documentElement;

    return Math.max(
      body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight
    );
  }

  function getOptions (options) {
    var opts = options || {};
    opts.htmlAttr = formatAttributes(opts.htmlAttr || {});
    opts.bodyAttr = formatAttributes(opts.bodyAttr || {});
    opts.sizingTimeout = opts.sizingTimeout || 500;
    opts.stylesheets = getStylingNodes(opts.stylesSelector || 'link[rel*=stylesheet], style');
    opts.metaCharset = opts.metaCharset || metaCharsetStr;
    opts.metaViewport = opts.metaViewport || metaViewportStr;
    opts.headExtra = opts.headExtra || '';
    opts.bodyExtra = opts.bodyExtra || '';

    return opts;
  }

  /**
   * Transform a collection of nodes into an iframe version of themselves
   * including all the styles they need to perform correctly.
   *
   * @param  {HTMLElement} nodes
   * @param  {Object} options
   * @return undefined
   */
  function iframify (node, options) {
    options = getOptions(options);

    var iframe = document.createElement('iframe');
    iframe.srcdoc = getIframeContentForNode(node, options);
    node.parentNode.replaceChild(iframe, node);

    setTimeout(function () {
      var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
      iframe.height = getDocumentHeight(iframeDocument);
    }, options.sizingTimeout);

    return iframe;
  }

  global.iframify = iframify;
}(window));


	// create unique ids
	function uniqId() {
		return Math.round(new Date().getTime() + (Math.random() * 100));
	}


	$( document ).ready(function() {

		var kssStorage = window.localStorage;

		/*

		Loop through all example markup blocks
		and copy the example markup into a dynamically
		created iframe. Add the WordPress theme's stylesheet
		to the iframe so styles are isolated and setup
		events to handle resizing of the iframe

		*/


		$('.id-kss-example-wrapper').each(function(){

			var newID = uniqId();

			$(this).attr("id", newID ); // add a unique ID



			//var $iframe = $(this).find('.id-kss-example-iframe');
			//var $iframeWindow = $iframe.contents();
			var $markup = $(this).find('.template-iframe');
			var markup = $markup.html(); // get the current markup and store
			// var $iframeSrc = $( $.parseHTML( markup ) ).find('.iframe-wrapper').attr("id", newID );
			// $markup.html( '' ).prepend( $iframeSrc );

			//markup = markup.replace('id=""', 'id="'+newID+'"');

			var iframe = iframify( $(this).find('.template-iframe')[0], {
			  stylesSelector: 'null', //we don't want to use this feature (gets styles from parent page)
			  headExtra: '<link rel="stylesheet" href="'+exampleStylesheetURL+'"> \
			  <link rel="stylesheet" href="'+themeStylesheetURL+'"> \
			  <script type="text/javascript">var iframeID = '+newID+';</script> \
			  <script type="text/javascript" src="kss-assets/jquery.js"></script> \
			  <script type="text/javascript" src="kss-assets/iframe-scripts.js"></script> \
			  <script type="text/javascript" src="'+themeScriptsURL+'"></script>',
			  metaViewport: '<meta name="viewport" content="width=device-width">',
			  sizingTimeout: 1000
			});

			var $iframe = $( iframe );
			var $iframeWindow = $iframe.contents();
			$iframe.addClass('id-kss-example-iframe');


			$markup.remove(); //now remove the current (old) markup example

			// setTimeout(function(){
			// 	$iframe[0].contentWindow.setHeight();
			// }, 1000);

			// //add jquery to the iframe
			// var jquery = $iframe[0].contentWindow.document.createElement("script");
			// 	jquery.type = "text/javascript";
			// 	jquery.src = "kss-assets/jquery.js";
			// 	$iframe[0].contentWindow.document.head.appendChild(jquery);


			// jquery.onload = function() {

			// 	//after jquery is loaded add the iframe scripts js file
			// 	var script = $iframe[0].contentWindow.document.createElement("script");
			// 	script.type = "text/javascript";
			// 	script.src = "kss-assets/iframe-scripts.js";
			// 	$iframe[0].contentWindow.document.head.appendChild(script);


			// 	script.onload = function() {

			// 		if( themeScriptsURL ) {
			// 			//lets add the theme scripts js file
			// 			var themescript = $iframe[0].contentWindow.document.createElement("script");
			// 			themescript.type = "text/javascript";
			// 			themescript.src = themeScriptsURL;
			// 			$iframe[0].contentWindow.document.head.appendChild(themescript);
			// 		}

			// 		if( exampleStylesheetURL ) {
			// 			//lets add the stylesheet from gruntfile options paramter
			// 			var examplestyles = $iframe[0].contentWindow.document.createElement("link");
			// 			examplestyles.rel = "stylesheet";
			// 			examplestyles.href = exampleStylesheetURL;
			// 			examplestyles.type = "text/css";
			// 			$iframe[0].contentWindow.document.head.appendChild(examplestyles);
			// 		}

			// 		//lets add the stylesheet from the WordPress Theme to each iframe
			// 		var styles = $iframe[0].contentWindow.document.createElement("link");
			// 		styles.rel = "stylesheet";
			// 		styles.href = themeStylesheetURL;
			// 		styles.type = "text/css";
			// 		$iframe[0].contentWindow.document.head.appendChild(styles);


			// 		//inject the example markup into the iframe body
			// 		$iframeWindow
			// 			.contents()
			// 			.find( 'body' )
			// 			.append( markup )
			// 			.find('.iframe-wrapper').attr("id", newID );




			// 		setTimeout(function(){
			// 			$iframe[0].contentWindow.setHeight();
			// 		}, 1000);

			// 	}

			// };

			$(this).resizable({
				handleSelector: ".id-kss-example-iframe-handle",
				resizeHeight: false,
				onDrag: function (e, $el, newWidth, newHeight, opt) {
					// set all example wrappers to the new width on drag
					$('.id-kss-example-wrapper').width( newWidth );

				}
			});

		});





  		//
  		// Theme (publication) Tabs for iFrame Examples
  		// sets up the event handlers and loads the last
  		// state from local storage for the tabbed controller
  		// that displays iframe examples of a block for
  		// a specific theme (defined in the Gruntfile)
  		//


	    $('.id-kss-example-tabs').each(function(){
	    	var tabs = $(this);

	    	tabs.children('nav').children('a').each(function(){
	    		var slug = $(this).attr("href").split('#')[1];
	    		$(this).on('click', function(e){
	    			e.preventDefault();

	    			//remove active class from previous and add to new button
	    			tabs.children('nav').children('a.active').removeClass("active");
	    			$(this).addClass('active');

	    			tabs.find('.id-kss-example-tab:visible').hide();
	    			tabs.find('.id-kss-example-tab#'+slug).show();

	    			kssStorage.setItem( 'activetheme', slug );
	    		});
	    	});

	    });


	    //check localstorage for a saved active theme
	    if( kssStorage.getItem( 'activetheme' ) ) {
	      $('.id-kss-example-tabs > nav a.'+kssStorage.getItem( 'activetheme' ) ).trigger('click');
	    } else {
	      $('.id-kss-example-tabs > nav').children('a').first().trigger("click");
	    }


	});
