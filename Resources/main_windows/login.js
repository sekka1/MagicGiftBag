/////////////////////////////////////////////////
// Login Page
/////////////////////////////////////////////////

var Login = {

	isAddedToWin:false,
	nav_bar:'',
	btnBack:'',
	titleName:'',
	btnFriendsList:Titanium.UI.createButton({  
		backgroundImage:'../images/templates/multi-color/MGB-AppSearchButton.png',
		backgroundSelectedImage: '../images/templates/multi-color/MGB-AppSearchButtonPressed.png',  
		bottom:50,  
		left:75,
		width:176,  
		height:64,
		borderRadius:1,  
		font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}  
	}),
	main:function(){
	
		this.setFacebookOptions();
		this.show();
		this.addEventListeners();
	},
	show:function(){
	
		win.setBackgroundImage('../images/templates/multi-color/MGB-AppSplash.png');
	
		if( this.isAddedToWin ){
			// This objects element has already been added to the window.  You can just show it
		
			win.add(Titanium.Facebook.createLoginButton({ bottom:2, 'style': 'wide' }));
	
			if( Titanium.Facebook.loggedIn ){
			
				this.btnFriendsList.show();
			}
		} else {
			// This object elements has not been added to the current window.  Add them.
			
			this.isAddedToWin = true;
		
			win.add(Titanium.Facebook.createLoginButton({ bottom:2, 'style': 'wide' }));
	
			if( Titanium.Facebook.loggedIn ){
			
				win.add(this.btnFriendsList);
			}
		}
	},
	hide:function(){
	
		// This dont seem to work calling the remove
		//Titanium.Facebook.createLoginButton.hide();

		if( Titanium.Facebook.loggedIn ){
		
			//win.hide(this.btnFriendsList);
			this.btnFriendsList.hide();
		}
	},
	setFacebookOptions:function(){
		
		Titanium.Facebook.appid = '146836712079037';
		Titanium.Facebook.permissions = ['user_status' ,'publish_stream', 'user_photos', 'friends_photos', 'friends_status', 'user_videos', 'friends_videos', 'read_stream', 'read_friendlists', 'manage_friendlists', 'read_requests']; // Permissions your app needs
		Titanium.Facebook.permissions = ['user_about_me', 'user_activities', 'user_birthday', 'user_education_history', 'user_events', 'user_groups', 'user_hometown', 'user_interests', 'user_likes', 'user_location', 'user_relationships', 'user_relationship_details', 'user_religion_politics', 'user_status', 'read_friendlists', 'read_insights', 'read_stream', 'user_checkins', 'friends_about_me', 'friends_activities', 'friends_birthday', 'friends_education_history', 'friends_events', 'friends_groups', 'friends_hometown', 'friends_interests', 'friends_likes', 'friends_location', 'friends_relationships', 'friends_relationship_details', 'friends_religion_politics', 'friends_status', 'friends_work_history', 'friends_checkins', 'publish_stream', 'publish_checkins']; // Permissions your app needs
		
		//Titanium.Facebook.authorize(); // If this is uncommented the facebook login would automatically pop up
		Titanium.Facebook.addEventListener('login', function(e) {
				
			if (e.success) {
				Ti.API.info( 'Logged In as: ' + Titanium.Facebook.uid );
				Ti.API.info( '---------------Login tableview.addEventListener---------------' + FriendsList.testCount );

				//win.add(Login.btnFriendsList);
				Login.show();
				
			} else if (e.error) {
				alert(e.error);
			} else if (e.cancelled) {
				Ti.API.info( 'Cancelled Facebook Login' );
			}
		});
		
		Titanium.Facebook.addEventListener('logout', function(e) {
			Titanium.API.log("User logged out.");
			
			Login.btnFriendsList.hide();
		});
		
	},
	addEventListeners:function(){
	
		this.btnFriendsList.addEventListener('click', function(){
		
			Login.hide();
			FriendsList.main();
			
		});	
	}
}