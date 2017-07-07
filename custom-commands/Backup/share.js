exports.command = function ( url ) {
  this.
  url ( url ).
  pause ( 8000 ).
  //click video control button to play
  waitForElementVisible ( ".unimatrix-video-controls-indicator > .unimatrix-video-controls-indicator-icon", 10000 ).
  click ( ".unimatrix-video-controls-indicator > .unimatrix-video-controls-indicator-icon" ).
  waitForElementVisible ( ".unimatrix-video-sharing-button", 1000 ).
  pause ( 5000 ).
  click ( ".unimatrix-video-sharing-button" );
  return this;
};
