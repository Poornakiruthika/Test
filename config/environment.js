var date = Date.now ( );
var fs = require ( 'fs' );
var toMail = fs.readFileSync ( __dirname + '/../tomail.txt', 'utf8' );
var ccMail = fs.readFileSync ( __dirname + '/../ccmail.txt', 'utf8' );
var PROFILES = {
  development : {
    keymakerUri: "http://localhost:8084",
    portalUri: "http://localhost:8084",
    username: "nick@bedrocket.com",
    password: "drowssap"
  },
  acceptance : {
    keymakerUri: "http://keymaker.staging.boxxspring.com",
    portalUri: "http://portal.staging.boxxspring.com",
    username: "vishnu.pg@angleritech.com",
    password: "vishnu90"
  }
}
var filePath = {
  getFilePath: 'E:/bedrocket.png'
};
 
var nodemailer = require ( 'nodemailer' );
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var smtpConfig = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, 
  auth: {
    user: 'poornakiruthikaa@gmail.com',
    pass: 'poorna@123'
    }  
  };
var transporter = nodemailer.createTransport ( smtpConfig );
var mailOptions = {
  from: 'poornakiruthikaa@gmail.com', 
  to: toMail,
  cc: ccMail,
  subject: 'SportsrocketQA Test Report', 
  text: 'Test Report', 
  html: {
    path: __dirname + '/../mailOptions - Copy.html'
    },
  attachments: [ { 
    contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 
    path: __dirname + '/../boxxspring.xlsx',    
    },
    {
    path: __dirname + '/../videoplayer.xlsx',
    },
    {
    path: __dirname + '/../Report.jpg'
    }  
   ]
  };
var HtmlReporter = require ( 'nightwatch-html-reporter' );
var reporter = new HtmlReporter ( {
  openBrowser: true,
  uniqueFilename: true,
  themeName: "compact-gray",
  reportsDirectory: __dirname + '/reports',
  reportFilename: "generatedReport_"+date+".html",
  relativeScreenshots: true,
  hideSuccess: false,
  logLevel: 0
} );
var arguments = require( 'yargs' ).argv;
var profileName = arguments.profile || arguments.p || 'acceptance'; 
module.exports = { profile: PROFILES[ profileName ] ,
  filePath: filePath, transporter: transporter, mailOptions:mailOptions, reporter: reporter
}
