(function(){
    function A(body,map,url){
        SuperMap.Bev.Query.apply(this,[map]);
        this.url = url;
        this.body = body;
        this.sqlDiv = null;
        this.init();
    }
    SuperMap.Bev.Class.register("SuperMap.Bev.QueryBySQL",A,"SuperMap.Bev.Query");
    var B = A.prototype;
    B.init = function(){
        this.create();
        this.createLayers();
    }
    B.create = function(){
        var d1,d2,d3,d4,d5,me = this;

        d1 = $("<div><p class='fontstyle' >图层名称</p></div>");
        d1.append(this.getSubLayers(this.url)).appendTo(this.body);
        d2 = $("<p class='fontstyle' >SQL语句</p>")
            .appendTo(this.body);
        this.sqlDiv = d5 = $("<input class='input' type='text' value='Pop_1994>1000000000 and SmArea>900'/>")
            .appendTo(this.body);
        d3 = $("<p class='button4'>查询</p>").click(function(){
            me.query();
        }).appendTo(this.body);
        d4 = $("<p class='button4'>清除</p>").click(function(){
            me.clear();
        }).appendTo(this.body);
    }
    B.query = function(){
        var queryParam, queryBySQLParams, queryBySQLService,me = this;
        var strName = this.layerNameDiv.attr("value");//document.getElementById("nametext").value;
        var strFilter = this.sqlDiv.attr("value");//document.getElementById("sqltext").value;
        queryParam = new SuperMap.REST.FilterParameter({
            name: strName,
            attributeFilter: strFilter
        }),
            queryBySQLParams = new SuperMap.REST.QueryBySQLParameters({
                queryParams: [queryParam]
            }),
            queryBySQLService = new SuperMap.REST.QueryBySQLService(this.url, {
                eventListeners: {
                    "processCompleted": function(queryEventArgs){
                        me.processCompleted(queryEventArgs);
                    },
                    "processFailed": me.processFailed
                }
            });
        queryBySQLService.processAsync(queryBySQLParams);
    }
    B.processCompleted = function(queryEventArgs){
        var i, j, result = queryEventArgs.result; //queryEventArgs服务端返回的对象
        if (result && result.recordsets) {
            for (i = 0, recordsets = result.recordsets, len = recordsets.length; i < len; i++) {
                if (recordsets[i].features) {
                    for (j = 0; j < recordsets[i].features.length; j++) {
                        feature = result.recordsets[i].features[j];
                        feature.style = this.style;
                        this.vectorLayer.addFeatures(feature);
                    }
                }
            }
        }
    }
})()