jQuery.sap.require("sap.m.MessageBox");
sap.ui.define([ "elearning_ui5/src/js/format/CustomerFormat",'sap/ui/core/mvc/Controller' ],function(CustomerFormat, Controller) {
	return Controller.extend("elearning_ui5.controller.Login",{
    	LOGIN_URL:"/clouldhr_server/UserLogin",
    	USERINFO_URL:"/hcp_learning/odatav4/searchStudent/v1/Students?$filter=criteria/learnerID eq %27eddiy%27",
    	_username:null,
    	_password:null,
		oRouter:null,
		
		onInit : function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			if(this._logonToken){
				
				this.oRouter.navTo("home");
			}
											
		},

		onPressLogon:function(){
			this._username = this.getView().byId("id_username").getValue();
			this._password = this.getView().byId("id_password").getValue();
		
			if(this._username===""){
				this.getView().byId("id_username").setValueState("Error");
				this.getView().byId("id_username").setValueStateText(
						"请输入用户名");
				return;
			};
			if(this._password===""){
				this.getView().byId("id_password").setValueState("Error");
				this.getView().byId("id_password").setValueStateText(
						"请输入密码");
				return;
			};

			
			this.getView().setBusy(true);

			var that = this;
            var bodydata= {
                        "User_id": this._username,
                        "Password": this._password
                };
            
			 $.ajax({
	                type: "POST",
	                dataType: 'text',
	                url: this.LOGIN_URL,
	                contentType: "application/json",
//	                headers: {
//	                    "Authorization": "Basic amlheGluZzpjNjdmODBlODJlMWFkOGIzZjc0OGU1ODQ2YWQ5ODQ1Mzc2ZGU5NjU0ODNjNjM5NTAzMDZiMTAwYjdlMDhkMzFi",
//	                  },
	                data:JSON.stringify(bodydata),
	                success: function(text) {
	                	that.getView().setBusy(false);
	                	if(that._username===text){
	                		that.oRouter.navTo("home");
	                		console.log("success...");
	                	}else{
	                		console.log("fail to logon...");
	                	}
	                    },
	                    error: function(e) {
	                        console.log(e.message);
	                        that.getView().setBusy(false);
	                    }
	                });
			 


		}
	});})