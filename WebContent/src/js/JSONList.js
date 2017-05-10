sap.ui.define(['jquery.sap.global', 'sap/m/List'],
	function(jQuery, List) {

	var JSONList = List.extend("elearning_ui5.src.js.JSONList", {
		metadata:{
			properties:{
				totalCount: {type:"int", defaultValue:-1}
			}
		},

		renderer: "sap.m.ListRenderer"
	});

	JSONList.prototype.getMaxItemsCount = function(){
		if(this.getTotalCount() == -1){
			return sap.m.List.prototype.getMaxItemsCount.apply(this, arguments);
		}else{
			return this.getTotalCount();
		}
	}

	JSONList.prototype.onBeforePageLoaded = function(oGrowingInfo, sChangeReason) {

		//if only growing is fired, upload the list
		if(sChangeReason === "Growing"){
			this._fireUpdateStarted(sChangeReason, oGrowingInfo);
			this.fireGrowingStarted(oGrowingInfo);
		}
	}
	
	JSONList.prototype.setGrowing = function(bGrowing) {
		bGrowing = !!bGrowing;
		if (this.getGrowing() != bGrowing) {
			this.setProperty("growing", bGrowing, !bGrowing);
			if (bGrowing) {
				jQuery.sap.require("elearning_ui5.src.js.JSONGrowingEnablement");
				//the following code cannot use strict, may be because the reserved word "static"
				this._oGrowingDelegate = new elearning_ui5.src.js.JSONGrowingEnablement(this);
			} else if (this._oGrowingDelegate) {
				this._oGrowingDelegate.destroy();
				this._oGrowingDelegate = null;
			}
		}
		return this;
	}

	return JSONList;

}, true);
