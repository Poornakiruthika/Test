module.exports = {
  before : function ( browser ) {
    browser.
    url( "http://widgets.boxxspring.com/MjE1MSw0MDUyNDkyOA?autoplay=true" )
  },
  'Autoplay' : function ( autoplay ) {
    autoplay.
    url( function ( get_url ) {
	    //Check the string "autoplay=true" present in URL 
      var url_str = get_url.value;
      var url_data = url_str.match( /autoplay=true/g );
      if ( url_data == "autoplay=true" ) {
        autoplay.
        pause( 9000 ).
        waitForElementVisible( ".unimatrix-video-controls", 9000 ).
        pause( 9000 ).
		    //Get the current time of the videoplayer
        moveToElement( '.unimatrix-video-time-slider-container', 0, 0 ).
        getText( ".unimatrix-video-current-time-display > span", function ( currenttime ) {
          var autoplay_time = currenttime.value;
            //Check the video playing automatically
            if ( autoplay_time > '00:00' ) {
              console.log( "Autoplay functionality is working" );
            }
            else {
              autoplay.
              assert.fail( undefined, undefined,"Autoplay functionality is not working" );
            }
          } );
      }
      else {
        autoplay.
        assert.fail( url_data, "autoplay=true","Player doesn't support autoplay option" );
      }
      autoplay.end();
    } );
  },
};