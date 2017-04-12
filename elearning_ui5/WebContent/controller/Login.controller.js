jQuery.sap.require("sap.m.MessageBox");
sap.ui.define([ "elearning_ui5/src/js/format/CustomerFormat",'sap/ui/core/mvc/Controller' ],function(CustomerFormat, Controller) {
	return Controller.extend("elearning_ui5.controller.Login",{
    	TOKEN_URL:"/hcp_learning/oauth-api/rest/v1/token",
    	USERINFO_URL:"/hcp_learning/odatav4/searchStudent/v1/Students?$filter=criteria/learnerID eq %27eddiy%27",
    	_access_token:null,
    	_token_type:null,
		oRouter:null,
		
		onInit : function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			if(this._logonToken){
				
				this.oRouter.navTo("home");
			}
											
		},

		onPressLogon:function(){
/*			var username = this.getView().byId("username").getValue();
			var password = this.getView().byId("password").getValue();
		
			if(username===""){
				this.getView().byId("username").setValueState("Error");
				this.getView().byId("username").setValueStateText(
						"请输入用户名");
				return;
			};
			if(password===""){
				this.getView().byId("password").setValueState("Error");
				this.getView().byId("password").setValueStateText(
						"请输入密码");
				return;
			};
			var param = "?username=" + username +
			"&password=" + password +
			"&vendor=" + this._Customer;*/
			
			this.getView().setBusy(true);

			var that = this;
            var bodydata= {
                    grant_type: "client_credentials",
                    scope: {
                        userId: "PLATEAU",
                        companyId: "jiaxing",
                        userType: "admin",
                        resourceType: "learning_public_api"
                    }
                };
            
			 $.ajax({
	                type: "POST",
	                dataType: 'json',
	                url: this.TOKEN_URL,
	                contentType: "application/json",
	                headers: {
	                    "Authorization": "Basic amlheGluZzpjNjdmODBlODJlMWFkOGIzZjc0OGU1ODQ2YWQ5ODQ1Mzc2ZGU5NjU0ODNjNjM5NTAzMDZiMTAwYjdlMDhkMzFi",
	                  },
	                data:JSON.stringify(bodydata),
	                success: function(json) {
	                	that.getView().setBusy(false);
	                	that._access_token = json.access_token;
	                	that._token_type=json.token_type;
	                    console.log("success...");
	                    console.log(json); 
	        			var oTokenModel = new sap.ui.model.json.JSONModel(json);
	        			sap.ui.getCore().setModel(oTokenModel, "token");
	        			that.oRouter.navTo("home");
	                    },
	                    error: function(e) {
	                        console.log(e.message);
	                        that.getView().setBusy(false);
	                    }
	                });
			 


		}
	});})