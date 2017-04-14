//jQuery.sap.require("releaseManagement.util.Service");
//jQuery.sap.require("releaseManagement.util.Controller");

sap.ui.controller("elearning_ui5.controller.Tile", {
	oCount : 0,
	onInit : function() {
		
		var Windowwidth = window.screen.availWidth;
		// init router
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		oRouter.getRoute("appHome").attachPatternMatched(
				this._onPatternMatched, this);

	},
	onBeforeRendering : function() {

	},
	onAfterRendering : function() {

	},
	onPressCourse : function(evt) {
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		oRouter.navTo("jobList");
	},
	onPressRanking : function(evt) {
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		oRouter.navTo("ranking");
	},
	onLogoffPress:function(){
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		oRouter.navTo("logon",{logout:true});
	},
	onPressUser:function(){
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		oRouter.navTo("user",{userId:'u01'});
	},
	
	onShowSplitScreen : function(evt) {
		var oSource = evt.getSource();
		var that = oSource.getParent().getParent().getParent();
		var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
		oRouter.navTo("split");
	},
	handleLogoffPress : function(evt) {
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
	onPressPersonal : function(evt) {
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		oRouter.navTo("person");
	},

	onPressSplitList : function(evt) {
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		oRouter.navTo("splitapp");
	},

	_onPatternMatched : function() {

	},
	onPressCalendar : function(evt) {

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
	onNavButtonPress : function(evt) {
		// this.bus.publish("nav", "back", null);
		this.getRouter().navBackTo(null, null, this.getView());
	},

	onPressNominations : function(evt) {

		// Navigate to List of nominations (MasterNames)
		releaseManagement.util.Service.request("GET", "user/me/nomination",
				null, "onLoadNominationsSuccess", "onLoadNominationsFailure");
		// this.bus.publish("nav", "to", {
		// destination : "master"
		// });
		this.getRouter().navTo("registrations");
	},
	onUploadCalPressed : function() {
		this.getRouter().navTo("calendarUpload");
	},

	oAddPressed : function(evt) {
		// Navigate to DetailAdd.view
		// this.bus.publish("nav", "to", {
		// destination : "add"
		// });
		this.getRouter().navTo("create");
	},

	navToHandler : function(channelId, eventId, data) {
		if (data.destination === "detail") {
			releaseManagement.util.Service.request("GET", "nomination/"
					+ data.id, null, this.successChannel, this.failureChannel);
		}
	},

	oBackPressed : function() {
		// Navigate to DetailAdd.view
		// this.bus.publish("nav", "to", {
		// destination : "back"
		// });
		this.getRouter().navBackTo(null, null, this.getView());
	},

	onAboutPressed : function() {

		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		oRouter.navTo("login");
	},

	onPressProjects : function(evt) {

		// Navigate to List of projects (ProjectList)

		this.getRouter().navTo("project");

	},
	oEditPressed : function() {
		// var id = this.getView().getModel().getProperty("/id");
		// // Navigate to DetailEdit.view
		// this.bus.publish("nav", "to", {
		// destination : "edit",
		// id : id
		// });
	},

	onRMPressed : function() {

	},

	onLoadNameSuccess : function(channelId, eventId, data) {
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

	onLoadNameFailure : function(channelId, eventId, data) {
	},

	ValidateData : function() {
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