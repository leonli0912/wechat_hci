jQuery.sap.require("sap.m.MessageBox");
sap.ui.define([ "elearning_ui5/src/js/format/CustomerFormat",'sap/ui/core/mvc/Controller' ],function(CustomerFormat, Controller) {
	return Controller.extend("elearning_ui5.controller.Login",{
		_logonToken:null,
		oRouter:null,
		
		onInit : function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			if(this._logonToken){
				
				this.oRouter.navTo("home");
			}
											
		},
		onPress:function(){
			this.oRouter.navTo("home");
		}
	});})