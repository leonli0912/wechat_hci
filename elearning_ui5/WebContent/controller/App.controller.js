sap.ui.controller("elearning_ui5.controller.App", {
	onInit : function() {
	},
	startPageLoading : function() {
		$("#pageLoading").show();
		$("#content").css("visibility", "hidden");
	},

	hidePageLoading : function() {
		$("#pageLoading").hide();
		$("#content").css("visibility", "visible");
	}
})