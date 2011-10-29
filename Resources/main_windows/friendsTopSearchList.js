/////////////////////////////////////////////////
// Display the Friends Top Search List
/////////////////////////////////////////////////

var FriendsTopSearchList = {

	testCount:0,
	testDidShow:false,
	isAddedToWin:false,	
	fbID: '',
	accessToken: '',
	xhr:Titanium.Network.createHTTPClient(),
	tableview:Titanium.UI.createTableView({
				top:60,
				opacity:0.4
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
	
		Ti.API.info( 'fbID: ' + this.fbID );
		
		win.setBackgroundImage('../images/templates/multi-color/MGB-AppBGWatermark.png');

		NavigationBar.btnBack.action = 'FriendsTopSearchList';

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
		NavigationBar.hide();
		this.tableview.hide();
	},
	getData:function(){
	
		Ti.API.info( 'getData' );
		
		///////////////////////////////////////////////
		// Query the Gift Engine for Top Interest
		///////////////////////////////////////////////
		
		this.xhr.onload = function(e) {
			Ti.API.info( 'in onload: ' );
						
			FriendsTopSearchList.fillRows( this.responseText );
		};
		
		// Sending accessToken to the web server to get this user's facebook info to recommend something
		this.xhr.open('GET', win.site_url + 'data/index/class/GiftEngine/method/getTopCategoryListMobile/userID/'+this.fbID+'/accessToken/'+this.accessToken, true);
		
		this.xhr.send();	
	},
	fillRows:function( responseText ){
	
		Ti.API.info( 'in fillRows: ' );

		//Ti.API.info( 'this.topSearchList: ' + responseText );
		results = JSON.parse( responseText );
	
		Ti.API.info( 'results length: ' + results.length );
		
		for (var i=0;i<results.length;i++){

			// Display each of the top categories
			var row = Ti.UI.createTableViewRow({
				title:results[i].name,
				hasDetail:true
			});
						
			row.name = results[i].name;
	
			this.tableview.appendRow( row );
		}
			
		/////////////////////////////////////////////////
		// Event Listener for the row click
		/////////////////////////////////////////////////
		this.tableview.addEventListener('click', function(e){
		
			if( ! FriendsTopSearchList.testDidShow ){ // Delete me when this problem is figured out!!
			
				FriendsTopSearchList.testDidShow = true;
				
				Ti.API.info( '---------------------FriendsTopSearchList tableview click---------');
				
				FriendsTopSearchList.hide();
				
				SearchResults.queryItem = e.row.name;
				SearchResults.main();		
			}
		});
	}
};
