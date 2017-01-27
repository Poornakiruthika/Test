module.exports = {
  before : function ( browser ) {
    browser.
    url( "http://widgets.staging.boxxspring.com/NzksMTQyNzk3MQ" )
  },
  'Player-Resolution' : function ( resolution ) {
    resolution.
    playvideo();
    resolution.
    waitForElementVisible( ".unimatrix-video-control-bar >.unimatrix-video-sourceGroups-button", 9000 ).
    pause( 9000 ).
	//Click the pixel in the video source group button
    moveToElement( ".unimatrix-video-sourceGroups-button", 0, 0 ).
    waitForElementVisible( "div[data-name='360p']", 9000 ).
    click( "div[data-name='360p']" ).
    pause( 600 )
	//Check the video start playing from the beginning after selecting the pixel
    resolution.getText( ".unimatrix-video-current-time-display > span", function ( currenttime ) {
      console.log( currenttime.value )
      if ( currenttime.value == '00:00' || this.verify.visible( ".unimatrix-video-controls-indicator" ) ) {
        console.log( "Refresh and Playing from the beginning" );
      }
      else {
        this.assert.fail( currenttime.value, '00:00', 'Fail to refresh the player' );
      }
    } );
    resolution.
    pause( 9000 ).
	//Verify the selected pixel and the video pixel are same
    verify.attributeEquals( ".unimatrix-video-sourceGroups > div.active", 'data-name', '360p' )
    resolution.end();
  },
};