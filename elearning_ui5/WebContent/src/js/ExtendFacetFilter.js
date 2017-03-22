sap.m.FacetFilter.extend("elearning_ui5.src.js.ExtendFacetFilter", {
					renderer:"sap.m.FacetFilterRenderer"
				});

elearning_ui5.src.js.ExtendFacetFilter.prototype._getSummaryText = function(){
	var COMMA_AND_SPACE = ", ";
	  var SPACE = " ";
	  var sFinalSummaryText = "";
	  var bFirst = true;

	  var aListOfFilters = this.getLists();

		  if (aListOfFilters.length > 0) {

			for (var i = 0; i < aListOfFilters.length; i++) {
				var oFacet = aListOfFilters[i];

				if (oFacet.getActive()) {
					var aListOfItems = this._getSelectedItemsText(oFacet);
					var sText = "";
					for (var j = 0; j < aListOfItems.length; j++) {
						sText = sText + aListOfItems[j] + COMMA_AND_SPACE;
					}

					if (sText) {
						sText = sText.substring(0, sText.lastIndexOf(COMMA_AND_SPACE)).trim();

						if (bFirst) {
							sFinalSummaryText = this._bundle.getText("FACETFILTER_INFOBAR_FILTERED_BY", [oFacet.getTitle(), sText]);
							bFirst = false;
						} else {
							sFinalSummaryText = sFinalSummaryText + SPACE + this._bundle.getText("FACETFILTER_INFOBAR_AND") + SPACE
									+ this._bundle.getText("FACETFILTER_INFOBAR_AFTER_AND", [oFacet.getTitle(), sText]);
						}
					}
				}
			}
		}

		if (!sFinalSummaryText) {
			sFinalSummaryText = "NO_FILTER";
		}

		return sFinalSummaryText;
};
elearning_ui5.src.js.ExtendFacetFilter.prototype._createFacetPage = function() {

	var oFacetList = this._createFacetList();
	var oFacetsSearchField = new sap.m.SearchField({
		width : "100%",
		tooltip: this._bundle.getText("FACETFILTER_SEARCH"),
		liveChange : function(oEvent) {

			var binding = oFacetList.getBinding("items");
			if (binding) {
				var filter = new sap.ui.model.Filter("text", sap.ui.model.FilterOperator.Contains, oEvent.getParameters()["newValue"]);
				binding.filter([ filter ]);
			}
		}
	});

	var oPage = new sap.m.Page({
		enableScrolling : true,
		title : this._bundle.getText("FACETFILTER_TITLE"),
		content : [  oFacetList ]
	});
	return oPage;
};
elearning_ui5.src.js.ExtendFacetFilter.prototype._getFacetDialog = function() {

		var oDialog = this.getAggregation("dialog");
		if (!oDialog) {

			var that = this;
			oDialog = new sap.m.Dialog({
				showHeader : false,
				stretch: sap.ui.Device.system.phone ? true : false,
				afterClose : function() {

					that._addDelegateFlag = true;
				    that._invalidateFlag = true;

					// Make sure we restore the FacetFilterList back to the lists aggregation and update its active state
					// if the user dismisses the dialog while on the filter items page.
					var oNavContainer = this.getContent()[0];
					var oFilterItemsPage = oNavContainer.getPages()[1];
					if (oNavContainer.getCurrentPage() === oFilterItemsPage) {

						var oList = that._restoreListFromDisplayContainer(oFilterItemsPage);
						oList._updateActiveState();
						oList._fireListCloseEvent();
					}

					// Destroy the nav container and all it contains so that the dialog content is initialized new each
					// time it is opened.  This avoids the need to navigate back to the top page if the user previously dismissed
					// the dialog while on the filter items page.
					this.destroyAggregation("content", true);

					// Update button or summary bar text with latest selections
					that.invalidate();
					
				},
				beginButton : new sap.m.Button({
					text : this.getModel("wi18n").getResourceBundle().getText("SURE"),
					tooltip:this.getModel("wi18n").getResourceBundle().getText("SURE"),
					width:"47%",
					press : function() {

						that._closeDialog();
					}
				}),
				endButton : new sap.m.Button({
					text : this.getModel("wi18n").getResourceBundle().getText("RESET"),
					tooltip:this.getModel("wi18n").getResourceBundle().getText("RESET"),
					width:"47%",
					press : function() {

						that._addDelegateFlag = true;
						that._invalidateFlag = true;
						that.fireReset();
						var aLists = that.getLists();
						for (var i = 0; i < aLists.length; i++) {
							aLists[i]._searchValue = "";
							jQuery.sap.focus(aLists[i].getItems()[0]);
						}
						that.invalidate();
						that._closeDialog();
					}
				}),
				
				// limit the dialog height on desktop and tablet in case there are many filter items (don't
				// want the dialog height growing according to the number of filter items)
				contentHeight : "500px"
			});

			oDialog.addStyleClass("sapMFFDialog");
			//keyboard acc - [SHIFT]+[ENTER] triggers the “Back” button of the dialog
			oDialog.onsapentermodifiers = function (oEvent) {
				if (oEvent.shiftKey && !oEvent.ctrlKey && !oEvent.altKey ) {
					var oNavContainerx = this.getContent()[0];
					that._navFromFilterItemsPage(oNavContainerx);
				}
			};
			this.setAggregation("dialog", oDialog, true);
		}
		return oDialog;
	};