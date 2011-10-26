var win = Titanium.UI.currentWindow;
win.setBackgroundImage('../images/templates/multi-color/MGB-AppSplash.png');

// Pin orientation
win.orientationModes = [Titanium.UI.PORTRAIT];

////////////////////////////////////////////
// Top Nav Bar
////////////////////////////////////////////

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

var titlebar_logo = Titanium.UI.createLabel({
        //image:'../images/wedvite_logo.png',
        text:'Magic Gift Bag',
        top:60,
        left:72,
        width: 176,
        height:60,
	    borderWidth: 0,
	    borderRadius: 0
});
//win.add(titlebar_logo);

////////////////////////////////////////////
// Top Nav Bar End
////////////////////////////////////////////

////////////////////////////////////////////
// After Login Buttons
////////////////////////////////////////////


var windowFriendsList = Titanium.UI.createWindow({
	title:'Friends List',
	url:'friendsList.js'
});

var btnFriendsList = Titanium.UI.createButton({  
	title:'Look for a Gift',  
	top:30,  
	left:150,
	width:150,  
	height:40,
	borderRadius:1,  
	font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}  
});

btnFriendsList.addEventListener('click', function(){

	windowFriendsList.site_url = win.site_url;
	windowFriendsList.loader = win.loader;
	windowFriendsList.backWindow = win;
	windowFriendsList.open();
	win.hide();
	
});

//var a = Titanium.UI.createAnimation();

////////////////////////////////////////////
// After Login Buttons End
////////////////////////////////////////////

////////////////////////////////////////////
// Facebook login button
////////////////////////////////////////////

Titanium.Facebook.appid = '146836712079037';
Titanium.Facebook.permissions = ['user_status' ,'publish_stream', 'user_photos', 'friends_photos', 'friends_status', 'user_videos', 'friends_videos', 'read_stream', 'read_friendlists', 'manage_friendlists', 'read_requests']; // Permissions your app needs
Titanium.Facebook.permissions = ['user_about_me', 'user_activities', 'user_birthday', 'user_education_history', 'user_events', 'user_groups', 'user_hometown', 'user_interests', 'user_likes', 'user_location', 'user_relationships', 'user_relationship_details', 'user_religion_politics', 'user_status', 'read_friendlists', 'read_insights', 'read_stream', 'user_checkins', 'friends_about_me', 'friends_activities', 'friends_birthday', 'friends_education_history', 'friends_events', 'friends_groups', 'friends_hometown', 'friends_interests', 'friends_likes', 'friends_location', 'friends_relationships', 'friends_relationship_details', 'friends_religion_politics', 'friends_status', 'friends_work_history', 'friends_checkins', 'publish_stream', 'publish_checkins']; // Permissions your app needs

//Titanium.Facebook.authorize(); // If this is uncommented the facebook login would automatically pop up
Titanium.Facebook.addEventListener('login', function(e) {
    if (e.success) {
        Ti.API.info( 'Logged In as: ' + Titanium.Facebook.uid );
        
        win.add(btnFriendsList);
        
    } else if (e.error) {
        alert(e.error);
    } else if (e.cancelled) {
        Ti.API.info( 'Cancelled Facebook Login' );
    }
});

Titanium.Facebook.addEventListener('logout', function(e) {
    Titanium.API.log("User logged out.");
});

win.add(Titanium.Facebook.createLoginButton({ top: 325, 'style': 'wide' }));

////////////////////////////////////////////
// Facebook login button End
////////////////////////////////////////////


////////////////////////////////////////////
// After logged into Facebook
////////////////////////////////////////////

if( Titanium.Facebook.loggedIn ){

	win.add(btnFriendsList);
}

////////////////////////////////////////////
// After logged into Facebook End
////////////////////////////////////////////
