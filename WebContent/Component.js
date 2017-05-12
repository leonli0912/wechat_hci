//jQuery.sap.declare("ui5TileTest.Component");
sap.ui.define([ 'sap/ui/core/UIComponent' ], function(UIComponent) {
	"use strict";

	var Component = UIComponent.extend("elearning_ui5.Component", {

		metadata : {
			manifest : "json"
		},
		//HCP_HOST:"https://hrcservicep1941435989trial.hanatrial.ondemand.com",
		HCP_HOST:"https://clouldhrserverf8099a175.cn1.hana.ondemand.com",
		init : function() {
			jQuery.sap.require("sap.m.routing.RouteMatchedHandler");
			// call the init function of the parent
			UIComponent.prototype.init.apply(this, arguments);
			var router = this.getRouter();
			this.routeHandler = new sap.m.routing.RouteMatchedHandler(router);
			router.initialize();
			//router.navTo("logon");
		},
		createContent : function() {
			this.view = sap.ui.view({
				id : "elearningApp",
				viewName : "elearning_ui5.view.App",
				type : sap.ui.core.mvc.ViewType.XML
			})
			return this.view;
		}

	});
})
