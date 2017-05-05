sap.ui.define([ "elearning_ui5/src/js/format/CustomerFormat",'sap/ui/core/mvc/Controller' ],function(CustomerFormat, Controller) {
	return Controller.extend("elearning_ui5.controller.Loading", {
		WECHAT_URL:"/clouldhr_server/WechatLogin",
		oRouter:null,
		onInit : function() {
			
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			
			//GET TOKEN FROM WECHAT
			var bodydata = {code:"051P02sh12JORw09gbqh1ltQrh1P02sJ"}
			this.getView().setBusy(true);
			var that = this;
			$.ajax({
	            type: "POST",
	            dataType: 'json',
	            url: this.WECHAT_URL,
	            contentType: "application/json",
	            data:JSON.stringify(bodydata),
//	            headers: {
//	                "Authorization": "Basic amlheGluZzpjNjdmODBlODJlMWFkOGIzZjc0OGU1ODQ2YWQ5ODQ1Mzc2ZGU5NjU0ODNjNjM5NTAzMDZiMTAwYjdlMDhkMzFi",
//	              },
	            
	            success: function(json) {
	            	that.getView().setBusy(false);
	            	window.sessionStorage.setItem("login_token",json.access_token);
	            	window.sessionStorage.setItem("user_info",json.wechat_user)
	            	that.oRouter.navTo("appHome");
	            },
	            error:function(e){
	            	that.getView().setBusy(false);
	            	that.oRouter.navTo("logon");
	            	}
	            });
		}	
	});
	

});