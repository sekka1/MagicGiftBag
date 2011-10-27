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

btnBack.addEventListener('click', function()
{
	//alert('pressed back button');
   //Ti.API.info( "Event info back button pressed friendsLists..." );
   win.remove(tableview)
   win.backWindow.show();
   win.close();
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

// Search bar on top of the table view
var search = Titanium.UI.createSearchBar({
	showCancel:true,
	opacity:1.0,
});

// create table view
var tableview = Titanium.UI.createTableView({
    top:60,
    //backgroundImage:'../images/templates/multi-color/MGB-AppBGWatermark.png',
    opacity:1.0,
    search:search,
    filterAttribute:'title'
});


Titanium.Facebook.requestWithGraphPath('me/friends', {}, 'GET', function(e) {
    if (e.success) {
        //Ti.API.info(e.result);

        results = eval('('+e.result+')');
        
        Ti.API.info( '# of fb friends: ' + results.data.length );
 

        //for (var i=0;i<results.data.length;i++){
        for (var i=0;i<30;i++){

        	// The left image doesn not work right now.  It is a titanium bug where it wont
        	// show a remote url in the left image.
        	var row = Ti.UI.createTableViewRow({
  				title:results.data[i].name,
  				hasChild:true,
  				opacity:1.0,
			});
						
			row.id = results.data[i].id;

			tableview.appendRow( row );
        }

    } else if (e.error) {
        alert(e.error);
    } else {
        alert('Unknown response');
    }
});

tableview.addEventListener('click', function(e){

	Ti.API.info( 'in tableview click event listener: ' + e.row.id  );
	Ti.API.info( "Titanium.Facebook.accessToken: " + Titanium.Facebook.accessToken );
	
	//windowFriendsTopSearchTerms.site_url = win.site_url;
	win.windowFriendsTopSearchTerms.accessToken = Titanium.Facebook.accessToken;
	//windowFriendsTopSearchTerms.loader = win.loader;
	win.windowFriendsTopSearchTerms.fbID = e.source.id;
	//win.windowFriendsTopSearchTerms.backWindow = win;
	win.windowFriendsTopSearchTerms.open();
	win.hide();
	
});
win.add(tableview);


