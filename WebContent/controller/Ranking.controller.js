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
            	 var json_v = json.value;
            	 var num = 1;
            	 var score_tmp;
            	 var my_ranking;
            	 json.value.forEach(function(item,index,array){
                 	if(item.Wechat_nickname === JSON.parse(window.sessionStorage.getItem("wechat_user")).nickname){
                 		my_ranking = index+1;
                 	}
                 });
            	 my_ranking = {myranking:my_ranking};
                 for(var o in json_v){ 
                	 json_v[o].num = num;
                	 //json_v[o].myranking = my_ranking;
                     if(json_v[o].Score == score_tmp) {
                    	 
                     }else{
                    	 num = num + 1;
                     }
                     score_tmp = json_v[o].Score
                   }  
                 my_ranking.value = json_v;
                 
                 listModel.setData(my_ranking);
                 that.getView().setModel(listModel);
            	
            },
            error:function(e){
            	
/*            	//删除
            	
            	json = {
            			  "@odata.context": "$metadata#User_score",
            			  "value": [
            			    {
            			      "User_id": "tomtang",
            			      "Course_id": null,
            			      "Course_version": null,
            			      "Score": "66",
            			      "Title": null,
            			      "Course_type": null,
            			      "Wechat_nickname": "汤孝光",
            			      "Wechat_img": "http://wx.qlogo.cn/mmopen/h9bsB7kKobKNzkhJ04lzwZpVJiaUuTjHSCZYpWZkypykUbhFMPVnIL337BQibkrFUbGW1eINzJamJpbibW5phsGzKCgIHmNib64x/0"
            			    },
            			    {
            			      "User_id": "caoping",
            			      "Course_id": null,
            			      "Course_version": null,
            			      "Score": "52",
            			      "Title": null,
            			      "Course_type": null,
            			      "Wechat_nickname": "safty",
            			      "Wechat_img": "http://wx.qlogo.cn/mmopen/ajNVdqHZLLBFIFVWzlS0rea952r3vqZxfWJSjUejhMPJL53FuvkHCHIhv4332XWBxTLOLXNVTTB6txBBNDtVZA/0"
            			    },
            			    {
            			      "User_id": "dichun",
            			      "Course_id": null,
            			      "Course_version": null,
            			      "Score": "40",
            			      "Title": null,
            			      "Course_type": null,
            			      "Wechat_nickname": "oracion",
            			      "Wechat_img": "http://wx.qlogo.cn/mmopen/GhnOE4q4ldSE6WMQAHRBWhNZVwfSvL9ribnc2JveWM20wle95ZOcIg9480nkibQhXlVrsuCOFdtnWkvPtaj0b1nDefFu1aados/0"
            			    },
            			    {
            			      "User_id": "leon",
            			      "Course_id": null,
            			      "Course_version": null,
            			      "Score": "40",
            			      "Title": null,
            			      "Course_type": null,
            			      "Wechat_nickname": "leon",
            			      "Wechat_img": "http://wx.qlogo.cn/mmopen/ajNVdqHZLLBFIFVWzlS0rea952r3vqZxfWJSjUejhMPJL53FuvkHCHIhv4332XWBxTLOLXNVTTB6txBBNDtVZA/0"
            			    }
            			  ]
            			};*/
            that.getView().setBusy(false);
           	 var listModel = new sap.ui.model.json.JSONModel();
           	 var json_v = json.value;
           	 var num = 1;
           	 var score_tmp;
           	 var my_ranking;
           	 json.value.forEach(function(item,index,array){
                	if(item.Wechat_nickname == "汤孝光"){
                		my_ranking = index+1;
                	}
                });
           	 my_ranking = {myranking:my_ranking};
                for(var o in json_v){ 
               	 json_v[o].num = num;
               	 //json_v[o].myranking = my_ranking;
                    if(json_v[o].Score == score_tmp) {
                   	 
                    }else{
                   	 num = num + 1;
                    }
                    score_tmp = json_v[o].Score
                  }  
                my_ranking.value = json_v;
                
                listModel.setData(my_ranking);
                that.getView().setModel(listModel);
            	
            	//删除
            	
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
	},
    onButtonPress: function() {
   
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("appHome");
     
    }
	
});
})