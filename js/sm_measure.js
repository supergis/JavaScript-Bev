/**
 * Class: SuperMap.Bev.Measure
 * 量算功能。
 */
(function () {
    SuperMap.Bev.Class.create(
        "SuperMap.Bev.Measure",
        {
            /**
             * APIProperty: body
             * {HTMLElement} 父容器
             */
            body:null,
            /**
             * APIProperty: map
             * {SuperMap.Map} map对象
             */
            map:null,
            /**
             * APIProperty: resultDiv
             * {HTMLElement} 结果显示面板
             */
            resultDiv:null,
            /**
             * APIProperty: measureControls
             * {Object} 量算控件
             */
            measureControls:null,
            /**
             * Constructor: SuperMap.Bev.Measure
             * 实例化 Measure 类。
             *
             * Parameters:
             * body - {DOMElement} 页面上装载该控件的容器
             * map - {SuperMap.Map} 地图对象。
             *
             * Examples:
             * (code)
             * var myMeasure = new SuperMap.Bev.Measure($(DivId),map);
             * (end)
             */
            "init":function (body, map) {
                this.body = body;
                this.map = map;

                this.create();
                this.createControl();
            },
            /**
             * APIMethod: create
             * 创建该控件的dom对象。
             */
            create:function () {
                var d1, d2, d3, me = this;

                this.resultDiv = d1 = $("<p class='measureResult'></p>").appendTo(this.body);
                d2 = $("<button>长度量算</button>").button({
                    icons:{
                        primary:"ui-icon-locked"
                    }
                }).click(function () {
                        me.measureDistance();
                    }).appendTo(this.body);
                d3 = $("<button>面积量算</button>").button({
                    icons:{
                        primary:"ui-icon-locked"
                    }
                }).click(function () {
                        me.measureArea();
                    }).appendTo(this.body);
            },
            /**
             * APIMethod: createControl
             * 创建量算控件。
             */
            createControl:function () {
                var me = this;

                var sketchSymbolizers = {
                    "Point":{
                        pointRadius:3,
                        graphicName:"square",
                        fillColor:"#669933",
                        fillOpacity:1,
                        strokeWidth:2,
                        strokeOpacity:1,
                        strokeColor:"#aaee77"
                    },
                    "Line":{
                        strokeWidth:3,
                        strokeOpacity:1,
                        strokeColor:"#aaee77"
                    },
                    "Polygon":{
                        strokeWidth:2,
                        strokeOpacity:1,
                        strokeColor:"#aaee77",
                        fillColor:"white",
                        fillOpacity:0.3
                    }
                };
                var style = new SuperMap.Style();
                style.addRules([
                    new SuperMap.Rule({symbolizer:sketchSymbolizers})
                ]);
                var styleMap = new SuperMap.StyleMap({"default":style});
                this.measureControls = {
                    line:new SuperMap.Control.Measure(
                        SuperMap.Handler.Path, {
                            persist:true,
                            immediate:true,
                            handlerOptions:{
                                layerOptions:{
                                    styleMap:styleMap
                                }
                            }
                        }
                    ),
                    polygon:new SuperMap.Control.Measure(
                        SuperMap.Handler.Polygon, {
                            persist:true,
                            immediate:true,
                            handlerOptions:{
                                layerOptions:{
                                    styleMap:styleMap
                                }
                            }
                        }
                    )
                };

                for (var key in this.measureControls) {
                    var control = this.measureControls[key];
                    control.events.on({
                        "measure":function (event) {
                            me.measureCompleted(event);
                        }
                        //,"measurepartial": handleMeasurements
                    });
                    this.map.addControl(control);
                }
            },
            /**
             * APIMethod: measureDistance
             * 距离量算。
             */
            measureDistance:function () {
                if (this.measureControls["polygon"].active) {
                    this.measureControls["polygon"].deactivate();
                    this.resultDiv.html("");
                }
                this.measureControls["line"].activate();
            },
            /**
             * APIMethod: measureArea
             * 面积量算。
             */
            measureArea:function () {
                if (this.measureControls["line"].active) {
                    this.measureControls["line"].deactivate();
                    this.resultDiv.html("");
                }
                this.measureControls["polygon"].activate();
            },
            /**
             * APIMethod: measureCompleted
             * 量算完成。
             */
            measureCompleted:function (event) {
                var geometry = event.geometry;
                var units = event.units;
                var order = event.order;
                var measure = event.measure;
                if (order == 1) {
                    this.resultDiv.html("长度：" + measure.toFixed(3) + units);
                } else {
                    this.resultDiv.html("面积：" + measure.toFixed(3) + units);
                }
                this.deactivate();
            },
            /**
             * APIMethod: clearFeatures
             * 清除量算结果。
             */
            clearFeatures:function () {
                try {
                    this.deactivate();
                    this.resultDiv.html("");
                }
                catch (e) {
                }
            },
            /**
             * APIMethod: destroy
             * 销毁。
             */
            destroy:function () {
                this.clearFeatures();
                for (var key in this.measureControls) {
                    var control = this.measureControls[key];

                    this.map.removeControl(control);
                }
            },
            /**
             * APIMethod: deactivate
             * 注销该控件。
             */
            deactivate:function () {
                for(var key in this.measureControls) {
                    if(this.measureControls[key].activate)
                    {
                        this.measureControls[key].deactivate();
                    }
                }
            }
        }
    );
})()