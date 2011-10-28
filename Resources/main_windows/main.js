var win = Titanium.UI.currentWindow;  
win.setBackgroundImage('../images/templates/multi-color/MGB-AppBGWatermark.png');

Ti.API.info( "availableMemory: " + Titanium.Platform.availableMemory );

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

//var btnBack = Titanium.UI.createButton({  
var btnBack = Titanium.UI.createButton({  
    title:'',  
    backgroundImage:'../images/templates/multi-color/back.png',
    backgroundSelectedImage: '../images/templates/multi-color/back_over.png',
    top:10,  
    left:2,
    width:88,  
    height:32,
    borderRadius:1,  
    font:{fontFamily:'Arial',fontWeight:'bold',fontSize:14}  
});  
win.add(btnBack);

btnBack.addEventListener('click', function(e)
{
	Ti.API.info( 'e.source.action: ' + e.source.action );

	if( e.source.action == 'FriendsList' ){

	   win.backWindow.show();
	   win.close();
   }
   if( e.source.action == 'FriendsTopSearchList' ){
   
		FriendsTopSearchList.cleanup();
		FriendsList.display();
   }
	if( e.source.action == 'SearchResults' ){

	   SearchResults.cleanup();
	   FriendsTopSearchList.display();
   }
   if( e.source.action == 'ProductWebView' ){

		ProductWebView.cleanup();
   }
});

var titleName = Titanium.UI.createLabel({  
        text:'Facebook Friends',  
        top:10,  
        left:125,  
        borderRadius:0,  
        height:'auto',
        color:'white'
}); 
win.add(titleName);


/////////////////////////////////////////////////
// Include All the various pages files
/////////////////////////////////////////////////
Ti.include('FriendsList.js');
Ti.include('friendsTopSearchList.js');
Ti.include('searchResults.js');
Ti.include('productWebView.js');


/////////////////////////////////////////////////
// Display
/////////////////////////////////////////////////
FriendsList.btnBack = btnBack;
FriendsList.main();
