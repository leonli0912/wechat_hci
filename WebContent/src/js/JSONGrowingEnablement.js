sap.m.GrowingEnablement.extend("elearning_ui5.src.js.JSONGrowingEnablement", {
	renderer : "sap.m.GrowingListRenderer"
});
elearning_ui5.src.js.JSONGrowingEnablement.prototype._updateTrigger = function(bLoading) {
	var oTrigger = this._oTrigger, oControl = this._oControl;

	if (!oTrigger || !oControl) {
		return;
	}

	var oBinding = oControl.getBinding("items");
	if (!oBinding) {
		return;
	}

	// update busy state
	oTrigger.setBusy(bLoading);
	oTrigger.$().toggleClass("sapMGrowingListBusyIndicatorVisible", bLoading);

	if (bLoading) {
		oTrigger.setActive(false);
		oControl.$("triggerList").css("display", "");
	} else {
		var iMaxItems = this._oControl.getMaxItemsCount();
		var iBindingLength = oBinding.getLength() || 0, iItemsLength = oControl
				.getItems(true).length, bLengthFinal = oBinding.isLengthFinal(), bHasScrollToLoad = oControl
				.getGrowingScrollToLoad();

		// show, update or hide the growing button
		if (!iItemsLength || !this._iLimit
				|| (bLengthFinal && this._iLimit >= iMaxItems)
				|| (bHasScrollToLoad && this._getHasScrollbars())) {
			oControl.$("triggerList").css("display", "none");
			if (document.activeElement === oTrigger.getDomRef()) {
				oControl.$().focus();
			}
		} else {
			if (bLengthFinal) {
				oControl.$("triggerInfo").css("display", "block").text(
						this._getListItemInfo());
			}

			oTrigger.$().removeClass("sapMGrowingListBusyIndicatorVisible");
			oControl.$("triggerList").css("display", "");
		}
	}
};
elearning_ui5.src.js.JSONGrowingEnablement.prototype.resetToDefaultThreshold = function() {
	this._iLimit = this._oControl.getGrowingThreshold();
};