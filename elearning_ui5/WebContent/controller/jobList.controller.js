sap.ui.define(['elearning_ui5/src/js/layout/EmailBindingDialog', 'sap/ui/core/mvc/Controller', ], function(EmailBindingDialog, Controller) {
    // "use strict";
	var eventBus = sap.ui.getCore().getEventBus();
    var jobList = Controller.extend("elearning_ui5.controller.jobList", {
        SERVICE_URL: "/hcpserver/Products",
        //TOKEN_URL:"/hcp_learning/oauth-api/rest/v1/token",
        //USERINFO_URL: "/hcp_learning/odatav4/public/user/learningHistory/v1/learninghistorys?$filter=criteria/maxNumberToRetrieve eq 10 and criteria/targetUserID eq %27Eddiy%27",
        LEARNING_URL:"/clouldhr_server/SFLearningHistory",
        _access_token: null,
        _token_type: null,
        _positionBefore: 0,
        _emailBindingDialog: null,
        _router: null,

        onPressItem: function(oEvent) {

            var rowId = oEvent.getSource().getBindingContext().getPath();
            var rows = rowId.match(/\d+/g);
            var rowNo = rows[rows.length - 1];
            var courseInfo = oEvent.getSource().getBindingContext().getProperty();
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            var eventBus = sap.ui.getCore().getEventBus();
            // 1. ChannelName, 2. EventName, 3. the data
            eventBus.publish("CourseDetailChannel", "onNavigateEvent", {
                courseInfo
            });
            var oItem, oCtx;
			oItem = oEvent.getSource();
			oCtx = oItem.getBindingContext();
			var item = oCtx.getModel();
			var json = item.getJSON();
			var jsonstr = JSON.stringify(json);
/*		    var jsontrans = { componentID : oCtx.getProperty("componentID"),
		    		title:oCtx.getProperty("title"),
		    		formattedRevisionDate:oCtx.getProperty("formattedRevisionDate"),
		    		revisionNumber:oCtx.getProperty("revisionNumber"),
		    		scheduledID:oCtx.getProperty("scheduledID"),
		    		instructorName:oCtx.getProperty("instructorName"),
		    		formattedRevisionDate:oCtx.getProperty("formattedRevisionDate"),
		    		status:oCtx.getProperty("status"),
		    		totalHours:oCtx.getProperty("totalHours"),
		    		contactHours:oCtx.getProperty("contactHours"),
		    		creditHours:oCtx.getProperty("creditHours"),
		    		cpeHours:oCtx.getProperty("cpeHours"),
		    		grade:oCtx.getProperty("grade")

		    		};*/
		      var componentID;// : oCtx.getProperty("componentID"),
		      var title;
		      var formattedRevisionDate;
		      var revisionNumber;
		      var scheduledID;
		      var instructorName;
		      var formattedRevisionDate;
		      var status;
		      var totalHours;
		      var contactHours;
		      var creditHours;
		      var cpeHours;
		      var grade;
		      var componentTypeID;
		      var completionStatusID;
		      if (oCtx.getProperty("componentTypeID") == null){
		    	  componentTypeID = "none";
		      }else{
		    	  componentTypeID = oCtx.getProperty("componentTypeID");
		      };
		      if (oCtx.getProperty("componentID") == null){
		    	  componentID = "none";
		      }else{
		    	  componentID = oCtx.getProperty("componentID");
		      };
		      if (oCtx.getProperty("title") == null){
		    	  title = "none";
		      }else{
		    	  title = oCtx.getProperty("title");
		      };
		      if (oCtx.getProperty("formattedRevisionDate") == null){
		    	  formattedRevisionDate = "none";
		      }else{
		    	  var str = oCtx.getProperty("formattedRevisionDate");
		    	  formattedRevisionDate = str.replace(/\//g, "-");
		      };
		      if (oCtx.getProperty("revisionNumber") == null){
		    	  revisionNumber = "none";
		      }else{
		    	  revisionNumber = oCtx.getProperty("revisionNumber");
		      };	
		      if (oCtx.getProperty("scheduledID") == null){
		    	  scheduledID = "none";
		      }else{
		    	  scheduledID = oCtx.getProperty("scheduledID");
		      };	
		      if (oCtx.getProperty("instructorName") == null){
		    	  instructorName = "none";
		      }else{
		    	  instructorName = oCtx.getProperty("instructorName");
		      };		      
		      if (oCtx.getProperty("status") == null){
		    	  status = "none";
		      }else{
		    	  status = oCtx.getProperty("status");
		      };
		      if (oCtx.getProperty("totalHours") == null){
		    	  totalHours = "none";
		      }else{
		    	  totalHours = oCtx.getProperty("totalHours");
		      };	
		      if (oCtx.getProperty("contactHours") == null){
		    	  contactHours = "none";
		      }else{
		    	  contactHours = oCtx.getProperty("contactHours");
		      };
		      if (oCtx.getProperty("creditHours") == null){
		    	  creditHours = "none";
		      }else{
		    	  creditHours = oCtx.getProperty("creditHours");
		      };
		      if (oCtx.getProperty("cpeHours") == null){
		    	  cpeHours = "none";
		      }else{
		    	  cpeHours = oCtx.getProperty("cpeHours");
		      };
		      if (oCtx.getProperty("grade") == null){
		    	  grade = "none";
		      }else{
		    	  grade = oCtx.getProperty("grade");
		      };			 
		      if (oCtx.getProperty("completionStatusID") == null){
		    	  completionStatusID = "none";
		      }else{
		    	  completionStatusID = oCtx.getProperty("completionStatusID");
		      };
		      

			this._router.navTo("courseDetail",{
				componentTypeID : componentTypeID,
				//jsontrans//courseInfo.toString()
				componentID :componentID,// oCtx.getProperty("componentID"),
	    		title: title,//oCtx.getProperty("title"),
	    		formattedRevisionDate:formattedRevisionDate,//oCtx.getProperty("formattedRevisionDate").toString,
	    		revisionNumber: revisionNumber,//oCtx.getProperty("revisionNumber"),
	    		scheduledID:scheduledID,//oCtx.getProperty("scheduledID"),
	    		instructorName:instructorName,//oCtx.getProperty("instructorName"),
	    		//formattedRevisionDate:formattedRevisionDate,//oCtx.getProperty("formattedRevisionDate"),
	    		status:status,//oCtx.getProperty("status"),
	    		totalHours:totalHours,//oCtx.getProperty("totalHours"),
	    		contactHours:contactHours,//oCtx.getProperty("contactHours"),
	    		creditHours:creditHours,//oCtx.getProperty("creditHours"),
	    		cpeHours:cpeHours,//oCtx.getProperty("cpeHours"),
	    		grade:grade,//oCtx.getProperty("grade")
	    		completionStatusID:completionStatusID
			//oCtx.getProperty("kid")
			});
            //this._router.navTo(("courseDetail")
            //		, {
            //    kid: courseInfo.kid
            //});
        },
        /**
										 * Called when a controller is
										 * instantiated and its View controls
										 * (if available) are already created.
										 * Can be used to modify the View before
										 * it is displayed, to bind event
										 * handlers and do other one-time
										 * initialization.
										 * 
										 * @memberOf resume-collection-service.jobList
										 */
        onInit: function() {
            //this.sServiceUrl = "./hcpserver";s);
        	
            eventBus = sap.ui.getCore().getEventBus();
            
            //var courseInfo = oEvent.getSource().getBindingContext().getProperty();
            eventBus.publish("CourseDetailChannel", "onNavigateEvent", { "123":"12" });
            var recommendModel = new sap.ui.model.json.JSONModel();
            var that = this;
           /* var token_json = sap.ui.getCore().getModel("sf_token");
            this._access_token = token_json.access_token;
            this._token_type = token_json.token_type;*/

            this._router = sap.ui.core.UIComponent.getRouterFor(this);

            var emailBindingDialog = new EmailBindingDialog();
            //var requestBody = this._getFilterRequestBody();
            this.getView().setBusy(true);
            if(!this.getOwnerComponent().getModel("LearningHistory")){
            	
            $.ajax({
                type: "GET",
                dataType: 'json',
                url: "https://hrcservicep1941435989trial.hanatrial.ondemand.com/clouldhr_server/SFLearningHistory",
                contentType: "application/json",
                headers: {
                    "hrcloud_user_token": window.sessionStorage.getItem("login_token"),
                    //"Access-Control-Allow-Origin": "*"
                },

                success: function(json) {
                    that.getView().setBusy(false);

                    console.log("success...");
                    console.log(json);
                    var listModel = new sap.ui.model.json.JSONModel();
                    listModel.setData(json.value);
                    that.getView().setModel(listModel);

                },
                error: function(e) {
                    console.log(e.message);
                    that.getView().setBusy(false);
                }
            });
        }else{
        	this.getView().setBusy(false);
            var oLearningHistory = this.getOwnerComponent().getModel("LearningHistory");
            var oLearningModel = new sap.ui.model.json.JSONModel();
            oLearningModel.setData(oLearningHistory);
            this.getView().setModel(oLearningModel);
            
            var totalModel = new sap.ui.model.json.JSONModel();
            totalModel.setData({total:oLearningHistory.length});
            this.getView().setModel(totalModel,"HistoryTotal");
        }

            /*            var cfg = {
            	url:"https://demoservicep1942455002trial.hanatrial.ondemand.com/DemoService/DemoService.svc/",	
                //url: "job/list",
                type: "GET",
                dataType: 'json',
               // data: JSON.stringify(requestBody),
                contentType: 'application/xml;charset=UTF-8'
            };
*/
            if (!this._emailBindingDialog) {

                this._emailBindingDialog = emailBindingDialog.buildDialog(this);

                this.getView().addDependent(this._emailBindingDialog);
            }

        },
        onBackPress:function(){
        	this._router.navTo("appHome");
        },
        showFilterDialog: function() {
            this.getView().byId("jobFacetFilter").openFilterDialog();
        },
        _applyFilter: function(oFilter, inputFilterValue) {
            var requestBody = this._getFilterRequestBody();

            // load picklist from SF
            var cfg = {
                url: "job/list",
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify(requestBody),
                contentType: 'application/json;charset=UTF-8'
            };

            var that = this;
            var filterList = this.getView().byId("jobList");
            filterList.setBusy(true);
            $.ajax(cfg).success(function(data) {
                filterList.setBusy(false);

                var listModel = new sap.ui.model.json.JSONModel();
                listModel.setData(data);
                filterList.setModel(listModel);
            }).error(function(data) {
                filterList.setBusy(false);
            });

        },

        handleFacetFilterReset: function(oEvent) {
            var oFacetFilter = sap.ui.getCore().byId(oEvent.getParameter("id"));
            var aFacetFilterLists = oFacetFilter.getLists();
            for (var i = 0; i < aFacetFilterLists.length; i++) {
                aFacetFilterLists[i].setSelectedKeys();
            }
            var inputFilterValue = this.getView().byId("searchField").getValue();
            this._applyFilter([], inputFilterValue);
        },

        handleListClose: function(oEvent) {
            // Get the Facet Filter lists and
            // construct a (nested)
            // filter for the binding
            var inputFilterValue = this.getView().byId("searchField").getValue();
            this._applyFilter(this._getFilter(), inputFilterValue);
        },

        showSearchResult: function(oEvent) {
            var inputFilterValue = oEvent.mParameters.query;
            this._applyFilter(this._getFilter(), inputFilterValue);
        },

        _getFilter: function() {
            var mFacetFilterLists = this.getView().byId("jobFacetFilter").getLists().filter(function(oList) {
                return oList.getSelectedItems().length;
            });

            // Build the nested filter with ORs
            // between the
            // values of each group and
            // ANDs between each group
            var oFilter = new sap.ui.model.Filter(mFacetFilterLists.map(function(oList) {
                return new sap.ui.model.Filter(oList.getSelectedItems().map(function(oItem) {
                    return new sap.ui.model.Filter(oList.getKey(),"EQ",oItem.getKey());
                }),false);
            }),true);
            return oFilter;
        },
        dateFormat: function(val) {
            jQuery.sap.require("sap.ui.core.format.DateFormat");
            var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
                pattern: "yyyy-MM-dd"
            });
            return oDateFormat.format(new Date(val));
        },

        translatWechatLabel: function(val) {
            if (!val)
                return "";
            return this.getView().getModel("wi18n").getResourceBundle().getText(val);
        },

        translatLabel: function(val) {
            if (!val)
                return "";
            return this.getView().getModel("wi18n").getResourceBundle().getText(val);
        },
        translatEnumLabel: function(val) {
            if (!val)
                return "";
            return this.getView().getModel("wi18n").getResourceBundle().getText(val);
        },

        listUploadStart: function(oEvent) {

            var actual = oEvent.getParameter("actual");
            var total = oEvent.getParameter("total");

            if (actual === 0) {
                return;
            }

            var requestBody = this._getFilterRequestBody(actual);

            // load picklist from SF
            var cfg = {
                url: "job/list",
                type: 'POST',
                dataType: 'json',
                data: JSON.stringify(requestBody),
                contentType: 'application/json;charset=UTF-8'
            };

            var that = this;
            var filterList = this.getView().byId("jobList");
            $.ajax(cfg).success(function(data) {

                var deltaData = data.jobs;
                var existData = filterList.getModel().getData();
                Array.prototype.push.apply(existData.jobs, deltaData);
                filterList.getModel().setData(existData);

            }).error(function(data) {
                that.getView().setBusy(false);
            });
        },
        /**
										 * Similar to onAfterRendering, but this
										 * hook is invoked before the
										 * controller's View is re-rendered (NOT
										 * before the first rendering! onInit()
										 * is used for that one!).
										 * 
										 * @memberOf resume-collection-service.jobList
										 */
        // onBeforeRendering: function() {
        //
        // },
        /**
										 * Called when the View has been
										 * rendered (so its HTML is part of the
										 * document). Post-rendering
										 * manipulations of the HTML could be
										 * done here. This hook is the same one
										 * that SAPUI5 controls get after being
										 * rendered.
										 * 
										 * @memberOf resume-collection-service.jobList
										 */
        onAfterRendering: function() {},

        _getFilterRequestBody: function(skip, top) {
            var filterList = this.getView().byId("jobList");
            var oFilter = this._getFilter();
            var oFValue = {};
            if (oFilter.aFilters !== undefined) {
                for (var j = 0; j < oFilter.aFilters.length; j++) {
                    for (var i = 0; i < oFilter.aFilters[j].aFilters.length; i++) {
                        var path = oFilter.aFilters[j].aFilters[i].sPath;
                        if (oFValue[path]) {
                            oFValue[path].push(oFilter.aFilters[j].aFilters[i].oValue1);
                        } else {
                            oFValue[path] = [];
                            oFValue[path].push(oFilter.aFilters[j].aFilters[i].oValue1);
                        }
                    }
                }
            }

            var inputFilterValue = this.getView().byId("searchField").getValue();
            inputFilterValue = encodeURI(inputFilterValue);
            var requstBody = {
                companyId: "",
                inputFilterValue: inputFilterValue,
                skip: skip | 0,
                top: top | filterList.getGrowingThreshold(),
                items: []
            };
            // set up filter values
            var key;
            for (key in oFValue) {
                requstBody.items.push({
                    type: key,
                    values: oFValue[key]
                })
            }

            return requstBody;
        }
        /**
									 * Called when the Controller is destroyed.
									 * Use this one to free resources and
									 * finalize activities.
									 * 
									 * @memberOf resume-collection-service.jobList
									 */
        // onExit: function() {
        //
        // }
    });
    return jobList;
});
