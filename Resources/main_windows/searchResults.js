////////////////////////////////
// Make query to the backend to get Amazon Search results
////////////////////////////////
var SearchResults = {

	testCount:0,
	testDidShow:false,
	isAddedToWin:false,	
	queryItem: '',
	xhr:Titanium.Network.createHTTPClient(),
	tableview: Titanium.UI.createTableView({
			top:60
	}),
	main:function(){
	
		this.getData();
		this.show();
	},
	show:function(){
	
		///////////////////////////////////////////////
		this.testCount++; // Debuging.  Counting how many times the tableview click event happens
		this.testDidShow = false; // setting it so it only clicks one time.  have to fix this
		////////////////////////////////////////////////

		NavigationBar.btnBack.action = 'SearchResults';
	
		if( this.isAddedToWin ){
			// This objects element has already been added to the window.  You can just show it
		
			// Navigation bar
			NavigationBar.show();
		
			this.tableview.show();

		} else {
			// This object elements has not been added to the current window.  Add them.
		
			this.isAddedToWin = true;
			
			// Navigation bar
			NavigationBar.show();
			
			// Table
			win.add(this.tableview);
		}
	},
	hide:function(){
	
		this.tableview.setData([]);
		this.tableview.hide();
	},
	getData:function(){

		this.xhr.onload = function() {
	
			SearchResults.fillRows( this.responseText );
		};
		
		/////////////////////////////////////////////////
		// Fix query string so that it is url safe
		/////////////////////////////////////////////////
		var queryItem_url_safe = this.queryItem.replace( / /g, "%20" );
		
		Ti.API.info( win.site_url + "data/index/class/ProductSearch/method/searchMobile/numberOfItems/24/searchIndex/1/priceRange/%5B0,999999%5D/q/" + queryItem_url_safe );
		
		this.xhr.open('GET', win.site_url + "data/index/class/ProductSearch/method/searchMobile/numberOfItems/24/searchIndex/1/priceRange/%5B0,999999%5D/q/" + queryItem_url_safe,true);
		
		this.xhr.send();	
	},
	fillRows:function( responseText ){

		//Ti.API.info( responseText );
	
		results = JSON.parse( responseText );
	
		Ti.API.info( 'Length: ' + results.length );
		
		for (var i=1;i<results.length;i++){

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
	
			this.tableview.appendRow( row );
		}
		
		/////////////////////////////////////////////////
		// Event Listener for the row click
		/////////////////////////////////////////////////
		this.tableview.addEventListener('click', function(e){
		
			if( ! SearchResults.testDidShow ){ // Delete me when this problem is figured out!!
			
				SearchResults.testDidShow = true;
					
				Ti.API.info( 'in tableview click event listener: ' + e.row.item_url  );
				
				//win.windowProductWebView.DetailPageURL = e.row.item_url;
				//windowProductWebView.backWindow = win;
				//win.windowProductWebView.open();
				//win.hide();
				
				SearchResults.hide();
				
				//returnDisplay = ProductWebView( e.row.btnBack, e.row.item_url );
				
				ProductWebView.DetailPageURL = e.row.item_url;
				ProductWebView.main();
			}
			
		});
	}
};