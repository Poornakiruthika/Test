//this function is for check and Edit the Attributions 
var xlsx = require ( 'xlsx' );
var fs = require ( 'fs' );
var Excel = require ( 'exceljs' );
var workbook1 = new Excel.Workbook (  );
if ( typeof require !== 'undefined' ) XLSX = require ( 'xlsx' );
var workbook = XLSX.readFile ( 'boxxspring.xlsx', {
  cellStyles: true
} );
var worksheet = workbook.Sheets[ 'AttributionsEdit' ];
var attributionTitle = [ ];
var attributionSearch = [ ];
var attributionDescription = [ ];
var attributionShortTitle = [ ];
var attributionShortDesc = [ ];
var attributionCategoryName = [ ];
var attributionNote = [ ];
var attributionImg = [ ];
var result = [ ];
var currentCount;
var actualCount;
var expectedCount;
var getData,rowCount = 1;
var convertData = 1;
module.exports = {
  tags: [ 'attributionEdit' ],
  before: function ( portalLogin ) {
    var profile = portalLogin.globals.profile;
    portalLogin.login ( profile.portalUri, profile.username, profile.password );
  },
  'Attribution Edit': function ( editAttribution ) {
    for ( z in worksheet ) {
      if ( z[ 1 ] === '!' ) continue;
      //Read Category Title
      if ( z.includes ( 'A' ) ) {
        attributionTitle.push ( worksheet[ z ].v );
      }
      //Read attributions Description
      if ( z.includes ( 'B' ) ) {
        attributionSearch.push ( worksheet[ z ].v );
      }
      if ( z.includes ( 'C' ) ) {
        attributionDescription.push ( worksheet[ z ].v );
      }
      //Read Short Title
      if ( z.includes ( 'D' ) ) {
        attributionShortTitle.push ( worksheet[ z ].v );
      }
      //Read Short Description
      if ( z.includes ( 'E' ) ) {
        attributionShortDesc.push ( worksheet[ z ].v );
      }
      //Read attributions category Name
      if ( z.includes ( 'F' ) ) {
        attributionCategoryName.push ( worksheet[ z ].v );
      }
      //Read attributions Note
      if ( z.includes ( 'G' ) ) {
        attributionNote.push ( worksheet[ z ].v );
      }
      //Read attributions Image
      if ( z.includes ( 'H' ) ) {
        attributionImg.push ( worksheet[ z ].v );
      }
    }
    if ( attributionTitle.length > 1 ) {      
      editAttribution.pause ( 3000 ).
      useXpath ( ).
      //Verify the Attribution Menu in CONTENT
      verify.containsText ( "//ul/li/a[ text( ) = 'Attributions' ] ", "Attributions" ).
      pause ( 3000 ).
      //Click on the Attribution Menu in CONTENT
      click ( "//ul/li/a[ text( ) = 'Attributions' ] " ).
      useCss ( ).
      pause ( 3000 ).
      //Get the Actual Total count in the Attibutions After Edit
      getText ( '.content-count > strong', function ( actualCountResult ) {
        if ( actualCountResult.status !== -1 ) {
          currentCount = actualCountResult.value;
          currentCount = currentCount.substring ( 1, currentCount.length - 1 );
        }
        for ( var getData = 1,rowCount = 1; getData < attributionTitle.length; getData++ ) {
          editAttribution.pause ( 3000 ).
          //Wait for the Search input field is visible
          waitForElementVisible ( ".search-field-input", 3000,false ).
          //Verify the Search input field is visible
          verify.visible ( ".search-field-input" ).
          setValue ( ".search-field-input", attributionSearch[ getData ] ).
          keys ( editAttribution.Keys.ENTER ). // hold the control
          click ( ".search-field-input" ).
          keys ( editAttribution.Keys.NULL ). // release the control
          pause ( 3000 ).  
          //Wait for the Count value is visible        
          waitForElementVisible ( ".content-count>strong", 3000, false ).
          verify.visible ( ".content-count>strong" ).
          //Get the count after searched in the Attribution listing page
          getText ( '.content-count > strong', function ( searchCountResult ) {
            if ( getData >= ( attributionTitle.length - 1 ) ) {
              convertData = ( getData - ( attributionTitle.length - 1 ) );
              getData++;
            }            
            if ( searchCountResult.status !== -1 ) {
              searchCount = searchCountResult.value;
              searchCount = searchCount.substring ( 1, searchCount.length - 1 );
            }
            //Check the Searched Count as greater than Zero
            if ( searchCount > 0 ) {
              editAttribution.pause ( 3000 ).useXpath().
              //Wait for the Edit pullout button is visible
              waitForElementVisible ( "(//h2[@class='ng-binding'])[1]", 3000, false ).
              pause ( 3000 ).
              //Click on the Edit pullout button
              click ( "(//h2[@class='ng-binding'])[1]" ).
              useCss().pause ( 3000 ).
              //Verify the Content Tab is visibel
              verify.visible ( ".video-tabs > a[ href='#content' ] " ).
              pause ( 3000 ).
              //Click on the Content Tab
              click ( ".video-tabs > a[ href='#content' ] " ).
              pause ( 3000 ).
              //Check and Enter Categories Title
              waitForElementVisible ( ".text-input-headline", 3000, false ).
              //Clear the Headline data in the field
              clearValue ( ".text-input-headline" ).
              //Enter the Headline data in the field
              setValue ( ".text-input-headline", attributionTitle[ convertData ] ).
              pause ( 3000 ).
              //Check and Enter Categories Text Description
              waitForElementVisible ( ".wmd-input", 3000, false ).
              //Clear the Short description data in the field
              clearValue ( ".wmd-input" ).
              //Enter the Short description data in the field
              setValue ( ".wmd-input", attributionDescription[ convertData ] ).
              pause ( 3000 ).
              //Check and click Save button
              waitForElementVisible ( '.btn-active', 3000, false ).
              pause ( 3000 ).
              //Verify the SAve button is visible
              verify.visible ( ".btn-active" ).
              pause ( 3000 ).
              //Click on the Save button
              click ( ".btn-active" ).
              pause ( 3000 ).
              //Set the details in the Attributions Properties Tab
              authorsproperties ( attributionShortTitle[ convertData ], attributionShortDesc[ convertData ], attributionCategoryName[ convertData ], attributionNote[ convertData ], attributionImg[ convertData ], currentCount, convertData ).
              pause ( 3000 ).
              useXpath ( ).
              //Verify the Attibutions Menu in CONTNET
              verify.containsText ( "//ul/li/a[ text( ) = 'Attributions' ] ", "Attributions" ).
              pause ( 3000 ).
              //Click on the Attibutions Menu in CONTNET
              click ( "//ul/li/a[ text( ) = 'Attributions' ] " ).
              useCss ( ).
              pause ( 3000 ).
              //Get the Actual Total count in the Attibutions After Edit
              getText ( '.content-count > strong', function ( actualCountResult ) {
                if ( actualCountResult.status !== -1 ) {
                  actualCount = actualCountResult.value;
                  actualCount = actualCount.substring ( 1, actualCount.length - 1 );
                  if ( actualCount == currentCount ) {
                    //Writ in the Excel for PASS Result and Reason
                    editAttribution.writeToExcelPass ( 'boxxspring.xlsx', 'AttributionsEdit', ++rowCount, 10 );
                  }
                  else {
                    //Writ in the Excel for FAIL Result and Reason
                    editAttribution.writeToExcelFail ( 'boxxspring.xlsx', 'AttributionsEdit', ++rowCount, 10, 11, "ActualResult: '"+ actualCount +"' Total count in Attribution. ExpectedResult: should be'"+ currentCount +"' in the Total Count " );
                  }
                }
              } );
              if ( getData < attributionTitle.length - 1 ) {
                editAttribution.getText ( '.content-count > strong', function ( currentCountResult ) {
                  if ( currentCountResult.status !== -1 ) {
                    currentCount = currentCountResult.value;
                  }
                } );
              }
            }
            else {
              //Writ in the Excel for Search Fail Result and Reason
              editAttribution.writeToExcelFail ( 'boxxspring.xlsx', 'AttributionsEdit', ++rowCount, 10, 11, "Searched Result Count,'"+ searchCount +"'" );
            }
          } );
        }
      } );
    }
    //End the Browser
    editAttribution.end ( );
  }
};