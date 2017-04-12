sap.ui
.define(
['elearning_ui5/src/js/layout/EmailBindingDialog', 
'sap/ui/core/mvc/Controller', ], 
function(EmailBindingDialog, Controller) {
    // "use strict";
    var jobList = Controller
    .extend(
    "elearning_ui5.controller.jobList", 
    {
    	SERVICE_URL:"/hcpserver/Products",
    	//TOKEN_URL:"/hcp_learning/oauth-api/rest/v1/token",
    	USERINFO_URL:"/hcp_learning/odatav4/public/user/learningHistory/v1/learninghistorys?$filter=criteria/maxNumberToRetrieve eq 10 and criteria/targetUserID eq %27Eddiy%27",
    	_access_token:null,
    	_token_type:null,
        _positionBefore: 0,
        _emailBindingDialog: null ,
        
        onPressItem: function(oEvent) {
            
            var rowId = oEvent.getSource().getBindingContext().getPath();
            var rows = rowId.match(/\d+/g);
            var rowNo = rows[rows.length - 1];
            var courseId = oEvent.getSource().getBindingContext().getProperty().ID;
            //var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            this._router.navTo("courseDetail", {
                courseId: courseId
            });
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
        	//this.sServiceUrl = "./hcpserver";
            var recommendModel = new sap.ui.model.json.JSONModel();
            var that = this;
            var token_json = JSON.parse(sap.ui.getCore().getModel("token").getJSON());
            this._access_token = token_json.access_token;
            this._token_type =token_json.token_type;
            
            this._router = sap.ui.core.UIComponent
            .getRouterFor(this);
            
            var emailBindingDialog = new EmailBindingDialog();
            var requestBody = this
            ._getFilterRequestBody();
            this.getView().setBusy(true);
// HCP DEMO DATA            
/*            $.ajax({
                type: "GET",
                dataType: 'json',
                url: this.SERVICE_URL + "?$format=json",
                contentType: "application/json",
                success: function(json) {
                	that.getView().setBusy(false);
                    console.log("success...");
                    var listModel = new sap.ui.model.json.JSONModel();
                    listModel.setData(json.value);
                    that.getView().setModel(listModel);
                },
                error: function(e) {
                    console.log(e.message);
                    that.getView().setBusy(false);
                }
            });*/
                    $.ajax({
                        type: "GET",
                        dataType: 'json',
                        url: this.USERINFO_URL,
                        contentType: "application/json",
                        headers: {
                            "Authorization": that._token_type + " " +that._access_token,
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
                
                this._emailBindingDialog = emailBindingDialog
                .buildDialog(this);
                
                this
                .getView()
                .addDependent(
                this._emailBindingDialog);
            }
        
        },
        
        showFilterDialog: function() {
            this.getView().byId(
            "jobFacetFilter")
            .openFilterDialog();
        },
        _applyFilter: function(oFilter, 
        inputFilterValue) {
            var requestBody = this
            ._getFilterRequestBody();
            
            // load picklist from SF
            var cfg = {
                url: "job/list",
                type: 'POST',
                dataType: 'json',
                data: JSON
                .stringify(requestBody),
                contentType: 'application/json;charset=UTF-8'
            };
            
            var that = this;
            var filterList = this.getView()
            .byId("jobList");
            filterList.setBusy(true);
            $
            .ajax(cfg)
            .success(
            function(data) {
                filterList
                .setBusy(false);
                
                var listModel = new sap.ui.model.json.JSONModel();
                listModel
                .setData(data);
                filterList
                .setModel(listModel);
            })
            .error(
            function(data) {
                filterList
                .setBusy(false);
            });
        
        },
        
        handleFacetFilterReset: function(
        oEvent) {
            var oFacetFilter = sap.ui
            .getCore()
            .byId(
            oEvent
            .getParameter("id"));
            var aFacetFilterLists = oFacetFilter
            .getLists();
            for (var i = 0; i < aFacetFilterLists.length; i++) {
                aFacetFilterLists[i]
                .setSelectedKeys();
            }
            var inputFilterValue = this
            .getView().byId(
            "searchField")
            .getValue();
            this._applyFilter([], 
            inputFilterValue);
        },
        
        handleListClose: function(oEvent) {
            // Get the Facet Filter lists and
            // construct a (nested)
            // filter for the binding
            var inputFilterValue = this
            .getView().byId(
            "searchField")
            .getValue();
            this._applyFilter(
            this._getFilter(), 
            inputFilterValue);
        },
        
        showSearchResult: function(oEvent) {
            var inputFilterValue = oEvent.mParameters.query;
            this._applyFilter(
            this._getFilter(), 
            inputFilterValue);
        },
        
        _getFilter: function() {
            var mFacetFilterLists = this
            .getView()
            .byId("jobFacetFilter")
            .getLists()
            .filter(
            function(oList) {
                return oList
                .getSelectedItems().length;
            });
            
            // Build the nested filter with ORs
            // between the
            // values of each group and
            // ANDs between each group
            var oFilter = new sap.ui.model.Filter(
            mFacetFilterLists
            .map(function(oList) {
                return new sap.ui.model.Filter(
                oList
                .getSelectedItems()
                .map(
                function(
                oItem) {
                    return new sap.ui.model.Filter(
                    oList
                    .getKey(),
                    "EQ",
                    oItem
                    .getKey());
                }),
                false);
            }),true);
            return oFilter;
        },
        dateFormat: function(val) {
            jQuery.sap
            .require("sap.ui.core.format.DateFormat");
            var oDateFormat = sap.ui.core.format.DateFormat
            .getDateTimeInstance({
                pattern: "yyyy-MM-dd"
            });
            return oDateFormat.format(new Date(
            val));
        },
        
        translatWechatLabel: function(val) {
            if (!val)
                return "";
            return this.getView().getModel(
            "wi18n")
            .getResourceBundle()
            .getText(val);
        },
        
        translatLabel: function(val) {
            if (!val)
                return "";
            return this.getView().getModel(
            "wi18n")
            .getResourceBundle()
            .getText(val);
        },
        translatEnumLabel: function(val) {
            if (!val)
                return "";
            return this.getView().getModel(
            "wi18n")
            .getResourceBundle()
            .getText(val);
        },
        
        listUploadStart: function(oEvent) {
            
            var actual = oEvent
            .getParameter("actual");
            var total = oEvent
            .getParameter("total");
            
            if (actual === 0) {
                return;
            }
            
            var requestBody = this
            ._getFilterRequestBody(actual);
            
            // load picklist from SF
            var cfg = {
                url: "job/list",
                type: 'POST',
                dataType: 'json',
                data: JSON
                .stringify(requestBody),
                contentType: 'application/json;charset=UTF-8'
            };
            
            var that = this;
            var filterList = this.getView()
            .byId("jobList");
            $
            .ajax(cfg)
            .success(
            function(data) {
                
                var deltaData = data.jobs;
                var existData = filterList
                .getModel()
                .getData();
                Array.prototype.push
                .apply(
                existData.jobs, 
                deltaData);
                filterList
                .getModel()
                .setData(
                existData);
            
            }).error(
            function(data) {
                that
                .getView()
                .setBusy(
                false);
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
        onAfterRendering: function() {
        },
        
        _getFilterRequestBody: function(skip, 
        top) {
            var filterList = this.getView()
            .byId("jobList");
            var oFilter = this._getFilter();
            var oFValue = {};
            if (oFilter.aFilters !== undefined) {
                for (var j = 0; j < oFilter.aFilters.length; j++) {
                    for (var i = 0; i < oFilter.aFilters[j].aFilters.length; i++) {
                        var path = oFilter.aFilters[j].aFilters[i].sPath;
                        if (oFValue[path]) {
                            oFValue[path]
                            .push(oFilter.aFilters[j].aFilters[i].oValue1);
                        } else {
                            oFValue[path] = [];
                            oFValue[path]
                            .push(oFilter.aFilters[j].aFilters[i].oValue1);
                        }
                    }
                }
            }
            
            var inputFilterValue = this
            .getView().byId(
            "searchField")
            .getValue();
            inputFilterValue = encodeURI(inputFilterValue);
            var requstBody = {
                companyId: "",
                inputFilterValue: inputFilterValue,
                skip: skip | 0,
                top: top 
                | filterList
                .getGrowingThreshold(),
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
