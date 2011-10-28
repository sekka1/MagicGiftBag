/////////////////////////////////////////////////
// Display the Product in a webview
/////////////////////////////////////////////////

var ProductWebView={
	
	btnBack: '',
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

	display: function(){
	
		this.webview.url = this.DetailPageURL;

		this.webview.addEventListener("beforeload", function(e){
			this.actInd.show();
		});
		
		this.webview.addEventListener("load", function(e){
			this.actInd.hide();
		});
		
		win.add( this.webview );
		win.add( this.actInd );
		
		btnBack.action = 'ProductWebView';
		btnBack.webview = webview;
		btnBack.btnBack = btnBack;
	
	},
	cleanup:function(){
		win.remove( this.actInd );
		win.remove( this.webview );
	}
}