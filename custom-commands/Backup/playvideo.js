exports.command = function ( ) {
  this.
  pause(8000).
  //click video control button to play
  waitForElementVisible( ".unimatrix-video-controls-indicator > .unimatrix-video-controls-indicator-icon", 10000 ).
  click( ".unimatrix-video-controls-indicator > .unimatrix-video-controls-indicator-icon" ).
  pause(2000)
  return this;
};