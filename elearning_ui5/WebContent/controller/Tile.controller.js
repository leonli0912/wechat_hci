//jQuery.sap.require("releaseManagement.util.Service");
//jQuery.sap.require("releaseManagement.util.Controller");

sap.ui.controller("elearning_ui5.controller.Tile", {
    USERINFO_URL: "/clouldhr_server/UserInformation/Users",
    WECHAT_URL: "/clouldhr_server/WechatLogin",
    LEARNING_URL: "/clouldhr_server/SFLearningHistory",
    LEARNING_URL2: "https://hrcservicep1941435989trial.hanatrial.ondemand.com/clouldhr_server/SFLearningHistory",
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
    
    handleLogoffPress: function(evt) {
        var oUser = sap.ui.getCore().getModel("user");
        oUser.login = false;
        sap.ui.getCore().setModel(oUser, "user");
        /*
		 * var r = new sap.ui.getCore().byId("id_HomePage"); r.destroy();
		 */
        location.reload(true);
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("login");
    },
    
    _onPatternMatched: function() {
        var that = this;
        this.oSession_token = window.sessionStorage.getItem("login_token");
        if (this.oSession_token) {
            //GET COURSE TILE NUMBER
            if (!this.getOwnerComponent().getModel("LearningHistory")) {
                var oCourseTileContent = this.byId("id_NumericCourse");
                oCourseTileContent.setBusy(true);
                $.ajax({
                    type: "GET",
                    dataType: '	json',
                    url: this.LEARNING_URL,
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
            
            
            /*			if(!this.getOwnerComponent().getModel("userInfo")){
			
			//GET USER INFO
			this.getView().setBusy(true);
			
			$.ajax({
	            type: "GET",
	            dataType: '	json',
	            url: this.USERINFO_URL,
	            contentType: "application/json",
	            headers:{hrcloud_user_token:this.oSession_token},
				success:function(json){
					that.getView().setBusy(false);
					
					that.getOwnerComponent().setModel(json.value[0],"userInfo");
				},
				error:function(e){
					//token expired
					
				}
			});
		}*/
        
        }
        /*var userModel = sap.ui.getCore().getModel("token");
		
		var that = this;
		if(!userModel){
			this.oRouter.navTo("logon");
		}else{
			// check token avoid ajax every time open this view
			var oToken_model = sap.ui.getCore().getModel("token");
			var sf_token = sap.ui.getCore().getModel("sf_token");
			
			if(!oToken_model){
			// GET LGOIN TOKEN
			this.getView().setBusy(true);
			that = this;
			$.ajax({
	            type: "GET",
	            dataType: 'text',
	            url: this.TOKEN_URL,
	            contentType: "application/json",
//	            headers: {
//	                "Authorization": "Basic amlheGluZzpjNjdmODBlODJlMWFkOGIzZjc0OGU1ODQ2YWQ5ODQ1Mzc2ZGU5NjU0ODNjNjM5NTAzMDZiMTAwYjdlMDhkMzFi",
//	              },
	            
	            success: function(text) {
	            	that.getView().setBusy(false);
	            	that._oToken = text.access_token;
	            	
	            	sap.ui.getCore().setModel(text,"token");
	                console.log("success...");
	            },
	            error: function(e) {
	                    console.log(e.message);
	                    that.getView().setBusy(false);
	                }
	            });	
			};
			
			if(!sf_token){
				// GET SF TOKEN
				$.ajax({
		            type: "GET",
		            dataType: 'json',
		            url: this.SFTOKEN_URL,
		            contentType: "application/json",
		            headers: {
		                "hrcloud_user_token":oToken_model.token ,
		              },		            
		            success: function(json) {
		            	that.getView().setBusy(false);
		            	that._oToken = json.access_token;
		            	sap.ui.getCore().setModel(json,"sf_token");
		                console.log("success...");
		            },
		            error: function(e) {
		                    console.log(e.message);
		                    that.getView().setBusy(false);
		                }
		            });	
			}*/
    
    },
    onPressCalendar: function(evt) {
        
        // Navigate to Calendar view (MasterNames1)
        // TODO: this is to show list of events in version2. Now this is just
        // throwing a 404 exception
        // releaseManagement.util.Service.request("GET", "calendar", null,
        // "onLoadCalendarSuccess", "onLoadCalendarFailure");
        
        // Read from local
        // releaseManagement.util.Service.localRequest("calendar",
        // "onLoadCalendarSuccess", "onLoadCalendarFailure");
        // this.bus.publish("nav", "to", {
        // destination : "wash"
        // });
        this.getRouter().navTo("calendar");
    },
    onNavButtonPress: function(evt) {
        // this.bus.publish("nav", "back", null);
        this.getRouter().navBackTo(null , null , this.getView());
    },
    
    onPressNominations: function(evt) {
        
        // Navigate to List of nominations (MasterNames)
        releaseManagement.util.Service.request("GET", "user/me/nomination", 
        null , "onLoadNominationsSuccess", "onLoadNominationsFailure");
        // this.bus.publish("nav", "to", {
        // destination : "master"
        // });
        this.getRouter().navTo("registrations");
    },
    onUploadCalPressed: function() {
        this.getRouter().navTo("calendarUpload");
    },
    
    oAddPressed: function(evt) {
        // Navigate to DetailAdd.view
        // this.bus.publish("nav", "to", {
        // destination : "add"
        // });
        this.getRouter().navTo("create");
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
    },
    
    onAboutPressed: function() {
        
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        oRouter.navTo("login");
    },
    
    onPressProjects: function(evt) {
        
        // Navigate to List of projects (ProjectList)
        
        this.getRouter().navTo("project");
    
    },
    oEditPressed: function() {
    // var id = this.getView().getModel().getProperty("/id");
    // // Navigate to DetailEdit.view
    // this.bus.publish("nav", "to", {
    // destination : "edit",
    // id : id
    // });
    },
    
    onRMPressed: function() {
    
    },
    
    onLoadNameSuccess: function(channelId, eventId, data) {
        var model = new sap.ui.model.json.JSONModel();
        // if(location.host.search("localhost") != -1){
        // model.setJSON(data.data);
        // } else {
        model.setData(data.data);
        // }
        
        // Here we start to manipulate the data
        this.data = data.data;
        this.getView().setModel(model);
    
    },
    
    onLoadNameFailure: function(channelId, eventId, data) {
    },
    
    ValidateData: function() {
        var calculated_risk = this.data.risk * this.data.risk1;
        var imageControl = this.getView().byId("ImageBox");
        switch (calculated_risk) {
        case 1:
            imageControl.setSrc("img/Sunny.png");
            return;
        case 2:
            imageControl.setSrc("img/Snow_Occasional.png");
            return;
        case 3:
            imageControl.setSrc("img/Night_Rain.png");
            return;
        case 6:
            imageControl.setSrc("img/Wind_Flag_Storm.png");
            return;
        case 9:
            imageControl.setSrc("img/Hail_Heavy.png");
            return;
        }
    
    }

});
