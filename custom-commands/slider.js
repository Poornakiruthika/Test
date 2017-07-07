//this function is for switch To Secondary Window when using FB, twitter, google+
exports.command = function ( path, xoffset, yoffset ) {
	this.
    //Drag and drop the progress bar handle backward
	  click( ".unimatrix-video-time-slider-container" ).
	  pause( 2000 ).
	  mouseButtonDown( 0 ).
	  pause( 2000 ).
	  moveToElement( path, xoffset, yoffset ).
	  pause( 2000 ).
	  mouseButtonUp( 0 )
  return this;
};
