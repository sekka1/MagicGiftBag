/////////////////////////////////////////////////
// Display the Friends Top Search List
/////////////////////////////////////////////////

var FriendsTopSearchList = {

	firstRun:true,
	btnBack: btnBack,
	fbID: '',
	accessToken: '',
	topSearchList: '',
	xhr:Titanium.Network.createHTTPClient(),
	tableview:Titanium.UI.createTableView({
				top:60,
				opacity:0.4
	}),
	main:function(){

			Ti.API.info( 'no topSearchList data: ' );
			this.getData();
			this.display();

	},
	getData:function(){
	
		Ti.API.info( 'getData' );
		
		var topSearchList = this.topSearchList;
		//var display = this.display();
		
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
		
			SearchResults.queryItem = e.row.name;
			SearchResults.display();
		
		});
	},
	display:function(){
		Ti.API.info( 'display' );
	
		var tableview = this.tableview;
	
		Ti.API.info( 'fbID: ' + this.fbID );

		win.add(this.tableview);
	
		// Set the back button action
		this.btnBack.action = 'FriendsTopSearchList';

	},
	
	cleanup: function(){
		Ti.API.info( 'Cleaning up: friendsTopSearchList' );
		this.tableview.setData([]);
		this.topSearchList = '';
		win.remove( this.tableview );
	}
};
