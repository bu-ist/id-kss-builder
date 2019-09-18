module.exports = function(Handlebars) {
  Handlebars.registerHelper('json', function(context) {
	    return JSON.stringify(context);
	});
};