var win = Titanium.UI.currentWindow;

Ti.API.info( "availableMemory: " + Titanium.Platform.availableMemory );

// Pin orientation
win.orientationModes = [Titanium.UI.PORTRAIT];

/////////////////////////////////////////////////
// Include All the various pages files
/////////////////////////////////////////////////
Ti.include('NavigationBar.js');
Ti.include('Login.js');
Ti.include('FriendsList.js');
Ti.include('FriendsTopSearchList.js');
Ti.include('SearchResults.js');
Ti.include('ProductWebView.js');


/////////////////////////////////////////////////
// Display
/////////////////////////////////////////////////

// Setup Navigation Bar
NavigationBar.main();
NavigationBar.hide();
NavigationBar.addEventListener();

// Loading login page
Login.main();
