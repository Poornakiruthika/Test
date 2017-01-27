module.exports = {
  before : function ( browser ) {
    browser.
    url( "http://widgets.boxxspring.com/MjE1MSw0MDUyNDkyOA?endslate=true&playthrough=true" )
  },
  'Playthrough' : function ( playthrough ) {
    playthrough.
    url( function ( get_url ) {
	  //Check the string "playthrough=true" present in URL 
      var url_str = get_url.value;
      var url_data = url_str.match( /endslate=true&playthrough=true/g );
      if ( url_data == "endslate=true&playthrough=true" ) {
      	playthrough.
      	playvideo();
        playthrough.
        
		    //Get the duration of the videoplayer
        getText( ".unimatrix-video-duration-display > span", function ( player_durationtime ) {
          console.log( player_durationtime.value );
          playthrough.
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
              playthrough.
              pause( 9000 ).
              waitForElementVisible( ".endslate-up-next-play > #endslate-spinner", 5000 ).
              pause( 6000 ).
			        //Check the next level of video playing automatically
              waitForElementNotPresent( ".endslate-up-next-play > #endslate-spinner", 1000, false, function ( playthrough_response ) {
                if ( playthrough_response.value == false ) {
                  console.log( "Playthrough functionality is working" );
                }
                else {
                  this.assert.fail( undefined, undefined, "Playthrough functionality is not working" );
                }
              } );
            }
            else {
              this.assert.fail( player_currenttime.value, player_durationtime.value, "Error in the player duration time" );
            }
          } );
        } );
      }
      else {
        playthrough.
        assert.fail( url_data, "playthrough=true", "Player doesn't support playthrough option" );
      }
    } );
    playthrough.end();
  },
};