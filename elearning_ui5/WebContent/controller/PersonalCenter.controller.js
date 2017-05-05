sap.ui.define(["elearning_ui5/src/js/format/CustomerFormat", "sap/ui/core/mvc/Controller", "sap/ui/core/routing/History"], function(CustomerFormat, Controller, History) {
	return Controller.extend("elearning_ui5.controller.PersonalCenter", {
	USERINFO_URL: "/clouldhr_server/UserInformation/Users",
	userModel:null,
	wechatModel:null,
	onButtonPress: function() {
		var oHistory = History.getInstance();
        var sPreviousHash = oHistory.getPreviousHash();

        if (sPreviousHash !== undefined) {
            window.history.go(-1);
        } else {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("tile", {}, true);
        }
		},
		
	onInit : function() { 
		
		if(!this.getOwnerComponent().getModel("userInfo")){
			
			//GET USER INFO
			this.getView().setBusy(true);
			var that = this;
			$.ajax({
	            type: "GET",
	            dataType: '	json',
	            url: this.USERINFO_URL,
	            contentType: "application/json",
	            headers:{hrcloud_user_token:window.sessionStorage.getItem("login_token")},
				success:function(json){
					that.getView().setBusy(false);
					that.getOwnerComponent().setModel(json.value[0],"userInfo");
					that.userModel = new sap.ui.model.json.JSONModel();
					that.userModel.setData(json.value[0]);
					that.getView().setModel(that.userModel);
				},
				error:function(e){
					//token expired
					
				}
			});
		}
		
//		this.userModel = new sap.ui.model.json.JSONModel();
//		var oUserData = this.getOwnerComponent().getModel("userInfo");
//		oUserData.headimgurl = JSON.parse(window.sessionStorage.getItem("wechat_user")).headimgurl;
//		this.userModel.setData(oUserData); 
//		this.getView().setModel(this.userModel);
		
		this.wechatModel = new sap.ui.model.json.JSONModel();
		this.wechatModel.setData(JSON.parse(window.sessionStorage.getItem("wechat_user")));
		this.getView().setModel(this.wechatModel,"wechat");
	}
	
});
})