//jQuery.sap.require("releaseManagement.util.Service");
//jQuery.sap.require("releaseManagement.util.Controller");

sap.ui.controller("elearning_ui5.controller.Tile", {
    USERINFO_URL: "/clouldhr_server/UserInformation/Users",
    WECHAT_URL: "/clouldhr_server/WechatLogin",
    LEARNING_URL: "/clouldhr_server/SFLearningHistory",
    ALLSCORE_URL:"/clouldhr_server/UserScoreInformation_All/User_score",
    SCORE_URL:"/clouldhr_server/UserScoreInformation/User_score",
    
    oSession_token: null ,
    oRouter: null ,
    onInit: function() {
        
        var Windowwidth = window.screen.availWidth;
        // init router
        this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        this.oRouter.getRoute("appHome").attachPatternMatched(
        this._onPatternMatched, this);
        
        //check login session

        this.oSession_token = window.sessionStorage.getItem("login_token");
        
        if (!this.oSession_token) {
        
        
        }
    
    },
    
  	
    onBeforeRendering: function() {
    
    },
    onAfterRendering: function() {
        if (!this.oSession_token) {
            this.oRouter.navTo("loading");
        }
    
    },
    onPressCourse: function(evt) {
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("jobList");
    },
    onPressRanking: function(evt) {
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("ranking");
    },
    onPressPoints: function(evt) {
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("points");
    },
    onLogoffPress: function() {
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        sap.ui.getCore().byId("mainShell").setHeaderVisible(false);
        oRouter.navTo("logon", {
            logout: true
        });
    },
    onPressUser: function() {
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("user", {
            userId: 'u01'
        });
    },
    onPressNews:function(){
    	//window.open('https://www.sap.com/product/technology-platform/cloud-platform.html');
    },
    
    handleLogoffPress: function(evt) {
    /*    var oUser = sap.ui.getCore().getModel("user");
        oUser.login = false;
        sap.ui.getCore().setModel(oUser, "user");
        
		 * var r = new sap.ui.getCore().byId("id_HomePage"); r.destroy();
		 
        location.reload(true);
        window.sessionStorage.removeItem("login_token");
        window.sessionStorage.removeItem("wechat_user");
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("login");*/
    },
    
    _onPatternMatched: function() {
        var that = this;
        this.oSession_token = window.sessionStorage.getItem("login_token");
        if (this.oSession_token) {
            //GET COURSE TILE NUMBER
            if (!this.getOwnerComponent().getModel("LearningHistory")) {
                var oCourseTileContent = this.byId("id_NumericCourse");
                //oCourseTileContent.setBusy(true);
                $.ajax({
                    type: "GET",
                    dataType: '	json',
                    url: this.getOwnerComponent().HCP_HOST+this.LEARNING_URL,
                    contentType: "application/json",
                    headers: {
                        hrcloud_user_token: this.oSession_token
                    },
                    success: function(json) {
                        that.byId("id_NumericCourse").setBusy(false);
                        that.getOwnerComponent().setModel(json.value,"LearningHistory");
                        that.byId("id_NumericCourse").setValue(json.value.length);
                    },
                    error: function(e) {
                        var log = e.message;
                    }
                });
            }
            
          //GET RANKING TILE NUMBER
            if (!this.getOwnerComponent().getModel("Ranking")) {
                var oCourseTileContent = this.byId("id_NumericRanking");
                //oCourseTileContent.setBusy(true);
                $.ajax({
                    type: "GET",
                    dataType: '	json',
                    url: this.getOwnerComponent().HCP_HOST+this.ALLSCORE_URL,
                    contentType: "application/json",
                    headers: {
                        hrcloud_user_token: this.oSession_token
                    },
                    success: function(json) {
                        that.byId("id_NumericRanking").setBusy(false);
                        that.getOwnerComponent().setModel(json.value,"Ranking");
                        json.value.forEach(function(item,index,array){
                        	if(item.Wechat_nickname === JSON.parse(window.sessionStorage.getItem("wechat_user")).nickname){
                        		that.byId("id_NumericRanking").setValue(index+1);
                        	}
                        });
                    },
                    error: function(e) {
                        var log = e.message;
                    }
                });
            } 
            
            //GET POINTS TILE NUMBER
            if (!this.getOwnerComponent().getModel("points")) {
                var oCourseTileContent = this.byId("id_NumericPoints");
                //oCourseTileContent.setBusy(true);
                $.ajax({
                    type: "GET",
                    dataType: '	json',
                    url: this.getOwnerComponent().HCP_HOST+this.SCORE_URL,
                    contentType: "application/json",
                    headers: {
                        hrcloud_user_token: this.oSession_token
                    },
                    success: function(json) {
                        that.byId("id_NumericPoints").setBusy(false);
                        that.getOwnerComponent().setModel(json.value,"points");
                        var point=0;
                        json.value.forEach(function(item,index,array){
                        	point = point + parseInt(item.Score);
                        });
                        that.byId("id_NumericPoints").setValue(point);
                        
                  
                    },
                    error: function(e) {
                        var log = e.message;
                    }
                });
            }            
  
        }
    },
    

    onNavButtonPress: function(evt) {
        // this.bus.publish("nav", "back", null);
        this.getRouter().navBackTo(null , null , this.getView());
    },
    
    navToHandler: function(channelId, eventId, data) {
        if (data.destination === "detail") {
            releaseManagement.util.Service.request("GET", "nomination/" 
            + data.id, null , this.successChannel, this.failureChannel);
        }
    },
    
    oBackPressed: function() {
        // Navigate to DetailAdd.view
        // this.bus.publish("nav", "to", {
        // destination : "back"
        // });
        this.getRouter().navBackTo(null , null , this.getView());
    }
    
 


 

});
