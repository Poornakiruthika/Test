module.exports = {
  before : function ( browser ) {
    browser.
    url( "http://widgets.boxxspring.com/MjE1MSw0MDUyNDkyOA" )
  },
  'Player-Progressbar' : function ( timeslider ) {
    timeslider.
    playvideo();
    timeslider.
    waitForElementVisible( ".unimatrix-video-time-slider-container", 9000 ).
    pause( 9000 )
    timeslider.
	//Get the video player current time 
    getText( ".unimatrix-video-current-time-display > span", function ( play_currenttime ) {
      var videoplay_time = play_currenttime.value;
      console.log( videoplay_time );
      timeslider.
	  //Drag and drop the progress bar handle forward
      moveToElement( ".unimatrix-video-time-slider-progress-bar-handle", 0, 0 ).
      mouseButtonDown( 0 ).
      pause( 2000 ).
      moveToElement( ".unimatrix-video-time-slider-progress-bar-handle", 70, 0 ).
      pause( 2000 ).
      mouseButtonUp( 0 ).
      pause( 2000 )
      timeslider.
	  //Get the video player current time after drag and drop
      getText( ".unimatrix-video-current-time-display > span", function ( play_currenttime1 ) {
        var videoplay_time1 = play_currenttime1.value;
        console.log( videoplay_time1 );
		//Check the video moves forward functionality
        if ( videoplay_time < videoplay_time1 ) {
          this.assert.ok( true, 'Video moves forward successfully' );
        }
        else {
          this.assert.fail( undefined, undefined, "Videoplayer fail to move forward" );
        }
        timeslider.
		//Drag and drop the progress bar handle backward
        moveToElement( ".unimatrix-video-time-slider-progress-bar-handle", 0, 0 ).
        pause( 2000 ).
        mouseButtonDown( 0 ).
        pause( 2000 ).
        moveToElement( ".unimatrix-video-time-slider-progress-bar-handle", 1, 0 ).
        pause( 2000 ).
        mouseButtonUp( 0 )
        timeslider.
		//Check the video moves backward functionality
        getText( ".unimatrix-video-current-time-display > span", function ( play_currenttime2 ) {
          var videoplay_time2 = play_currenttime2.value;
          console.log( videoplay_time2 );
          if ( videoplay_time1 > videoplay_time2 ) {
            this.assert.ok( true, 'Video moves backward successfully' );
          }
          else {
            this.assert.fail( undefined, undefined, "Videoplayer fail to move backward" );
          }
        } );
      } );
    } );
    timeslider.end();
  },
};