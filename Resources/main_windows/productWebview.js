/////////////////////////////////////////////////
// Display the Product in a webview
/////////////////////////////////////////////////

var ProductWebView = {

	DetailPageURL: '',
	webview:Titanium.UI.createWebView({
		top:60,
		//url:this.DetailPageURL,
		scalesPageToFit:false
	}),
	actInd:Titanium.UI.createActivityIndicator({
			top:50,
			right:150,
			height:50,
			width:10,
			font:{fontFamily:'Helvetica Neue', fontSize:20,fontWeight:'bold'},
			color: 'black',
			message:'Loading...'
	}),
	main:function(){
		
		this.webview.url = this.DetailPageURL;
		this.show();
	},
	show:function(){
		
		NavigationBar.btnBack.action = 'ProductWebView';
	
		if( this.isAddedToWin ){
			// This objects element has already been added to the window.  You can just show it
		
			// Navigation bar
			NavigationBar.show();
		
			this.webview.show();

		} else {
			// This object elements has not been added to the current window.  Add them.
		
			this.isAddedToWin = true;
			
			// Navigation bar
			NavigationBar.show();
			
			// Table
			win.add(this.webview);
		}
		
		this.webview.addEventListener("beforeload", function(e){
			ProductWebView.actInd.show();
		});
		
		this.webview.addEventListener("load", function(e){
			ProductWebView.actInd.hide();
		});
	},
	hide:function(){
	
		this.actInd.hide();
		this.webview.hide();
	}
}