//this function is for 
exports.command = function (  ) {
  this.globals.transporter.sendMail ( this.globals.mailOptionsPass, function ( error, info ) {
  if ( error ) {
    return console.log ( error );
    }
    else {
    console.log ( 'Message sent: ' + info.response );
    console.log ( "Test Case Pass "  );
     return this;
  }
  } );

};
