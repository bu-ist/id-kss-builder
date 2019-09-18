var slug = require('slugg');
module.exports = function(Handlebars) {
  	Handlebars.registerHelper('slug', function(context) {
	    return slug(context);
	});
};
