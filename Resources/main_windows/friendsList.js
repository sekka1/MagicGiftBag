/////////////////////////////////////////////////
// Display the Friends Lists Function
/////////////////////////////////////////////////
var FriendsList = {

	firstRun:true,
	btnBack:btnBack,
	
	search: search = Titanium.UI.createSearchBar({
			showCancel:true,
			opacity:1.0,
	}),
	tableview:Titanium.UI.createTableView({
			top:60,
			//backgroundImage:'../images/templates/multi-color/MGB-AppBGWatermark.png',
			opacity:1.0,
			search:this.search,
			filterAttribute:'title'
	}),
	main:function(){
		this.getData();
		this.display();
	
	},
	getData:function(){

		Titanium.Facebook.requestWithGraphPath('me/friends', {}, 'GET', function(e) {
			if (e.success) {
				//Ti.API.info(e.result);
		
				FriendsList.fillRows( e.result );
		
			} else if (e.error) {
				alert(e.error);
			} else {
				alert('Unknown response');
			}
		});
	},
	fillRows:function( result ){

		results = eval('('+result+')');
				
		Ti.API.info( '# of fb friends: ' + results.data.length );
 

		for (var i=0;i<results.data.length;i++){

			// The left image doesn not work right now.  It is a titanium bug where it wont
			// show a remote url in the left image.
			var row = Ti.UI.createTableViewRow({
				title:results.data[i].name,
				hasChild:true,
				opacity:1.0,
			});
						
			row.id = results.data[i].id;
			row.btnBack = this.btnBack;

			this.tableview.appendRow( row );
		}
		
		this.tableview.addEventListener('click', function(e){
		
			Ti.API.info( '---------------FriendsList tableview.addEventListener-------------------------' );
			Ti.API.info( 'in tableview click event listener: ' + e.row.id  );
			Ti.API.info( "Titanium.Facebook.accessToken: " + Titanium.Facebook.accessToken );
			
			this.hide();
			
			FriendsTopSearchList.fbID = e.row.id;
			FriendsTopSearchList.accessToken = Titanium.Facebook.accessToken;
			FriendsTopSearchList.main();
		});
	
	},
	display:function(){

		// Adding stuff to the window but only want to add it once then the show/hide game afterwards
		if( this.firstRun ){
			Ti.API.info( 'FriendsList first run' );
			win.add(this.tableview);
			this.firstRun = false;
		} else {
			Ti.API.info( 'FriendsList NOT first run' );
			this.tableview.show();
		}
	
		// Set the back button action
		this.btnBack.action = 'FriendsList';

	},
	cleanup: function(){
		win.hide( this.tableview );
	}
};