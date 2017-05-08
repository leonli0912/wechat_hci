sap.ui.define([ "elearning_ui5/src/js/format/CustomerFormat",'sap/ui/core/mvc/Controller' ],function(CustomerFormat, Controller) {
	return Controller.extend("elearning_ui5.controller.Loading", {
		WECHAT_URL:"/clouldhr_server/WechatLogin",
		oRouter:null,
		oShell:null,
		onInit : function() {
			
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			
			//GET TOKEN FROM WECHAT
	        var request = this.GetRequest();
			var code = request["code"];
			var bodydata = {code:code}
			this.getView().setBusy(true);
			var that = this;
			$.ajax({
	            type: "POST",
	            dataType: 'json',
	            url: this.getOwnerComponent().HCP_HOST+this.WECHAT_URL,
	            contentType: "application/json",
	            data:JSON.stringify(bodydata),
//	            headers: {
//	                "Authorization": "Basic amlheGluZzpjNjdmODBlODJlMWFkOGIzZjc0OGU1ODQ2YWQ5ODQ1Mzc2ZGU5NjU0ODNjNjM5NTAzMDZiMTAwYjdlMDhkMzFi",
//	              },
	            
	            success: function(json) {
	            	that.getView().setBusy(false);
	            	window.sessionStorage.setItem("login_token",json.access_token[0]);
        			window.sessionStorage.setItem("wechat_user",JSON.stringify(json.wechat_user[0]));
        			that.oShell.setHeaderVisible(true);
        			that.oRouter.navTo("appHome");
	            },
	            error:function(e){
	            	that.getView().setBusy(false);
	            	that.oRouter.navTo("logon");
	            	}
	            });
		},
		GetRequest:function() {
		  	  
		  	  var url = location.search; //获取url中"?"符后的字串
		  	   var theRequest = new Object();
		  	   if (url.indexOf("?") != -1) {
		  	      var str = url.substr(1);
		  	      strs = str.split("&");
		  	      for(var i = 0; i < strs.length; i ++) {
		  	         theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
		  	      }
		  	   }
		  	   return theRequest;
		 },
		  	
		onAfterRendering:function(){
				this.oShell = sap.ui.getCore().byId("mainShell");
				this.oShell.setHeaderVisible(false);
			
		}
	});
	

});