var win = Titanium.UI.currentWindow;  

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
   Ti.API.info( "Event info back button pressed..." );
   win.backWindow.show();
   win.close();
});

var titleName = Titanium.UI.createLabel({  
        text:'Product Page',  
        top:10,  
        left:125,  
        borderRadius:0,  
        height:'auto',
        color:'white'
}); 
win.add(titleName);


////////////////////////////////
// A webview with the Amazon product
////////////////////////////////

var actInd = Titanium.UI.createActivityIndicator({
	top:50,
	right:150,
	height:50,
	width:10,
	font:{fontFamily:'Helvetica Neue', fontSize:20,fontWeight:'bold'},
	color: 'black',
	message:'Loading...'
});

var webview = Titanium.UI.createWebView({
    top:60,
    url:win.DetailPageURL,
    scalesPageToFit:false
});

webview.addEventListener("beforeload", function(e){
    actInd.show();
});

webview.addEventListener("load", function(e){
    actInd.hide();
});

win.add( webview );
win.add( actInd );