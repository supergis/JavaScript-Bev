(function(){
    function A(body,map,url){
        SuperMap.Bev.Query.apply(this,[map]);
        this.body = body;
        this.control;
        this.url = url;
        this.init();
    }
    SuperMap.Bev.Class.register("SuperMap.Bev.QueryByBounds",A,"SuperMap.Bev.Query");
    var B = A.prototype;
    B.init = function(){
        this.create();
        this.createLayers();
        this.createControl();
    }
    B.create = function(){
        var d1,d2,d3,me = this;

        d1 = $("<div id='SubLayers'><p class='fontstyle' >图层名称</p></div>");
        d1.append(this.getSubLayers(this.url));
        d2 = $("<p class='button4'>查询</p>")
            .click(function(){
                me.query();
            });
        d3 = $("<p class='button4'>清除</p>")
            .click(function(){
                me.clear();
            });
        this.body.append(d1).append(d2).append(d3);
        //text+="<p class='button4' onclick=js_Bev_Query() >查询</p><p class='button4' onclick='js_Search_clearFeatures()'>清除</p>"
    }
    B.query = function(){
        this.clear();
        this.control.box.activate();
    }
    B.createControl = function(){
        var ctl,me = this;

        this.control = ctl = new SuperMap.Control();
        SuperMap.Util.extend(ctl, {//Util工具类   extend指的是将复制所有的属性的源对象到目标对象
            draw: function () {
                this.box = new SuperMap.Handler.Box(me.control, { "done": this.notice }); //此句是创建一个句柄，Box是一个处理地图拖放一个矩形的事件，这个矩形显示是开始于在按下鼠标，然后移动鼠标，最后完成在松开鼠标。
                this.box.boxDivClassName = "qByBoundsBoxDiv"; //boxDivClassName用于绘制这个矩形状的图形
                //this.box.activate(); //激活句柄
            },
            //将拖动的矩形显示在地图上
            notice: function (bounds) {
                this.box.deactivate(); //处理关闭激活句柄

                var ll = map.getLonLatFromPixel(new SuperMap.Pixel(bounds.left, bounds.bottom)), //getLonLatFromPixel从视口坐标获得地理坐标
                    ur = map.getLonLatFromPixel(new SuperMap.Pixel(bounds.right, bounds.top));
                var queryBounds = new SuperMap.Bounds(ll.lon, ll.lat, ur.lon, ur.lat);

                var feature = new SuperMap.Feature.Vector();
                feature.geometry = queryBounds.toGeometry(),
                    feature.style = me.style;
                me.vectorLayer.addFeatures(feature);

                var queryParam, queryByBoundsParams, queryService;
                var strName = me.layerNameDiv.attr("value");
                queryParam = new SuperMap.REST.FilterParameter({ name: strName }); //FilterParameter设置查询条件，name是必设的参数，（图层名称格式：数据集名称@数据源别名）
                queryByBoundsParams = new SuperMap.REST.QueryByBoundsParameters({ queryParams: [queryParam], bounds: queryBounds }); //queryParams查询过滤条件参数数组。bounds查询范围
                queryService = new SuperMap.REST.QueryByBoundsService(me.url, {
                    eventListeners: {
                        "processCompleted": function(queryEventArgs){
                            me.processCompleted(queryEventArgs);
                        },
                        "processFailed": me.processFailed
                    }
                });
                queryService.processAsync(queryByBoundsParams); //向服务端传递参数，然后服务端返回对象
            }
        });
        this.map.addControl(ctl);
    }
    B.processCompleted = function(queryEventArgs) {
        var i, j, result = queryEventArgs.result; //queryEventArgs服务端返回的对象
        if (result && result.recordsets) {
            for (i = 0, recordsets = result.recordsets, len = recordsets.length; i < len; i++) {
                if (recordsets[i].features) {
                    for (j = 0; j < recordsets[i].features.length; j++) {
                        var point = recordsets[i].features[j].geometry,
                        size = new SuperMap.Size(44, 33),
                        offset = new SuperMap.Pixel(-(size.w / 2), -size.h),
                        icon = new SuperMap.Icon("./theme/images/marker.png", size, offset);
                        this.markerLayer.addMarker(new SuperMap.Marker(new SuperMap.LonLat(point.x, point.y), icon));
                    }
                }
            }
        }
        this.vectorLayer.removeAllFeatures();
    }
})()