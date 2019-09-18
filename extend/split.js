module.exports = function(Handlebars) {
  	Handlebars.registerHelper('splitTitle', function(context, depth) {
  		//console.log(context + " " + depth);
  		var newDepth = depth - 1; //kss is not zero based counting
  		var newTitle;
  		//console.log( newDepth );
  		//console.log( context.split('.')[newDepth] );
  		//console.log("+++++++++++++++++++++++++++++++++++");
  		//
  		if(context){
  			newTitle = context.split('.')[newDepth];
  		}
	    return newTitle;
	});
};