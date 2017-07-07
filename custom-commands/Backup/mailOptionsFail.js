//this function is for 
exports.command = function ( urlLink ) {
  this.globals.transporter.sendMail ( this.globals.mailOptionsFail, function ( error, info ) {
  if ( error ) {
    return console.log ( error );
    }
    else {
    console.log ( 'Message sent: ' + info.response );
    console.log ( "Test Case Fail " + urlLink );
  }
  } );
  //return this;
};
