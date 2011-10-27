var win = Titanium.UI.currentWindow;  
win.setBackgroundImage('../images/templates/multi-color/MGB-AppBGWatermark.png');

Ti.API.info( "availableMemory: " + Titanium.Platform.availableMemory );


var nav_bar = Titanium.UI.createImageView({
        image:'../images/templates/multi-color/nav-bar-blank.png',
        top:0,
        left:0,
        height:60,
        //width:480,
	    borderWidth: 0,
	    borderRadius: 0
});
win.add(nav_bar);

//var btnBack = Titanium.UI.createButton({  
var btnBack = Titanium.UI.createButton({  
    title:'',  
    backgroundImage:'../images/templates/multi-color/back.png',
    backgroundSelectedImage: '../images/templates/multi-color/back_over.png',
    top:10,  
    left:2,
    width:88,  
    height:32,
    borderRadius:1,  
    font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}  
});  
win.add(btnBack);

btnBack.addEventListener('click', function()
{
   Ti.API.info( "Event info back button pressed..." );
   win.remove(tableview);
   win.backWindow.show();
   win.close();
});

var titleName = Titanium.UI.createLabel({  
        text:'Top Interests',  
        top:10,  
        left:125,  
        borderRadius:0,  
        height:'auto',
        color:'white'
}); 
win.add(titleName);


// create table view
var tableview = Titanium.UI.createTableView({
    top:60,
    opacity:0.4
});

Ti.API.info( 'fbID: ' + win.fbID );

///////////////////////////////////////////////
// Query the Gift Engine for Top Interest
///////////////////////////////////////////////
var xhr = Titanium.Network.createHTTPClient();

xhr.onload = function() {

	//alert('in onload: ' + e.result );
	//Ti.API.info( 'top search list: ' + this.responseText );
	
	//////////////////////////////////
	// Adding top Search list hits to the tableview
	//////////////////////////////////
	
	//results = eval('('+this.result+')');
	results = JSON.parse( this.responseText );

	Ti.API.info( 'results length: ' + results.length );
	
	for (var i=0;i<results.length;i++){
		
		// Display each of the top categories
		var row = Ti.UI.createTableViewRow({
			title:results[i].name,
			hasDetail:true
		});
					
		row.name = results[i].name;

		tableview.appendRow( row );
	}
	
	//////////////////////////////////
	// Adding top Search list hits to the tableview
	//////////////////////////////////	
};

// Sending accessToken to the web server to get this user's facebook info to recommend something
xhr.open('GET', win.site_url + 'data/index/class/GiftEngine/method/getTopCategoryListMobile/userID/'+win.fbID+'/accessToken/'+win.accessToken,true);

xhr.send();

/////////////////////////////////////////////////
// Event Listener for the row click
/////////////////////////////////////////////////
tableview.addEventListener('click', function(e){

	//windowAmazonSearchResults.site_url = win.site_url;
	win.windowAmazonSearchResults.queryItem =  e.row.name; // The item search term
	//windowAmazonSearchResults.loader = win.loader;
	//windowAmazonSearchResults.backWindow = win;
	win.windowAmazonSearchResults.open();
	win.hide();

});

win.add(tableview);


