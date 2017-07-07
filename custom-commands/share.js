exports.command = function ( url ) {
  this.
    url ( url ).
    pause ( 8000 ).
    //click video control button to play
    waitForElementVisible ( ".unimatrix-video-controls-indicator > .unimatrix-video-controls-indicator-icon", 10000, false ).
    pause( 9000 ).
    click ( ".unimatrix-video-controls-indicator > .unimatrix-video-controls-indicator-icon" ).
    pause ( 5000 ).
    moveToElement (".unimatrix-video-control-bar", 0, 0).
    pause( 10000 ).
    waitForElementVisible ( ".unimatrix-video-sharing-button", 100000, false ).
    click ( ".unimatrix-video-sharing-button" );
  return this;
};
