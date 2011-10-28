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


var windowMain = Titanium.UI.createWindow({
	title:'Main',
	url:'main_windows/main.js'
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
windowLogin.windowMain = windowMain;

windowMain.backWindow = windowLogin;
windowMain.site_url = site_url;
windowMain.loader = loader;


/////////////////////////////////////////////
// Open First Window
/////////////////////////////////////////////
windowLogin.open();
