sap.ui.define(["elearning_ui5/src/js/format/CustomerFormat",'sap/ui/core/mvc/Controller'], function(CustomerFormat,Controller) {
	return Controller.extend("elearning_ui5.controller.Ranking", {
	onInit : function() {
		
        // set explored app's demo model on this sample

        
        var oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame");
        oVizFrame.setVizProperties({
            plotArea: {
                dataLabel: {
                    formatString:CustomerFormat.FIORI_LABEL_SHORTFORMAT_2,
                    visible: true
                }
            },
            valueAxis: {
                label: {
                    formatString: CustomerFormat.FIORI_LABEL_SHORTFORMAT_10
                },
                title: {
                    visible: false
                }
            },
            categoryAxis: {
                title: {
                    visible: false
                }
            },
            title: {
                visible: false,
                text: 'Revenue by City and Store Name'
            }
        });
        var dataModel = new sap.ui.model.json.JSONModel("./model/medium.json");
        oVizFrame.setModel(dataModel);
        

	}
	
});
})