sap.ui.define([
               'sap/m/MessageBox'], function(MessageBox){
	"use strict";

	var EmailBindingDialog = function(){};

	EmailBindingDialog.prototype.buildDialog = function(oController){
		var emailBindingDialog = new sap.m.Dialog({
			title:'{wi18n>EMAIL_TITLE}',
			beginButton: new sap.m.Button({
				text: 'Continue',
				enabled: false,
				press: function(){
					if(emailBindingDialog){
						var emailValue = emailBindingDialog.getContent()[1].getValue();
						var checkEmailExistModel = new sap.ui.model.json.JSONModel();
						checkEmailExistModel.loadData("wechatuser/checkEmailExist?email="+emailValue,null,false);
						var isEmailExist = checkEmailExistModel.getData();
						if(isEmailExist.exist == 0){
							var cfg = {
								url:"wechatuser/saveAuth?email="+emailValue,
								type : 'POST',
								dataType : 'json',
								contentType : 'application/json;charset=UTF-8'
							};
							$.ajax(cfg).success(function(data) {
								emailBindingDialog.close();
							}).error(function(data){
								sap.m.MessageToast.show(oController.getView().getModel("wi18n").getResourceBundle().getText("SAVE_EMAIL_FAILED"));
							});
						}else{
							sap.m.MessageToast.show(oController.getView().getModel("wi18n").getResourceBundle().getText("EMAIL_IS_EXIST"));
						}
					}
				}
			})
		});
		var oDialogLabel = new sap.m.Label({text:'{wi18n>BINDING_EMAIL}'});
		var oDialogInput = new sap.m.Input({
			type:'Email',
			placeholder:'{i18n>ENTER_EMAIL}',
			valueStateText:'{wi18n>EMAIL_VALIDATE_TEXT}',
			liveChange: function(oData){
				var value = oData.mParameters.newValue;
				var mailregex = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;
				if(!value.match(mailregex)){
					emailBindingDialog.getButtons()[0].setEnabled(false);
					emailBindingDialog.getContent()[1].setValueState("Error");
				}else{
					emailBindingDialog.getButtons()[0].setEnabled(true);
					emailBindingDialog.getContent()[1].setValueState("None");
				}
			}
		});
		emailBindingDialog.addContent(oDialogLabel);
		emailBindingDialog.addContent(oDialogInput);
		return emailBindingDialog;
	}
	
	EmailBindingDialog.prototype.checkUserExist = function(){
		var checkUserExistModel = new sap.ui.model.json.JSONModel();
		checkUserExistModel.loadData("wechatuser/checkUserExist",null,false);
		var isUserExist = checkUserExistModel.getData();
		return isUserExist;
	}



	return EmailBindingDialog;
});
