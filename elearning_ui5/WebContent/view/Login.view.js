var app, configParameters = {};
sap.ui.jsview("elearning_ui5.view.Login", {

    getControllerName: function() {
        return "elearning_ui5.controller.Login";
    },

    createContent: function(oController) {

        var sLocale = sap.ui.getCore().getConfiguration().getLanguage();
        oBundle = jQuery.sap.resources({
            url: [jQuery.sap.getModulePath("ui.login"), "global.hdbtextbundle"].join("/"),
            locale: sLocale
        });
        document.title = oBundle.getText("HANA_LOGIN_LABEL");
        $(".sapUiSraLoginCopyright").text(oBundle.getText("COPYRIGHT"));

       // oController.loadConfigParameters();

        function getPhishingMessageBox() {
            var box = new sap.m.FlexBox({
                alignItems: sap.m.FlexAlignItems.Stretch,
                justifyContent: sap.m.FlexJustifyContent.SpaceAround,
                items: [
                    new sap.m.Text({
                        text: oBundle.getText("SAP_HANA_TITLE"),
                        design: sap.m.LabelDesign.Bold
                    }).addStyleClass("login_title"),
                    new sap.m.Text({
                        text: oBundle.getText("WEB_ATTACK_TITLE"),
                        design: sap.m.LabelDesign.Standard
                    }).addStyleClass("login_subtitle"),
                    new sap.m.Text({
                        id: "ui_login_phishing_text",
                        text: oBundle.getText("PHISHING_TEXT")
                    }).addStyleClass("login_username")
                ],
                direction: "Column"
            }).setWidth("50%").addStyleClass("login_box");

            return box;

        }

        function getLinks() {
            var box = new sap.m.FlexBox({
                alignItems: sap.m.FlexAlignItems.End,
                justifyContent: sap.m.FlexJustifyContent.End,
                direction: "Column"
            }).addStyleClass("login_links_box");

            if (configParameters && configParameters.forgot_password_enabled === "true") {
                box.addItem(new sap.m.Link({
                    text: oBundle.getText("FORGOT_PASSWORD_LINK"),
                    href: "/sap/hana/xs/selfService/user/resetPassword.html"
                }).addStyleClass("login_forgotpassword_link"));
            }

            if (configParameters && configParameters.request_new_user_enabled === "true") {
                box.addItem(new sap.m.Link({
                    text: oBundle.getText("REQUEST_ACCOUNT"),
                    href: "/sap/hana/xs/selfService/user/requestAccount.html" + window.location.search
                }));
            }


            return box;
        }

        function getPwdChangeBox() {
            var box = new sap.m.FlexBox({
                alignItems: sap.m.FlexAlignItems.Stretch,
                justifyContent: sap.m.FlexJustifyContent.SpaceAround,
                items: [
                    new sap.m.Label({
                        text: oBundle.getText("SAP_HANA_TITLE"),
                        design: sap.m.LabelDesign.Bold
                    }).addStyleClass("login_title"),
                    new sap.m.Label({
                        text: oBundle.getText("CHANGE_PASSWORD_TITLE"),
                        design: sap.m.LabelDesign.Standard
                    }).addStyleClass("login_subtitle"),
/*                    new sap.ui.layout.HorizontalLayout({
                        id: "login_pwdchange_error_box",
                        content: [
                            new sap.ui.core.Icon({
                                src: "sap-icon://error",
                                backgroundColor: "transparent",
                                color: "red"
                            }).addStyleClass("login_error"),
                            new sap.m.Label({
                                id: "login_pwdchange_error",
                                text: oBundle.getText("LOGIN_FAILED"),
                                design: sap.m.LabelDesign.Standard,
                            }).addStyleClass("login_error"),
                        ]
                    }),*/
                    new sap.m.Input({
                        id: "xs_oldpassword",
                        type: sap.m.InputType.Password,
                        placeholder: oBundle.getText("OLD_PASSWORD_TEXT"),
                    }).addStyleClass("login_username").attachBrowserEvent("keydown",function(e){  
                                                  if (e.keyCode == 13) {  
                                                     oController.sendChangePwdForm();
                                                  }  
                                            }),
                    new sap.m.Input({
                        id: "xs_newpassword",
                        type: sap.m.InputType.Password,
                        placeholder: oBundle.getText("NEW_PASSWORD_TEXT"),
                    }).addStyleClass("login_username").attachBrowserEvent("keydown",function(e){  
                                                  if (e.keyCode == 13) {  
                                                     oController.sendChangePwdForm();
                                                  }  
                                            }),
                    new sap.m.Input({
                        id: "xs_confirmpassword",
                        type: sap.m.InputType.Password,
                        placeholder: oBundle.getText("CONFIRM_PASSWORD_TEXT"),
                    }).addStyleClass("login_password").attachBrowserEvent("keydown",function(e){  
                                                  if (e.keyCode == 13) {  
                                                     oController.sendChangePwdForm();
                                                  }  
                                            }),
                    new sap.m.Button({
                        text: oBundle.getText("CHANGE_PASSWORD"),
                        type: sap.m.ButtonType.Emphasized,
                        press: function() {
                            oController.sendChangePwdForm();
                        }
                    }).setWidth("100%"),
                ],
                direction: "Column"
            }).addStyleClass("login_pwdchange_box");

            return box;

        }

        function getUIBox() {
            var box = new sap.m.FlexBox({
                alignItems: sap.m.FlexAlignItems.Stretch,
                justifyContent: sap.m.FlexJustifyContent.SpaceAround,
                items: [
                    new sap.m.Label({
                        text: "SAP_HANA_TITLE",
                        design: sap.m.LabelDesign.Bold
                    }).addStyleClass("login_title"),
                    new sap.m.Label({
                        text: "LOGON_TITLE",
                        design: sap.m.LabelDesign.Standard
                    }).addStyleClass("login_subtitle"),
/*                    new sap.ui.layout.HorizontalLayout({
                        id: "login_error_box",
                        content: [
                            new sap.ui.core.Icon({
                                src: "sap-icon://error",
                                backgroundColor: "transparent",
                                color: "red",
                                visible: false
                            }).addStyleClass("login_error"),
                            new sap.m.Label({
                                id: "login_error",
                                text: "LOGIN_FAILED",
                                design: sap.m.LabelDesign.Standard,
                            }).addStyleClass("login_error"),
                        ]
                    }),*/
                    new sap.m.Input({
                        id: "xs_username",
                        placeholder: "USERNAME_TEXT",
                    }).addStyleClass("login_username"),
                    new sap.m.Input({
                        id: "xs_password",
                        type: sap.m.InputType.Password,
                        placeholder: "PASSWORD_TEXT",
                    }).addStyleClass("login_password"),
                    new sap.m.Button({
                        id: "logon_button",
                        text: "LOGON_BUTTON_TEXT",
                        type: sap.m.ButtonType.Emphasized,
                        press: [oController.onPress, oController]
                    }).addStyleClass("sapMLabelBold").setWidth("100%"),
                ],
                direction: "Column"
            }).addStyleClass("login_box");

            return box;

        }

        this.setDisplayBlock(false);
        this.app = sap.ui.getCore().byId("myApp");
        if(this.app == null){
        	this.app = this.byId("myApp");
		}

        var loginPage = new sap.m.Page("elearning_ui5.login.page", {
            showHeader: false,
            content: [getUIBox(), getLinks()]
        });

        var changePasswordPage = new sap.m.Page("ui.pwdchange.page", {
            showHeader: false,
            content: [getPwdChangeBox()],
            headerContent: new sap.ui.core.Icon({
                id: "settings",
                src: "sap-icon://activity-individual",
                press: function() {
                    new sap.m.ActionSheet({
                        buttons: [new sap.m.Button({
                            id: "xs_logout_button",
                            text: oBundle.getText("LOGOUT_TEXT"),
                            press: function() {
                                oController.logout();
                            }
                        })]
                    }).openBy(sap.ui.getCore().getControl("settings"));
                }
            })
        });
        changePasswordPage.addEventDelegate({
            onAfterShow: function(evt) {
                sap.ui.getCore().getControl("xs_oldpassword").focus();
            }
        });


        var phishingPage = new sap.m.Page("ui.phishing.page", {
            showheader: false,
            content: [getPhishingMessageBox()]
        });

        /*this.app.addPage(loginPage, false);
        this.app.addPage(changePasswordPage, false);
        this.app.addPage(phishingPage, false);*/

        return loginPage;
    }
});