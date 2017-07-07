//this function is for switch To Primary Window when using FB, twitter, google+
exports.command = function ( urlLink ) {
  this.windowHandles( function ( newwindow ) {
    var new_handle = newwindow.value[ 0 ];
    this.switchWindow( new_handle );
  } ).
  //check whether the new window open a facebook link
  assert.urlContains( urlLink ).pause( 2000 ).maximizeWindow();
  return this;
};
