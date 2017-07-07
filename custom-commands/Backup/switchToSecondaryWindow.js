exports.command = function ( socialmedia ) {
  this.
  windowHandles( function ( newwindow ) {
    var new_handle = newwindow.value[ 1 ];
    this.switchWindow( new_handle );
  } ).
  //check whether the new window open a facebook link
  assert.urlContains( socialmedia ).
  pause( 2000 ).
  maximizeWindow();
  return this;
};
