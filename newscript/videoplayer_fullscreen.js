module.exports = {
  before : function ( browser ) {
    browser.
    url( "http://widgets.boxxspring.com/MjE1MSw0MDUyNDkyOA" )
  },
  'Player-Fullscreen' : function ( fullscreen ) {
    fullscreen.
    playvideo();
    fullscreen.
	//Click the full screen button
    waitForElementVisible( ".unimatrix-video-full-screen-button", 9000 ).
    click( ".unimatrix-video-full-screen-button" ).
    pause( 9000 ).
	//Check the video is in fullscreen mode
    getAttribute( ".gadget-artifact-container > div", "fullscreen", function ( fs ) {
      if ( fs.value == 'true' ) {
        console.log( "Full screen mode is working" );
      }
      else {
        this.verify.fail( fs.value, 'false','Full screen mode is not working' );
      }
    } );
    fullscreen.end();
  },

};