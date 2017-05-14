sap.ui.define(["elearning_ui5/src/js/format/CustomerFormat", "sap/ui/core/mvc/Controller", "sap/ui/core/routing/History"], function(CustomerFormat, Controller, History) {
    return Controller.extend("elearning_ui5.controller.Analysis", {
    	ALLSCORE_URL:"/clouldhr_server/UserScoreInformation_All/User_score",
    	oRouter:null,
    	onInit: function() {
        	this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        	this.getView().setBusy(true);
        	var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame");
            oVizFrame.setVizProperties({
                title: {
                    visible: false
                }
            });
            
            var oPopOver = this.getView().byId("idPopOver");
            oPopOver.connect(oVizFrame.getVizUid());
            oPopOver.setFormatString("__UI5__FloatMaxFraction2");
			var that = this;
			//if(!this.getOwnerComponent().getModel("points")){
				
			$.ajax({
	            type: "GET",
	            dataType: 'json',
	            url: this.getOwnerComponent().HCP_HOST+this.ALLSCORE_URL,
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
	            	 var json_v = json.value;
	            	 var map_v = new Map();
	            	 for(var o in json_v){ 
	            		 var region = map_v.get(json_v[o].Region);
	            		 if( region == null ){
	            			 map_v.set(json_v[o].Region,"1");
	            		 }else{
	            			 map_v.set(json_v[o].Region,Number(region) + 1);
	            		 }
	            	 }
	            	 var data = {};
	            	 var num = 0;
	            	 map_v.forEach(function(value ,key ,map) {
	            		 num = num + 1;
	            		 data[num] = {Region: key,Count:value};
	            		});
	                 listModel.setData(data);
	                 that.getView().setModel(listModel);
	            	
	            },
	            error:function(e){
	            	that.getView().setBusy(false);
	            	that.oRouter.navTo("logon");
	            	}
	            });
/*			}else{
				this.getView().setBusy(false);
	            var oPoints = this.getOwnerComponent().getModel("points");
	            var oPointsModel = new sap.ui.model.json.JSONModel();
	            oPointsModel.setData(oPoints);
	            this.getView().setModel(oPointsModel);
			}*/
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
                oRouter.navTo("appHome", {}, true);
            }
        }
    });
})