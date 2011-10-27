var win = Titanium.UI.currentWindow;  

Ti.include( '../lib/amazon.js' );

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
	//alert('hi');
   Ti.API.info( "Event info back button pressed..." );
   win.remove(tableview);
   win.backWindow.show();
   win.close();
});

var titleName = Titanium.UI.createLabel({  
        text:'Products',  
        top:10,  
        left:125,  
        borderRadius:0,  
        height:'auto',
        color:'white'
}); 
win.add(titleName);

// create table view
var tableview = Titanium.UI.createTableView({
    top:60
});

////////////////////////////////
// Make query to the backend to get Amazon Search results
////////////////////////////////

var xhr = Titanium.Network.createHTTPClient();
    	
xhr.onload = function() {

	//Ti.API.info( this.responseText );

	results = JSON.parse( this.responseText );

	Ti.API.info( 'Length: ' + results.length );

	//for (var i=1;i<results.length;i++){
	for (var i=1;i<10;i++){
		
		// Display each of the top categories
		var row = Ti.UI.createTableViewRow({
			//title:results[i].title,
			//leftImage:'http://t3.gstatic.com/images?q=tbn:ANd9GcQidl6KX2jRWNeCA6jT_TjWG7NlI3aRiB_AcDsA9Y5owS2cr9G6',//results[i].img_medium,
			height:'100'
			//left:1
			//hasDetail:true
		});
		
		var rowImage = Titanium.UI.createImageView({
			image:results[i].img_medium,
			right:225
		});
		row.add(rowImage);
		
		var rowPrice = Ti.UI.createLabel({
			text:'Price: ' + results[i].price,
			font:{fontSize:15},
			left:100,
			top:5,
			height:'auto',
			right:5
		});
		row.add(rowPrice);
		
		var rowTitle = Ti.UI.createLabel({
			text:results[i].title,
			font:{fontSize:15},
			left:100,
			top:25,
			height:'auto',
			right:5
		});
		row.add(rowTitle);
		
		row.item_url = results[i].item_url;

		tableview.appendRow( row );
	}
};

/////////////////////////////////////////////////
// Fix query string so that it is url safe
/////////////////////////////////////////////////
var queryItem_url_safe = win.queryItem.replace( / /g, "%20" );

Ti.API.info( win.site_url + "data/index/class/ProductSearch/method/searchMobile/numberOfItems/24/searchIndex/1/priceRange/%5B0,999999%5D/q/" + queryItem_url_safe );

xhr.open('GET', win.site_url + "data/index/class/ProductSearch/method/searchMobile/numberOfItems/24/searchIndex/1/priceRange/%5B0,999999%5D/q/" + queryItem_url_safe,true);

xhr.send();

/////////////////////////////////////////////////
// Event Listener for the row click
/////////////////////////////////////////////////
tableview.addEventListener('click', function(e){

	Ti.API.info( 'in tableview click event listener: ' + e.row.item_url  );
	
	win.windowProductWebView.DetailPageURL = e.row.item_url;
	//windowProductWebView.backWindow = win;
	win.windowProductWebView.open();
	win.hide();
	
});
win.add(tableview);