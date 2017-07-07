exports.command = function ( ) {
  this.
  pause( 10000 ).
  //click video control button to play
  waitForElementVisible ( ".unimatrix-video-controls-indicator > .unimatrix-video-controls-indicator-icon", 10000, false ).
  pause ( 10000 ).
  click ( ".unimatrix-video-controls-indicator > .unimatrix-video-controls-indicator-icon" ).
  pause ( 5000 );
  return this;
};