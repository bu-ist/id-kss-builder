$( document ).ready(function() {

	var $wrapper = $('html');
	var height = $wrapper.height();
	var id = $wrapper.attr("id");

	setHeight( height );

	function setHeight( height ){
		var $parent = $(window.parent.document).find('#'+id);//find iframe parent div by id
		$parent.height( height ); //set the new height;
	}

	$(window).on('resize', function(e){
		var height = $wrapper.height();
		setHeight( height );
	})
});