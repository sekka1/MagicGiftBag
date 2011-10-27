// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#FFF');

Ti.API.info( "Platform: " + Titanium.Platform.name );

/////////////////////////////////////////////
// Global Variables
/////////////////////////////////////////////
var site_url = 'http://www.magicgiftbag.com/';


/////////////////////////////////////////////
// Creating All Windows
/////////////////////////////////////////////
var windowLogin = Titanium.UI.createWindow({
    title:'User Login',
    url:'main_windows/login.js',
    exitOnClose: true
});

var windowFriendsList = Titanium.UI.createWindow({
	title:'Friends List',
	url:'main_windows/friendsList.js'
});

var windowFriendsTopSearchTerms = Titanium.UI.createWindow({
	title:'Friends Top Search Terms',
	url:'main_windows/friendsTopSearchTerms.js'
});

var windowAmazonSearchResults = Titanium.UI.createWindow({
	title:'Search Results',
	url:'main_windows/searchResults.js'
});

var windowProductWebView = Titanium.UI.createWindow({
	title:'Product Webview',
	url:'main_windows/productWebview.js'
});

/////////////////////////////////////////////
// Creating App Objects
/////////////////////////////////////////////

// Create our HTTP Client and name it "loader"
var loader = Titanium.Network.createHTTPClient();

/////////////////////////////////////////////
// Passing Variables to Each Window
/////////////////////////////////////////////

// Login Window
windowLogin.site_url = site_url;
windowLogin.loader = loader;
windowLogin.windowFriendsList = windowFriendsList;

windowFriendsList.backWindow = windowLogin;
windowFriendsList.site_url = site_url;
windowFriendsList.loader = loader;
windowFriendsList.windowFriendsTopSearchTerms = windowFriendsTopSearchTerms;

windowFriendsTopSearchTerms.backWindow = windowFriendsList;
windowFriendsTopSearchTerms.site_url = site_url;
windowFriendsTopSearchTerms.loader = loader;
windowFriendsTopSearchTerms.windowAmazonSearchResults = windowAmazonSearchResults;

windowAmazonSearchResults.backWindow = windowFriendsTopSearchTerms;
windowAmazonSearchResults.site_url = site_url;
windowAmazonSearchResults.loader = loader;
windowAmazonSearchResults.windowProductWebView = windowProductWebView;

windowProductWebView.backWindow = windowAmazonSearchResults;
windowProductWebView.site_url = site_url;
windowProductWebView.loader = loader;

/////////////////////////////////////////////
// Open First Window
/////////////////////////////////////////////
windowLogin.open();
