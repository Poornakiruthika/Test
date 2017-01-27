module.exports = {
  before : function ( browser ) {
    browser.
    url( "http://widgets.staging.boxxspring.com/NzksMTQyNzk3MQ" )
  },
  'Player-Volume' : function ( volume ) {
    volume.
    playvideo();
    volume.
    //Click video volume button
    waitForElementVisible( ".unimatrix-video-volume-button", 9000 ).
    pause( 9000 ).
    click( ".unimatrix-video-volume-button" ).
    pause( 9000 ).	
	//To check the mute in video player 
    waitForElementVisible( ".unimatrix-video-control-bar > div.muted", 9000 ).
    click( ".unimatrix-video-control-bar > div.muted" ).
    pause( 2000 ).
	//Drag the video volume handle 
    moveToElement( ".unimatrix-video-volume-container > div[style='bottom: 64px;']", 0, 0 ).
    pause( 2000 ).
    mouseButtonDown( 0 ).
    pause( 2000 ).
    moveToElement( ".unimatrix-video-volume-container > div[style='bottom: 64px;']", 0, 50 ).
    pause( 2000 ).
    mouseButtonUp( 0 ).	
    //Expect whether volume handle working properly
    expect.element( '.unimatrix-video-volume-handle' ).to.have.attribute( "style" ).which.equals( 'bottom: 14px;' );
    volume.end();
  },
};