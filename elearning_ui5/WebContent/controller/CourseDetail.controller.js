sap.ui.define(["elearning_ui5/src/js/format/CustomerFormat", "sap/ui/core/mvc/Controller", "sap/ui/core/routing/History"], 
		function(CustomerFormat, Controller, History) {
    return Controller.extend("elearning_ui5.controller.CourseDetail", {
        onInit: function() {
            //var eventBus = sap.ui.getCore().getEventBus();
            // 1. ChannelName, 2. EventName, 3. Function to be executed, 4. Listener
            //eventBus.subscribe("CourseDetailChannel", "onNavigateEvent", this.onDataReceived, this);
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);;
			oRouter.getRoute("courseDetail").attachMatched(this._onRouteMatched, this);
			//oRouter.getRoute("courseDetail").onDataReceived(this.onDataReceived, this);
			// Hint: we don't want to do it this way
			
/*			oRouter.attachRouteMatched(function (oEvent){
				var sRouteName, oArgs, oView;
				sRouteName = oEvent.getParameter("name");
				if (sRouteName === "employee"){
					this._onRouteMatched(oEvent);
				}
			}, this);*/
			

        },
		/*function (BaseController) {
	"use strict";
	return BaseController.extend("elearning_ui5.controller.CourseDetail", {
		onInit: function () {
			var oRouter = this.getRouter();
			oRouter.getRoute("employee").attachMatched(this._onRouteMatched, this);
			// Hint: we don't want to do it this way
			
			oRouter.attachRouteMatched(function (oEvent){
				var sRouteName, oArgs, oView;
				sRouteName = oEvent.getParameter("name");
				if (sRouteName === "employee"){
					this._onRouteMatched(oEvent);
				}
			}, this);
			
		},*/
        
        
        
        
        
        onDataReceived: function(sChannel, sEvent, oData) {
            if (sChannel === "CourseDetailChannel") {
                var courseModel = new sap.ui.model.json.JSONModel();
                courseModel.setData(oData);
                this.getView().setModel(courseModel);
            }

        },
        onButtonPress: function() {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("joblist", {}, true);
            }
        },
        _onRouteMatched : function (oEvent) {
			var oArgs, oView;
			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();
			 var oItem, oCtx;
				oItem = oEvent.getSource();
				//oCtx = oItem.getBindingContext();
			//oCtx = oItem.getBindingContext();
				var json = {componentID:oArgs.componentID,
						
						componentTypeID:oArgs.componentTypeID,
						formattedRevisionDate:oArgs.formattedRevisionDate,
						title:oArgs.title,
						revisionNumber:oArgs.revisionNumber,
						scheduledID:oArgs.scheduledID,
						instructorName:oArgs.instructorName,
						status:oArgs.status,
						totalHours:oArgs.totalHours,
						contactHours:oArgs.contactHours,
						creditHours:oArgs.creditHours,
						cpeHours:oArgs.cpeHours,
						grade:oArgs.grade,
						completionStatusID:oArgs.completionStatusID
				
				};
				for (var prop in json)
				{
					if(json[prop] == "none"){
						json[prop] = " ";
					}
				  
				}
				//var json_content = {courseInfo:json };
				var courseModel = new sap.ui.model.json.JSONModel();
                courseModel.setData(json);
                this.getView().setModel(courseModel);
			oView.bindElement({
				path : "/",
					//courseDetail(" + oArgs.kid + ")",
				events : {
					change: this._onBindingChange.bind(this),
					dataRequested: function (oEvent) {
						oView.setBusy(true);
					},
					dataReceived: function (oEvent) {
						oView.setBusy(false);
					}
				}
			});
		},
		_onBindingChange : function (oEvent) {
			// No data for the binding
			if (!this.getView().getBindingContext()) {
				this.getRouter().getTargets().display("notFound");
			}
		}
        
    });
})
