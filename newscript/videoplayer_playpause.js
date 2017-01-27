module.exports = {
  before : function ( browser ) {
    browser.
    url( "http://widgets.staging.boxxspring.com/NzksMTQyNzk3MQ" )
  },
  'Player-Playpause' : function ( playpause ) {
    playpause.
    playvideo();
    playpause.
	//Check the video gets pause by clicking pause button
    waitForElementVisible( ".unimatrix-video-play-pause-button-icon", 9000 ).
    pause( 7000 ).
    click( ".unimatrix-video-play-pause-button-icon" ).
    pause( 7000 ).
    waitForElementVisible( ".unimatrix-video-controls-indicator > .unimatrix-video-controls-indicator-icon", 6000, false, function () {}, 'Pause option is working while clicking pause button' )
    //Get the video player current time while pause
	playpause.getText( ".unimatrix-video-current-time-display > span", function ( pause_currenttime ) {
      var videopause_time = pause_currenttime.value;
      console.log( videopause_time );
      playpause.waitForElementVisible( ".unimatrix-video-play-pause-button-icon", 9000 ).
      pause( 3000 ).
      click( ".unimatrix-video-play-pause-button-icon" ).
      pause( 3000 )
	  //Get the video player current time after clicking play button
      playpause.getText( ".unimatrix-video-current-time-display > span", function ( play_currenttime ) {
        var videoplay_time = play_currenttime.value;
        console.log( videoplay_time );
		//Check the video gets play by clicking play button
        if ( videopause_time < videoplay_time ) {
          this.assert.ok( true, 'Play option is working while clicking play button' );
        }
        else {
          this.assert.fail( videopause_time, videoplay_time, undefined, '>==' );
        }
      } );
    } );
    playpause.
    pause( 3000 ).
    click( ".unimatrix-video-controls" ).
	//Check the video gets pause by clicking the video
    waitForElementVisible( ".unimatrix-video-controls-indicator > .unimatrix-video-controls-indicator-icon", 6000, false, function () {}, 'Pause option is working while clicking video' )
    playpause.getText( ".unimatrix-video-current-time-display > span", function ( pause_currenttime ) {
      var videopause_time = pause_currenttime.value;
      console.log( videopause_time );
      playpause.waitForElementVisible( ".unimatrix-video-controls", 9000 ).
      pause( 3000 ).
      click( ".unimatrix-video-controls" ).
      pause( 3000 )
      playpause.getText( ".unimatrix-video-current-time-display > span", function ( play_currenttime ) {
        var videoplay_time = play_currenttime.value;
        console.log( videoplay_time );
		//Check the video gets play by clicking the video
        if ( videopause_time < videoplay_time ) {
          this.assert.ok( true, 'Play option is working while clicking video' );
        }
        else {
          this.assert.fail( videopause_time, videoplay_time, undefined, '>==' );
        }
      } );
    } );
    playpause.end();
  },
};