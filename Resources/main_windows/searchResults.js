////////////////////////////////
// Make query to the backend to get Amazon Search results
////////////////////////////////
var SearchResults = {
	
	firstRun:true,
	btnBack: btnBack,
	queryItem: '',
	tableview: Titanium.UI.createTableView({
			top:60
	}),

	display: function(){
	
		var tableview = this.tableview;
	
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
				row.btnBack = btnBack;
		
				tableview.appendRow( row );
			}
		};
		
		/////////////////////////////////////////////////
		// Fix query string so that it is url safe
		/////////////////////////////////////////////////
		var queryItem_url_safe = this.queryItem.replace( / /g, "%20" );
		
		Ti.API.info( win.site_url + "data/index/class/ProductSearch/method/searchMobile/numberOfItems/24/searchIndex/1/priceRange/%5B0,999999%5D/q/" + queryItem_url_safe );
		
		xhr.open('GET', win.site_url + "data/index/class/ProductSearch/method/searchMobile/numberOfItems/24/searchIndex/1/priceRange/%5B0,999999%5D/q/" + queryItem_url_safe,true);
		
		xhr.send();
		
		/////////////////////////////////////////////////
		// Event Listener for the row click
		/////////////////////////////////////////////////
		this.tableview.addEventListener('click', function(e){
		
			Ti.API.info( 'in tableview click event listener: ' + e.row.item_url  );
			
			//win.windowProductWebView.DetailPageURL = e.row.item_url;
			//windowProductWebView.backWindow = win;
			//win.windowProductWebView.open();
			//win.hide();
			
			//tableview.hide();
			
			returnDisplay = ProductWebView( e.row.btnBack, e.row.item_url );
			
		});

		// Adding stuff to the window but only want to add it once then the show/hide game afterwards
		if( this.firstRun ){
			Ti.API.info( 'SearchResults first run' );
			win.add(this.tableview);
			this.firstRun = false;
		} else {
			Ti.API.info( 'SearchResults NOT first run' );
			this.tableview.show();
		}
		
		// Set the back button action
		this.btnBack.action = 'SearchResults';
	
	},
	
	cleanup: function(){
		this.tableview.hide();
	}

};