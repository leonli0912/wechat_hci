sap.ui.define(["elearning_ui5/src/js/format/CustomerFormat",'sap/ui/core/mvc/Controller'], function(CustomerFormat,Controller) {
	return Controller.extend("elearning_ui5.controller.Ranking", {
    ALLSCORE_URL:"/clouldhr_server/UserScoreInformation_All/User_score",
	onInit : function() {
		
		this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
    	this.getView().setBusy(true);
		var that = this;
		$.ajax({
            type: "GET",
            dataType: 'json',
            url: this.getOwnerComponent().HCP_HOST+this.ALLSCORE_URL,
            contentType: "application/json",
            headers: {
                hrcloud_user_token: window.sessionStorage.getItem("login_token"),
            },
//            headers: {
//                "Authorization": "Basic amlheGluZzpjNjdmODBlODJlMWFkOGIzZjc0OGU1ODQ2YWQ5ODQ1Mzc2ZGU5NjU0ODNjNjM5NTAzMDZiMTAwYjdlMDhkMzFi",
//              },
            
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
//        var dataModel = new sap.ui.model.json.JSONModel("./model/medium.json");
//        this.getView().setModel(dataModel);
        

	},
	
	onListUpdateFinished:function(oEvent){
		var oList = this.byId("RankingList");
		var oItems = oList.getItems();
		
		oItems.forEach(function(item,index,array){
			item.mAggregations.content[0].mAggregations.items[0].mAggregations.items[0].mProperties.text = index + 1;
			
		});
		/*for(var oItem in oItems){
			oItem.mAggregations.content[0].mAggregations.items[0].mAggregations.items[0].mProperties.text=index;
			index = index+1;
		}*/
	}
	
});
})