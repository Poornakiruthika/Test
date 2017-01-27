module.exports = {
  before : function ( browser ) {
    browser.
    url( "http://widgets.boxxspring.com/MjE1MSw0MDUyNDkyOA?endslate=true" )
  },
  'Endslate' : function ( endslate ) {
    endslate.
    url( function ( get_url ) {
	    //Check the string "endslate=true" present in URL 
      var url_str = get_url.value;
      var url_data = url_str.match( /endslate=true/g );
      if ( url_data == "endslate=true" ) {
        endslate.
				playvideo();
				endslate.
		    //Get the duration of the videoplayer
        getText( ".unimatrix-video-duration-display > span", function ( player_durationtime ) {
          console.log( player_durationtime.value );
          endslate.
          click( ".unimatrix-video-time-slider-container" ).
          pause( 1000 ).
		      //Drag and drop to the end of the slider
          mouseButtonDown( 0 ).
          pause( 1000 ).
          moveToElement( '.unimatrix-video-time-slider-container', 700, 0 ).
          pause( 1000 ).
          mouseButtonUp( 0 ).
          pause( 2000 ).
          getText( ".unimatrix-video-current-time-display > span", function ( player_currenttime ) {
            console.log( player_currenttime.value )
			      //Check the video reach to the end of the slider
            if ( player_currenttime.value == player_durationtime.value ) {
              endslate.
              pause( 5000 ).
			        //Check the gadgets-endslate visibility 
              waitForElementVisible( ".gadgets-endslate-overlay-container", 5000, false, function ( endslate_response ) {
                if ( endslate_response.value == true ) {
                  console.log( "Endslate functionality is working" );
                  endslate.
                  waitForElementVisible( ".endslate-close-button", 5000 ).
				          //Click the endslate close button 
                  click( ".endslate-close-button" ).
                  pause( 2000 ).
                  waitForElementVisible( ".load-indicator", 5000 )
                }
              } );
            }
            else {
              this.assert.fail( player_currenttime.value, player_durationtime.value, "Endslate functionality is not working" );
            }
          } );
        } );
      }
      else {
        this.assert.fail( url_data, "endslate=true", "Player doesn't support endslate option" );
      }
    } );
    endslate.end();
  },
};