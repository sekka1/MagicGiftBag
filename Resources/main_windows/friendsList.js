/////////////////////////////////////////////////
// Display the Friends Lists Function
/////////////////////////////////////////////////
var FriendsList = {

	testCount:0,
	testDidShow:false,
	isAddedToWin:false,	
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
		this.show();
	},
	show:function(){
	
		///////////////////////////////////////////////
		this.testCount++; // Debuging.  Counting how many times the tableview click event happens
		this.testDidShow = false; // setting it so it only clicks one time.  have to fix this
		////////////////////////////////////////////////
	
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
		}
	},
	hide:function(){
	
		NavigationBar.hide();
		this.tableview.setData([]);
		this.tableview.hide();
	},
	getData:function(){

		Titanium.Facebook.requestWithGraphPath('me/friends', {}, 'GET', function(e) {
			if (e.success) {
				//Ti.API.info(e.result);
				Ti.API.info( '---Loading New friends list----' );
		
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
		
			if( ! FriendsList.testDidShow ){ // Delete me when this problem is figured out!!
			
				FriendsList.testDidShow = true;
			
				Ti.API.info( '---------------FriendsList tableview.addEventListener---------------' + FriendsList.testCount );
				Ti.API.info( 'in tableview click event listener: ' + e.row.id  );
				Ti.API.info( "Titanium.Facebook.accessToken: " + Titanium.Facebook.accessToken );
				
				FriendsList.hide();
				
				FriendsTopSearchList.fbID = e.row.id;
				FriendsTopSearchList.accessToken = Titanium.Facebook.accessToken;
				FriendsTopSearchList.main();				
			}			
		});
	
	}
};