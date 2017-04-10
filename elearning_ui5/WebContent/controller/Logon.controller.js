jQuery.sap.require("sap.m.MessageBox");
sap.ui.define([ "elearning_ui5/src/js/format/CustomerFormat",'sap/ui/core/mvc/Controller' ],function(CustomerFormat, Controller) {
	return Controller.extend("elearning_ui5.controller.Logon",{
		_logonToken:null,
		oRouter:null,
		
		onInit : function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("logon").attachPatternMatched(
					this._onPatternMatched, this);
			if(this._logonToken){
				
				this.oRouter.navTo("home");
			}
											
		},
		_onPatternMatched:function(){
			
		},
		onPressLogon:function(){
			var username = this.getView().byId("username").getValue();
			var password = this.getView().byId("password").getValue();
			//var verifyCode = this.getView().byId("verifyCode").getValue();
			//var aggreementCheck = this.getView().byId("aggreementCheck").getSelected();
			//var dpcsShowed = this.getView().byId("dpcsAgreed").getVisible();
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

/*			if (username === "" || password === "") {
				var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
				this.getView().byId("username").setValueState("Error");
				this.getView().byId("username").setValueStateText(
						"请输入用户名和密码");
				sap.m.MessageBox.alert(
				    	"请输入用户名和密码",
				    	{
				    		styleClass: bCompact? "sapUiSizeCompact" : ""
				    	}
				    );
				return;
			}
*/
			this.getView().setBusy(true);
			var param = "?username=" + username +
						"&password=" + password +
						"&vendor=" + this._Customer;

			var that = this;
			var cfg = {
				type : 'POST',
				dataType : 'json'
			};

			cfg.url = "parse/pr/" + this._vendor + param;
			//test code
			this.getView().setBusy(false);
			this.oRouter.navTo("home");
/*
		    $.ajax(cfg).success(function(data) {
		    	that.getView().setBusy(false);
		    	if(data){
		    		if (that._vendor === "job51" || that._vendor === "dajie" || that._vendor === "liepin") {
		    			that.getVerifyCode();
		    		}
		    		//handle framework level error code
		    		if(!data.code){
						if(data.failureCount == 0){
							that.showMessage(that.getView().getModel("wi18n").getResourceBundle().getText("RESUME_IMPORT_SUCCESS"), jQuery.proxy(that.goToCandidateList, that));
						}else if (data.failureCount != 0 && data.failure[0].status == -1){
							that.showMessage(that.getView().getModel("wi18n").getResourceBundle().getText("RESUME_ALREADY_EXIST"), jQuery.proxy(that.goToCandidateList, that));
						}else{
							that.showMessage(data.failureCount + that.getView().getModel("wi18n").getResourceBundle().getText("RESUME_IMPORT_FAILED"), jQuery.proxy(that.goToCandidateList, that));
						}
		    		}else if (data.code){
		    			if(data.code == "-1001" || data.code == "-1002"){
		    				that.showMessage(that.getView().getModel("wi18n").getResourceBundle().getText(data.message));
		    			}else{
		    				that.showMessage(that.getView().getModel("wi18n").getResourceBundle().getText("CANDIDATE_LIST_ERROR_MESSAGE"));
		    			}
					}
		    	}else{
		    		that.showMessage(that.getView().getModel("wi18n").getResourceBundle().getText("CANDIDATE_LIST_ERROR_MESSAGE"));
		    	}
		    }).error(function(){
		    	that.getView().setBusy(false);
		    	that.showMessage(that.getView().getModel("wi18n").getResourceBundle().getText("RESUME_IMPORT_FAILED"));
		    });
*/
		}

	});	
})