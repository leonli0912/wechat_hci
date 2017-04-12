sap.ui.define(["elearning_ui5/src/js/format/CustomerFormat", "sap/ui/core/mvc/Controller", "sap/ui/core/routing/History"], function(CustomerFormat, Controller, History) {
    return Controller.extend("elearning_ui5.controller.CourseDetail", {
        onInit: function() {
            var eventBus = sap.ui.getCore().getEventBus();
            // 1. ChannelName, 2. EventName, 3. Function to be executed, 4. Listener
            eventBus.subscribe("CourseDetailChannel", "onNavigateEvent", this.onDataReceived, this);

        },
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
        }
    });
})
