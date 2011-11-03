/////////////////////////////////////////////////
// Display the Friends Lists Function
/////////////////////////////////////////////////
var FriendsList = {

	testCount:0,
	testDidShow:false,
	isAddedToWin:false,
	didSetFriendsList:false,
	tableViewCurrentSelectedRow:-1,
	friendsList:'', // FB json return
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
	actInd:Titanium.UI.createActivityIndicator({
			top:5,
			right:20,
			height:50,
			width:10,
			font:{fontFamily:'Helvetica Neue',fontSize:20,fontWeight:'bold'},
			color:'white',
			message:'',
			style:'BIG',
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

		// Set Navigation Items
		NavigationBar.titleName.text = 'Friends';
		NavigationBar.btnBack.action = 'FriendsList';
	
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
			
			// Activity Indicator
			win.add( this.actInd );
		}
		
		if( ! FriendsList.didSetFriendsList )
			this.actInd.show();
	},
	hide:function(){
	
		NavigationBar.hide();
		this.tableview.setData([]);
		this.actInd.hide();
		this.tableview.hide();
	},
	clearFriendsList:function(){
	
		this.didSetFriendsList = false;
		this.friendsList = '';
		this.tableViewCurrentSelectedRow = -1;
	},
	getData:function(){

		if( ! FriendsList.didSetFriendsList ){

			Titanium.Facebook.requestWithGraphPath('me/friends', {}, 'GET', function(e) {
				if (e.success) {
					//Ti.API.info(e.result);
					Ti.API.info( '---Loading New friends list----' );
			
					// Save friends list
					FriendsList.friendsList = e.result;
					
					// FIX - Turning this off for now.  It is not the fetch of the friends that
					// is making it slow.  It is the loading all these items into the tableview
					// But we can keep this here for a good example of how to keep the data for
					// the other views
					//FriendsList.didSetFriendsList = true;
			
					FriendsList.fillRows( FriendsList.friendsList );
					
					FriendsList.actInd.hide();
					
					// Scroll to previous position in the friends list
					if( FriendsList.tableViewCurrentSelectedRow != -1 )
						FriendsList.tableview.scrollToIndex( FriendsList.tableViewCurrentSelectedRow );
			
				} else if (e.error) {
					alert(e.error);
				} else {
					alert('Unknown response');
				}
			});
		} else {
		
			Ti.API.info( '---Loading Saved friends list----' );
		
			this.fillRows( FriendsList.friendsList );
			
			this.actInd.hide();
		}
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
			row.number = i;
			row.btnBack = this.btnBack;

			this.tableview.appendRow( row );
		}
		
		this.tableview.addEventListener('click', function(e){
		
			if( ! FriendsList.testDidShow ){ // Delete me when this problem is figured out!!
			
				FriendsList.testDidShow = true;
			
				Ti.API.info( '---------------FriendsList tableview.addEventListener---------------' + FriendsList.testCount );
				Ti.API.info( 'in tableview click event listener: ' + e.row.id  );
				Ti.API.info( "Titanium.Facebook.accessToken: " + Titanium.Facebook.accessToken );
				Ti.API.info( 'tableview.index: ' + e.row.number );
				
				// Set row number so it automatically goes back to this spot when user goes back
				FriendsList.tableViewCurrentSelectedRow = e.row.number;
				
				FriendsList.hide();
				
				FriendsTopSearchList.fbID = e.row.id;
				FriendsTopSearchList.accessToken = Titanium.Facebook.accessToken;
				FriendsTopSearchList.main();				
			}			
		});
	
	}
};