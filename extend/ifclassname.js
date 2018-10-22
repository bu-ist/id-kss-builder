module.exports = function(Handlebars) {
	Handlebars.registerHelper('ifClassname', function(classname, hideclass ) {
		var found = false;

		for (var i = 0; i < hideclass.length; i++) {

		    if( classname.includes(hideclass[i]) ) {
		    	//console.log(classname + " | " + hideclass[i]  + " | true" );
		    	found = true;
		    	break;
		    }

		}
		return found;


	});
};