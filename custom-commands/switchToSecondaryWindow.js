//this function is for switch To Secondary Window when using FB, twitter, google+
exports.command = function ( socialmedia ) {
  this.windowHandles( function ( newwindow ) {
    var new_handle = newwindow.value[ 1 ];
    this.switchWindow( new_handle );
  } ).
  //check whether the new window open a facebook link
  verify.urlContains( socialmedia ).pause( 2000 ).windowMaximize();
  return this;
};
