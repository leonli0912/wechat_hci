sap.ui.define(["elearning_ui5/src/js/format/CustomerFormat", "sap/ui/core/mvc/Controller", "sap/ui/core/routing/History"], function(CustomerFormat, Controller, History) {
    return Controller.extend("elearning_ui5.controller.Points", {
    	SCORE_URL:"/clouldhr_server/UserScoreInformation/User_score",
    	oRouter:null,
    	onInit: function() {
        	this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        	this.getView().setBusy(true);
			var that = this;
			$.ajax({
	            type: "GET",
	            dataType: 'json',
	            url: this.getOwnerComponent().HCP_HOST+this.SCORE_URL,
	            contentType: "application/json",
	            headers: {
                    hrcloud_user_token: window.sessionStorage.getItem("login_token"),
                },
//	            headers: {
//	                "Authorization": "Basic amlheGluZzpjNjdmODBlODJlMWFkOGIzZjc0OGU1ODQ2YWQ5ODQ1Mzc2ZGU5NjU0ODNjNjM5NTAzMDZiMTAwYjdlMDhkMzFi",
//	              },
	            
	            success: function(json) {
	            	that.getView().setBusy(false);
	            	 var listModel = new sap.ui.model.json.JSONModel();
	                 listModel.setData(json.value);
	                 that.getView().setModel(listModel);
	            	
	            },
	            error:function(e){
	            	that.getView().setBusy(false);
	            	that.oRouter.navTo("logon");
	            	}
	            });
        },
        onDataReceived: function(sChannel, sEvent, oData) {

        },
        onButtonPress: function() {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("tile", {}, true);
            }
        }
    });
})